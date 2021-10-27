let gameContainer = document.querySelector(".gamecontainer");

//test 123
//document.body.addEventListener('click', checkForMill());
/*
jQuery(document).click(function() {
    console.log("click");

    $(".gamecontainer").click(function() {
        console.log("Hello");
    })
})
*/

function test(row, col) {
    console.log("Test  row: " + row + " col: " + col);

    if(document.readyState === 'complete') {
        console.log("Update tableCell"+ row+col);
        document.getElementById("tableCell"+row+col).setAttribute("src", jsRoutes.controllers.Assets.versioned("images/media/WhiteStone.png").url);
    }
}