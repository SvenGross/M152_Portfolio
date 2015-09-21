$(document).ready(function() {
    //puzzle data
    $("#puzzle").data("imagePath", "images/raetsel/"); //base image path
    $("#puzzle").data("images",       [ "penguins", "penguins2" ]); //array of images to be displayed
    $("#puzzle").data("descriptions", [ "Pinguine", "Pinguine2" ]); //array of titles for images in same order
    $("#puzzle").data("currentImage", -1 ); //index of data(images) (-1 for starting with the first picture(index 0)
    $("#puzzle").data("currentSnippets", [1, 2, 3, 4, 5, 6, 7, 8, 9]);

    //stats data
    $("#puzzle").data("points", 0);
    $("#puzzle").data("totalClicks", 0);
    $("#puzzle").data("currentClicks", 0);

    //start
    init();
    setStats();
    nextImage();
});

$(window).resize(function() {
    setImageSize();
});

$(function() {
    $("#next").click(function() {
        nextImage();
    });

    $("#nextSnippet").click(function() {
        showSnippet();
    });
});

//initialize puzzle
function init() {
    $.each($("#puzzle").data("images"), function(index, value){
        $("#answer").append("<option>" + $("#puzzle").data("descriptions")[index] + "</option>");
    });
}

function setImageSize() {
    $(".imageSnippet").height($(".imageSnippet").width());
}

function nextImage() {
    if($("#puzzle").data("currentImage") == ($("#puzzle").data("images").length - 1)) {
        $("#puzzle").data("currentImage", -1 );
    }
    $("#puzzle").data("currentImage", ($("#puzzle").data("currentImage") + 1));

    mixSnippets();
    hideSnippets();
    showSnippet();
    setImageSize();
}

//mixes snippets and hides them (excepting first) by currentImage
function mixSnippets() {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(arr);
    $(".imageSnippet").each(function(index) {
        $("#imageSnippet" + (index + 1)).attr("src", $("#puzzle").data("imagePath") + $("#puzzle").data("images")[$("#puzzle").data("currentImage")] + "/Snippet" + arr[index] + ".jpg");
    });
}

//hides all snippets
function hideSnippets() {
    $(".imageSnippet").each(function() {
        $(this).hide();
    });
}

//shows next snippet of currentImage
function showSnippet() {
    if($("#puzzle").data("currentClicks") != 9) {
        $("#puzzle").data("currentClicks", ($("#puzzle").data("currentClicks") + 1));
        $("#puzzle").data("totalClicks", ($("#puzzle").data("totalClicks") + 1));
        $("#imageSnippet" + $("#puzzle").data("currentClicks")).show();
        setImageSize();
        if($("#puzzle").data("currentClicks") == 9) {
            $("#nextSnippet").hide();
        }
    }
    else {
        alert("Es ist schon das ganze Bild aufgedeckt");
    }
    setStats();
}

//sets snippets by currentImage in correct order
function showOrderedPicture() {
    $(".imageSnippet").each(function(index) {
        index = index + 1;
        $("#imageSnippet" + index).attr("src", $("#puzzle").data("imagePath") + $("#puzzle").data("images")[$("#puzzle").data("currentImage")] + "/Snippet" + index + ".jpg");
    });
}

function setStats() {
    $("#points").html($("#puzzle").data("points"));
    $("#totalClicks").html($("#puzzle").data("totalClicks"));
    $("#currentClicks").html($("#puzzle").data("currentClicks"));
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