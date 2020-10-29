
$(function() {
    $('#clearBtn').bind('click', function() {
        clearInterval(myVar);
        run = false;
        counter = 0;
        var node = document.getElementById('scene');
        node.innerHTML = "";
        width = 0;
        totalRectangle = 0;
        intArray = [];
        rectangles = []
        data = []
        tempo = 100;
        return false;
    });
    $('#runBtn').bind('click', function() {
        var sel = document.getElementById("select-box");
        var text= sel.options[sel.selectedIndex].text;
        if (text == "Selection Sort") {
            selection_sort(intArray);
        }
        else if (text == "Bubble Sort"){
            bubble_sort(intArray);
        }
        return false;
    });
    $('#faster').bind('click', function() {
        if (run){
            clearInterval(myVar);
            tempo = tempo/2;
            runScene(); }
        return false;
    });
    $('#slower').bind('click', function() {
        if (run) {
            clearInterval(myVar);
            tempo = tempo*2;
            runScene(); }
        return false;
    });
    $('#fowardBtn').bind('click', function() {
        displayForward();
        return false;
    });
    $('#backBtn').bind('click', function() {
        displayBack();
        return false;
    });
    $('#playBtn').bind('click', function() {
        if (counter == totalRectangle - 1)
            return false;
        else if (run) {
            run = false;
            clearInterval(myVar); }
        else {
            run = true;
            runScene(); }
        return false;
    });
    $('#submitBtn').bind('click', function() {
        clearInterval(myVar);
        run = false;
        counter = 0;
        // clear all elements in "scene" before handling this event
        var node = document.getElementById('scene');
        node.innerHTML = "";
        rectangles = []
        data = []
        intArray = [];
        tempo = 100;


        totalRectangle = document.getElementById("msg").value
        width = 100/totalRectangle;
        widthStr = width.toString();
        for(var i = 0; i < totalRectangle; i++) {
            // returns a random integer from 1 to 100
            var randomInt = Math.floor(Math.random() * 100) + 1;
            intArray.push(randomInt);  }
        // this function create rectangles and display it on the scene
        create_rectangles(intArray);
        return false;
    });
});


// Global Variable
var intArray = [];
var rectangles = []
var data = []

var tempo = 100;
var myVar = 0;
var run = false;
var width = 0;
var widthStr = "";
var totalRectangle = 0;
var counter = 0;

// This function will display the initial set of rectangles
function display_rectangles(arr) {
    var node = document.getElementById('scene');
        node.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        var div = document.createElement('div');
        var heightStr = data[0].rectangles[i].height;
        div.id = data[0].rectangles[i].id;
        div.class = 'float-child'
        div.style = "height:" + heightStr + "%; width:" + widthStr + "%; float:left; background:#e9e9e9; border-style:solid;border-color:black;border-width:2px"
        document.getElementById("scene").appendChild(div);
    }

}
// Create the initial set of rectangles and push it into JSON data
function create_rectangles(arr) {
    for (var i = 0; i < arr.length; i++) {
        var idStr = "rectangle" + i.toString();
        var heightStr = arr[i].toString();
        rectangles.push({"id": idStr,
                "color": "white",
                "width": widthStr,
                "height": heightStr})
    }
    // Display rectangles onto the scene
    data.push({"rectangles": rectangles})
    display_rectangles(arr);
}

// Scene functions
function displayForward() {
    counter = counter + 1;
    var node = document.getElementById('scene');
    node.innerHTML = "";
    for (var j = 0; j < data[counter].rectangles.length; j++) {
        var div = document.createElement('div');
        var heightStr = data[counter].rectangles[j].height;
        var colorStr = data[counter].rectangles[j].color;
        div.id = data[counter].rectangles[j].id;
        div.class = 'float-child'
        div.style = "height:" + heightStr + "%; width:" + widthStr + "%; float:left; background:"+ colorStr +"; border-style:solid;border-color:black;border-width:2px"
        document.getElementById("scene").appendChild(div);
    }
}
function displayBack() {
    // move back 1 iteration then display all the triangles
    counter = counter - 1;
    var node = document.getElementById('scene');
    node.innerHTML = "";
    for (var j = 0; j < data[counter].rectangles.length; j++) {
        var div = document.createElement('div');
        var heightStr = data[counter].rectangles[j].height;
        var colorStr = data[counter].rectangles[j].color;
        div.id = data[counter].rectangles[j].id;
        div.class = 'float-child'
        div.style = "height:" + heightStr + "%; width:" + widthStr + "%; float:left; background:"+ colorStr +"; border-style:solid;border-color:black;border-width:2px"
        document.getElementById("scene").appendChild(div);
    }
}
function runScene() {
    myVar = setInterval(function(){
        var node = document.getElementById('scene');
        node.innerHTML = "";
        for (var j = 0; j < data[counter].rectangles.length; j++) {
            var div = document.createElement('div');
            var heightStr = data[counter].rectangles[j].height;
            var colorStr = data[counter].rectangles[j].color;
            div.id = data[counter].rectangles[j].id;
            div.class = 'float-child'
            div.style = "height:" + heightStr + "%; width:" + widthStr + "%; float:left; background:"+ colorStr +"; border-style:solid;border-color:black;border-width:2px"
            document.getElementById("scene").appendChild(div);
        }
        if (counter== data.length - 1) {
            clearInterval(myVar);
        }
        counter = counter + 1;
    }, tempo);
}


