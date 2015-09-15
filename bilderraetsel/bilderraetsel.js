$(document).ready(function() {
    setImageSize();
    $("#puzzle").data("imagePath", "images/raetsel/");
    $("#puzzle").data("images", [ "penguins" ]);
    $("#puzzle").data("descriptions", [ "Pinguine" ]);
    $("#puzzle").data("currentImage", 0);
    start();
});

$(window).resize(function() {
    setImageSize();
});

$(function() {
    $("#next").click(function() {
        mixSnippets();
    });
});

function setImageSize() {
    $(".imageSnippet").height($(".imageSnippet").width());
}

function start() {
    alert($("#puzzle").data("currentImage"));
}

function orderSnippets() {
    $(".imageSnippet").each(function(index) {
        index = index + 1;
        $("#imageSnippet" + index).attr("src", $("#puzzle").data("imagePath") + $("#puzzle").data("currentImage") + "/Snippet" + index + ".jpg");
    });
}

function mixSnippets() {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(arr);
    $(".imageSnippet").each(function(index) {
        $("#imageSnippet" + (index + 1)).attr("src", $("#puzzle").data("imagePath") + $("#puzzle").data("currentImage") + "/Snippet" + arr[index] + ".jpg");
    });
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}