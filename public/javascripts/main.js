let gameContainer = document.querySelector(".gamecontainer");

//document.body.addEventListener('click', checkForMill());

jQuery(document).click(function() {
    console.log("click");

    $(".gamecontainer").click(function() {
        console.log("Hello");
    })
})

function checkForMill() {
    console.log("Seife");
    return;
}