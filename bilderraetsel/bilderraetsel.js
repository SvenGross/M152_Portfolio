$(document).ready(function() {
    $("#puzzle").data("imagePath", "images/raetsel/"); //base image path
    $("#puzzle").data("images",       [ "penguins", "penguins2" ]); //array of images to be displayed
    $("#puzzle").data("descriptions", [ "Pinguine", "Pinguine2" ]); //array of titles for images in same order
    $("#puzzle").data("currentImage", -1 ); //index of data(images) (-1 for starting with the first picture(index 0)
    init();
    nextImage();
});

$(window).resize(function() {
    setImageSize();
});

$(function() {
    $("#next").click(function() {
        nextImage();
    });
});

//initialize puzzle
function init() {
    $("#puzzle").data("images").each(function(index) {
        alert(index);
        alert($("#puzzle").data("descriptions")[index]);
        $("#answer").html($("#puzzle").data("descriptions")[index]);
    });
}

function setImageSize() {
    $(".imageSnippet").height($(".imageSnippet").width());
}

function nextImage() {
    checkIfLastImage();
    $("#puzzle").data("currentImage", ($("#puzzle").data("currentImage") + 1));
    mixSnippets();
    setImageSize();
}

//if currentImage is last image, start from beginning
function checkIfLastImage() {
    if($("#puzzle").data("currentImage") == ($("#puzzle").data("images").length - 1)) {
        $("#puzzle").data("currentImage", -1 );
    }
}

//mixes snippets by currentImage
function mixSnippets() {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(arr);
    $(".imageSnippet").each(function(index) {
        $("#imageSnippet" + (index + 1)).attr("src", $("#puzzle").data("imagePath") + $("#puzzle").data("images")[$("#puzzle").data("currentImage")] + "/Snippet" + arr[index] + ".jpg");
    });
}

//sets snippets by currentImage in correct order
function orderSnippets() {
    $(".imageSnippet").each(function(index) {
        index = index + 1;
        $("#imageSnippet" + index).attr("src", $("#puzzle").data("imagePath") + $("#puzzle").data("images")[$("#puzzle").data("currentImage")] + "/Snippet" + index + ".jpg");
    });
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}