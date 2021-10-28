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


//test 123,
//document.body.addEventListener('click', checkForMill());


jQuery(document).click(function() {
    console.log("click");
    updateField();
})


function updateField() {
    jsRoutes.controllers.MillController.newGame;



    let container = document.getElementById("gamecontainer");


}

function setStone(row, col) {
    console.log("Test  row: " + row + " col: " + col);

    //jsRoutes.controllers.MillController.playGame("" + row+col);
    jsRoutes.controllers.MillController.randomGame;

    /* // Baupfusch
    if(document.readyState === 'complete') {
        console.log("Update tableCell"+ row+col);
        document.getElementById("tableCell"+row+col).setAttribute("src", jsRoutes.controllers.Assets.versioned("images/media/WhiteStone.png").url);
    } */
}

/*
<table class="mx-auto w-auto">
            @for(row <- 0 until size) {
                <tr>
                    @for(col <- 0 until size) {
                        <td>
                            @if(controller.possiblePosition(row, col)) {
                                @if(controller.isSet(row, col)) {
                                    @if(controller.cell(row, col).getContent.whichColor.equals(Color.white)) {
                                       <img class="img-fluid" src=@routes.Assets.versioned("images/media/WhiteStone.png")></a>
                                    } else {
                                       <img class="img-fluid" src=@routes.Assets.versioned("images/media/BlackStone.png")></a>
                                    }
                                } else {
                                    @if(cellTopLeft.contains((row, col))) {
                                        <img id="tableCell@row@col" onclick="setStone('@row', '@col')" class="img-fluid" src=@routes.Assets.versioned("images/media/AvailableCellTopLeft.png")>
                                    }
                                    @if(cellTopRight.contains((row, col))) { <!-- <a href="@{s"/${row}${col}"}"> -->
                                        <img class="img-fluid" src=@routes.Assets.versioned("images/media/AvailableCellTopRight.png")>
                                    }
                                    @if(cellBottomRight.contains((row, col))) {
                                        <img class="img-fluid" src=@routes.Assets.versioned("images/media/AvailableCellBottomRight.png")>
                                    }
                                    @if(cellBottomLeft.contains((row, col))) {
                                        <img class="img-fluid" src=@routes.Assets.versioned("images/media/AvailableCellBottomLeft.png")>
                                    }
                                    @if(cellMiddle.contains((row, col))) {
                                        <img class="img-fluid" src=@routes.Assets.versioned("images/media/AvailableCellMiddle.png")>
                                    }
                                    @if(cellHorizontalTop.contains((row, col))) {
                                        <img class="img-fluid" src=@routes.Assets.versioned("images/media/AvailableCellHorizontalTop.png")>
                                    }
                                    @if(cellHorizontalBottom.contains((row, col))) {
                                       <img class="img-fluid" src=@routes.Assets.versioned("images/media/AvailableCellHorizontalBottom.png")>
                                    }
                                    @if(cellVerticalLeft.contains((row, col))) {
                                        <img class="img-fluid" src=@routes.Assets.versioned("images/media/AvailableCellVerticalLeft.png")>
                                    }
                                    @if(cellVerticalRight.contains((row, col))) {
                                        <img class="img-fluid" src=@routes.Assets.versioned("images/media/AvailableCellVerticalRight.png")>
                                    }
                                }
                            } else {
                                @if(cellHorizontal.contains((row, col))) {
                                    <img class="img-fluid" src=@routes.Assets.versioned("images/media/UnavailableCellHorizontal.png")>
                                }
                                @if(cellVertical.contains((row, col))) {
                                    <img class="img-fluid" src=@routes.Assets.versioned("images/media/UnavailableCellVertical.png")>
                                }
                            }
                        </td>
                    }
                </tr>
            }
        </table>
*/