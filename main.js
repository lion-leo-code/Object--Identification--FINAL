img = "";
status = "";
objects = [];
loadingIcon = document.getElementById("loader");

function preload(){
    img = loadImage("dog_cat.jpg")
}

function setup(){
    canvas = createCanvas(600, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(600, 380);

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects" ; 
}

function draw(){
    image(video, 0, 0, 600, 380);

    objectDetector.detect(video, gotResult);


    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Detected Objects: " + objects.length;
            loadingIcon.style.display = "none";

            fill(r, g, b);
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + "  |  " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

} 

function modelLoaded(){
    console.log("MODEL LOADED!!");
    status = true;

}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

