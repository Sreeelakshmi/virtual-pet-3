/*//Create variables here
var dog, happyDog, database, foodS, foodStock,dogI,happyDogI,food,feed,addFood,lastFed,foodObj
var garden,bedroom,washroom,gamestate,currentTime,fedTime
function preload()
{
  //load images here
  dogI=loadImage("dogImg.png")
  happyDogI=loadImage("dogImg1.png")
  garden=loadImage("Garden.png");
  washroom=loadImage("Wash Room.png");
  bedroom=loadImage("Bed Room.png");
}

function setup() {
  createCanvas(1000, 400);
  database=firebase.database();
  dog=createSprite(800,200,150,150);
  dog.addImage(dogI);
  dog.scale=0.15;
  foodObj=new Food();
  foodStock=database.ref('food');

  foodStock.on("value",readStock);
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  readState=database.ref('gamestate');
  readState.on("value",function(data){
    gamestate=data.val();
  })
  textSize(20);
feed=createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  currentTime=hour();
  if(currentTime==lastFed+1){
    update("playing");
    foodObj.garden();
  }
  else if(currentTime==lastFed+2){
    update("sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
update("bathing");
foodObj.bathroom();
  }
  else {
    update("hungry");
    foodObj.display();
  }
  if(gamestate!="hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(dogI);
  }
/*background("blue");
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last feed :",+ lastFed%12+"PM",350,30);
}
else if(lastFed==0){
  text("Last feed : 12 PM",350,30);
}
else {
text("Last feed :"+lastFed+"AM,350,30")
}

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogI);
}*/
  //drawSprites();
  /*fill(255,255,254);
  stroke("black")
  text("Food Remaining"+foodS,170,200);
  textSize(13);
  text("Press Up Arrow To feed the dog",130,10,300,20);

  //add styles here

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({food:x})
}
function feedDog(){
  dog.addImage(happyDogI);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gamestate:"hungry"
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
function update(state){
  database.ref('/').update({
    gamestate:state
  })
}*/
var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("dogImg1.png");
garden=loadImage("Garden.png");
washroom=loadImage("Wash Room.png");
bedroom=loadImage("Bed Room.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("hungry")
    foodObj.display();
   }
   
   if(gameState!="hungry"){
     feed.hide();
     addFood.hide();
     dog.remove();
   }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"hungry"
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
