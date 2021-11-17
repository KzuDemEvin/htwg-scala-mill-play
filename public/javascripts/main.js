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

let showConfetti = false;

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
            reloadField(result)
        },
        error: () => {
            $("#myToast").toast('show');
        }
    });
}

function reloadField(json) {
    json.game.field.forEach(entry => {
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
    if (json.game.winner !== 0) {
        let winner = '';
        if (result.game.winner === 1) {
            winner = 'White';
        } else {
            winner = 'Black';
        }
        winningScreen(winner);
    }
}

function getCellPosition(row, col) {
    for (const [key, value] of cells.entries()) {
        const found = value.some((item) => {
            return JSON.stringify(item) === JSON.stringify([Number(row), Number(col)]);
        });
        if (found) {
            return key;
        }
    }
}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function winningScreen(winner) {
    const swalHtml = `
        <p>Do you like to start a new game?</p>
    `;

    showConfetti = true;

    Swal.fire({
        title: `Congratulations to <strong>${winner}</strong> for winning the game!`,
        width: 600,
        padding: '3em',
        closeOnClickOutside: false,
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'Yes',
        html: swalHtml
    }).then(result => {
        if (result.isConfirmed) {
            showConfetti = false;
            gameMethod('POST', '/');
        }
    });

    const jsConfetti = new JSConfetti();
    await Sleep(100);
    while (showConfetti) {
        jsConfetti.addConfetti();
        await Sleep(3000);
    }
}

function connectWebSocket() {
    console.log("Connecting to Websocket");
    let websocket = new WebSocket("ws://localhost:9000/websocket");
    console.log("Connected to Websocket");

    websocket.onopen = function(event) {
        console.log("Trying to connect to Server");
    }

    websocket.onclose = function () {
        console.log('Connection Closed!');
    };

    websocket.onerror = function (error) {
        console.log('Error Occured: ' + error);
    };

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            reloadField(JSON.parse(e.data));
        }
    };
}

$(document).ready(function() {
    loadField();
    connectWebSocket()
});