img="";
status="";
objects=[];

function preload(){
    img= loadImage("bedRoom.jpg");

}

function setup(){
canvas = createCanvas(640,400);
canvas.center();

objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting object";
}

function modelLoaded(){
    console.log("MODEL IS LOADED");
    status = true;
    objectDetector.detect(img,gotResult);
}

function draw(){
    image(img,0,0,640,420);

    if(status !=""){
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill('#ff0019');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" ,objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#ff0019");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}

function gotResult(error,results)
{
if(error){
    console.error(error);
}
console.log(results);
objects = results;

}




