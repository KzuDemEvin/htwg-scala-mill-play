const cells = new Map()
        .set('AvailableCellTopLeft', [[0,0], [1,1], [2,2]])
        .set('AvailableCellTopRight', [[0,6], [1,5], [2,4]])
        .set('AvailableCellBottomRight', [[6,6], [5,5], [4,4]])
        .set('AvailableCellBottomLeft', [[6,0], [5,1], [4,2]])
        .set('AvailableCellMiddle', [[1,3], [3,5], [5,3], [3,1]])
        .set('AvailableCellHorizontalTop', [[0,3], [4,3]])
        .set('AvailableCellHorizontalBottom', [[2,3], [6,3]])
        .set('AvailableCellVerticalLeft', [[3,0], [3,4]])
        .set('AvailableCellVerticalRight', [[3,2], [3,6]])

const allowedPositions = [[0, 0], [0, 3], [0, 6], [1, 1], [1, 3], [1, 5], [2, 2], [2, 3], [2, 4], [3, 0], [3, 1], [3, 2],
    [3, 4], [3, 5], [3, 6], [4, 2], [4, 3], [4, 4], [5, 1], [5, 3], [5, 5], [6, 0], [6, 3], [6, 6]];

function gameMethod(method, path) {
    $.ajax({
        method: method,
        url: path,
        dataType: 'text',
        success: () => {
            loadField();
        },
        error: () => {
            $("#myToast").toast('show');
        }
    });
}

function interact(row, col) {
    const contains = allowedPositions.some((item) => {
        if (JSON.stringify(item) === JSON.stringify([Number(row), Number(col)])) {
            return true;
        }
    });
    if (contains) {
        $.ajax({
            method: 'PUT',
            url: `/${row}${col}`,
            dataType: 'json',

            success: () => {
                loadField();
            },
            error: () => {
                $("#myToast").toast('show');
            }
        });
    }
}

function loadField() {
    $.ajax({
        method: 'GET',
        url: '/json',
        dataType: 'json',

        success: (result) => {
            result.field.forEach(entry => {
                switch (entry.color) {
                    case 'white':
                        document.getElementById(`${entry.row},${entry.col}`).setAttribute("src", jsRoutes.controllers.Assets.versioned(`images/media/WhiteStone.png`).url);
                        break;
                    case 'black':
                        document.getElementById(`${entry.row},${entry.col}`).setAttribute("src", jsRoutes.controllers.Assets.versioned(`images/media/BlackStone.png`).url);
                        break;
                    case 'noColor':
                        let image = getCellPosition(entry.row, entry.col);
                        if (image === '') {
                            image = 'Error'
                        }
                        document.getElementById(`${entry.row},${entry.col}`).setAttribute("src", jsRoutes.controllers.Assets.versioned(`images/media/${image}.png`).url);
                        break;
                    case 'empty':
                        break;
                    default:
                }
            });
        },
        error: () => {
            $("#myToast").toast('show');
        }
    });
}

function getCellPosition(row, col) {
    for (const [key, value] of cells.entries()) {
        const found = value.some((item) => {
            return JSON.stringify(item) === JSON.stringify([Number(row), Number(col)]);
        });
        if (found) {
            return key
        }
    }
}

function connectWebSocket() {
    console.log("Connecting to Websocket");
    let websocket = new WebSocket("ws://localhost:9000/websocket");
    console.log("Connected to Websocket");

    websocket.onopen = function(event) {
        console.log("Trying to connect to Server");
        websocket.send("Trying to connect to Server");
    }

    websocket.onclose = function () {
        console.log('Connection Closed!');
    };

    websocket.onerror = function (error) {
        console.log('Error Occured: ' + error);
    };

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            console.log('String message received: ' + e.data);
        }
        else if (e.data instanceof ArrayBuffer) {
            console.log('ArrayBuffer received: ' + e.data);
        }
        else if (e.data instanceof Blob) {
            console.log('Blob received: ' + e.data);
        }
    };
}

$(document).ready(function() {
    loadField();
    connectWebSocket();
});