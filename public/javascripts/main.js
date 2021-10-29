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


//test 123,
//document.body.addEventListener('click', checkForMill());

/*
jQuery(document).click(function() {
    console.log("click");
})
*/

// Setzt den Stein an die gewünschte Stelle, und teilt diese Änderung dem Controller mit
function setStone(row, col) {

    let cellColor = null;
    //TODO: Nächster Schritt funktioniert noch nicht
    jsRoutes.controllers.MillController.playGame("" + row+col);

    $.ajax({
            method: "GET",
            url: "/cellColor/" +row + "/" + col,
            dataType: "text",

            //TODO: result wird nicht oder falsch in cellColor abgelegt
            success: function (result) {
                console.log(result);
                cellColor = result;
            }
    });

    
    if(document.readyState === 'complete') {
        console.log("Update tableCell"+ row+col);
        if(cellColor === "noColor") {
            console.log("No Color there!");
        } else if(cellColor === "white") {
            console.log("Cell is white!");
        } else if(cellColor === "black") {
            console.log("Cell is black!");
        } else {
            console.log(cellColor);
        }
        //document.getElementById("tableCell"+row+col).setAttribute("src", jsRoutes.controllers.Assets.versioned("images/media/WhiteStone.png").url);
    }
}















/*
function updateField() {
    jsRoutes.controllers.MillController.newGame;

    if(document.getElementById("gamecontainer").childElementCount < 1) {

        let container = document.getElementById("gamecontainer");
        let tbl = document.createElement("table");
        let tblbody = document.createElement("tbody");

        for(let i = 0; i < MAXROWS; i++) {

            let tablerow = document.createElement("tr");

            for(let j = 0; j < MAXCOLS; j++) {
                let cell = document.createElement("td");
                let img = document.createElement("img");


                img.setAttribute("src", jsRoutes.controllers.Assets.versioned("images/media/WhiteStone.png").url);

                cell.appendChild(img);
                tablerow.appendChild(cell);
            }

            tblbody.appendChild(tablerow);
        }

        tbl.appendChild(tblbody);
        container.appendChild(tbl);
    }
} */
/*

*/