// Selection Sort Algorithm Function
// This functions will sort the array and store iteration scene to be played
function switch_index(arr, base, minIndex) {
    rectangles = []
    for (var i = 0; i < arr.length; i++) {
        if (i < base) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "green",
                "width": widthStr,
                "height": heightStr})
        }else if (i == base) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "red",
                "width": widthStr,
                "height": heightStr})
        }else if (i == minIndex){
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "red",
                "width": widthStr,
                "height": heightStr})
        }else {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "white",
                "width": widthStr,
                "height": heightStr})
        }
    }
    data.push({"rectangles": rectangles})
}
function changeBaseColor(arr, base) {
    rectangles = []
    for (var i = 0; i < arr.length; i++) {
        if (i < base) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "green",
                "width": widthStr,
                "height": heightStr})
        }
        else if (i == base) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "red",
                "width": widthStr,
                "height": heightStr})
        }else {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "white",
                "width": widthStr,
                "height": heightStr})
        }
    }
    data.push({"rectangles": rectangles})
}
function changeIterateColor(arr, base, minIndex, index) {
    rectangles = []
    for (var i = 0; i < arr.length; i++) {
        if (i < base) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "green",
                "width": widthStr,
                "height": heightStr})
        }else if (i == base) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "red",
                "width": widthStr,
                "height": heightStr})
        }else if (i == minIndex) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "red",
                "width": widthStr,
                "height": heightStr})
        }else if (i == index) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "orange",
                "width": widthStr,
                "height": heightStr})
        }else {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "white",
                "width": widthStr,
                "height": heightStr})
        }
    }
    data.push({"rectangles": rectangles})
}
function setSortedColor(arr, base) {
    rectangles = []
    for (var i = 0; i < arr.length; i++) {
        if (i <= base) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "green",
                "width": widthStr,
                "height": heightStr})
        }else {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "white",
                "width": widthStr,
                "height": heightStr})
        }
    }
    data.push({"rectangles": rectangles})
}
function changeMinColor(arr, base, index) {
    rectangles = []
    for (var i = 0; i < arr.length; i++) {
        if (i < base) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "green",
                "width": widthStr,
                "height": heightStr})
        }else if (i == base) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "red",
                "width": widthStr,
                "height": heightStr})
        }else if (i == index){
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "red",
                "width": widthStr,
                "height": heightStr})
        }else {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "white",
                "width": widthStr,
                "height": heightStr})
        }
    }
    data.push({"rectangles": rectangles})
}
function selection_sort(arr) {

     var minIndex = 0;
     for (var i = 0; i < arr.length; i++) {
         minIndex = i;
         changeBaseColor(arr, i)
         for (var j = i + 1; j < arr.length; j++){
             changeIterateColor(arr, i, minIndex, j)
             if (arr[j] < arr[minIndex]) {
                minIndex = j;
                changeMinColor(arr, i, j);
             }
         }
         var temp = arr[i];
         arr[i] = arr[minIndex];
         arr[minIndex] = temp;
         switch_index(arr, i, minIndex);
         setSortedColor(arr, i);
     }
}

function setCompareColor(arr, index, sorted){
    rectangles = []
    for (var i = 0; i < arr.length; i++) {
        if (i == index) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "orange",
                "width": widthStr,
                "height": heightStr})
            i = i+1;
            idStr = "rectangle" + (i).toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "orange",
                "width": widthStr,
                "height": heightStr})
        }
        else if (i > sorted) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "green",
                "width": widthStr,
                "height": heightStr})
        }
        else {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "white",
                "width": widthStr,
                "height": heightStr})
        }
    }
    data.push({"rectangles": rectangles})
}
function setBubbleSortedColor(arr, sorted) {

    rectangles = []
    for (var i = 0; i < arr.length; i++) {
        if (i >= sorted) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "green",
                "width": widthStr,
                "height": heightStr})
        }
        else {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "white",
                "width": widthStr,
                "height": heightStr})
        }
    }
    data.push({"rectangles": rectangles})
}
function setUnbalanceColor(arr, index, sorted) {
    rectangles = []
    for (var i = 0; i < arr.length; i++) {
        if (i > sorted) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "green",
                "width": widthStr,
                "height": heightStr})
        }
        else if (i == index) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "red",
                "width": widthStr,
                "height": heightStr})
            i = i+1;
            idStr = "rectangle" + (i).toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "red",
                "width": widthStr,
                "height": heightStr})
        }
        else {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "white",
                "width": widthStr,
                "height": heightStr})
        }
    }
    data.push({"rectangles": rectangles})
}
function setSwitchHeight(arr, index, sorted) {
    rectangles = []
    for (var i = 0; i < arr.length; i++) {
        if (i > sorted) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "green",
                "width": widthStr,
                "height": heightStr})
        }
        else if (i == index) {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "red",
                "width": widthStr,
                "height": heightStr})
            i = i+1;
            idStr = "rectangle" + (i).toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "red",
                "width": widthStr,
                "height": heightStr})
        }
        else {
            idStr = "rectangle" + i.toString();
            var heightStr = arr[i].toString();
            rectangles.push({"id": idStr,
                "color": "white",
                "width": widthStr,
                "height": heightStr})
        }
    }
    data.push({"rectangles": rectangles})
}

function bubble_sort(arr) {
    var maxPosition = arr.length - 1;
    while (maxPosition > 0) {
        for (var i = 0; i < maxPosition; i++) {
            setCompareColor(arr, i, maxPosition);
            if (arr[i] > arr[i + 1]) {
                setUnbalanceColor(arr, i, maxPosition)
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                setSwitchHeight(arr, i, maxPosition)
            }
        }

        setBubbleSortedColor(arr, maxPosition);
        maxPosition--;
    }
    setBubbleSortedColor(arr, maxPosition);
}


// Bubble Sort





// Insertion Sort