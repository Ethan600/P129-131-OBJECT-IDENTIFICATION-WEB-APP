img = "";
status1 = "";
objects = [];

function preload(){
    img = loadImage("wardrobe.jpg");
}

function setup(){
    canvas = createCanvas(600, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting object....";
}

function modelLoaded(){
    status1 = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        objects = results;
    }
}

function back(){
    window.location = "index.html";
}

function draw(){
    image(img, 0, 0, 600, 400);
    if(status1 != ""){
        for(i=0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Object Detected ! ";
            document.getElementById("no_of_objects").innerHTML = "Number of objects detcted are : " + objects.length;
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}