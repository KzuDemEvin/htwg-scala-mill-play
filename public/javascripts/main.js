cellHorizontal = [[0,1], [0,2], [0,4], [0,5], [1,2], [1,4], [5,2], [5,4], [6,1], [6,2], [6,4], [6,2]];
cellVertical =[[1,0], [1,6], [2,0], [2,1], [2,5], [2,6], [4,0], [4,1], [4,5], [4,6], [5,0], [5,6]]
cellTopLeft = [[0,0], [1,1], [2,2]]
cellTopRight = [[0,6], [1,5], [2,4]]
cellBottomRight = [[6,6], [5,5], [4,4]]
cellBottomLeft = [[6,0], [5,1], [4,2]]
cellMiddle = [[1,3], [3,5], [5,3], [3,1]]
cellHorizontalTop = [[0,3], [4,3]]
cellHorizontalBottom = [[2,3], [6,3]]
cellVerticalLeft = [[3,0], [3,4]]
cellVerticalRight = [[3,2], [3,6]]

const MAXROWS = 7;
const MAXCOLS = 7;

function interact(row, col) {
    $.ajax({
        method: "GET",
        url: `/${row}${col}`,
        dataType: "json",

        success: (result) => {
            console.log(result.cell);
            loadField()
        },
        error: () => {
          console.error('error')
        }
    });
}

function loadField() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: (result) => {
            result.field.forEach(entry => {
                switch (entry.color) {
                    case 'white':
                        document.getElementById(`${entry.row},${entry.col}`).setAttribute("src", jsRoutes.controllers.Assets.versioned("images/media/WhiteStone.png").url);
                        break;
                    case 'black':
                        document.getElementById(`${entry.row},${entry.col}`).setAttribute("src", jsRoutes.controllers.Assets.versioned("images/media/BlackStone.png").url);
                        break;
                    default:
                    // Do nothing
                }
            });
        },
        error: () => {
            console.error('error')
        }
    });
}

$(document).ready(function() {
    loadField();
});