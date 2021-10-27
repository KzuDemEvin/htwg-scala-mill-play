let gameContainer = document.querySelector(".gamecontainer");

//test 123
//document.body.addEventListener('click', checkForMill());


jQuery(document).click(function() {
    console.log("click");
    updateField();
})


function updateField() {
    jsRoutes.controllers.MillController.newGame;

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