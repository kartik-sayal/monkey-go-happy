// to create various global variables
var play = 1;
var end = 0;
var gamestate = play;
var score;
var cnt;
var invisibleground;
var ground,ground_image;
var monkey,monkey_running;
var Banana,banana_image;
var obstacle,obstacle_image;

//to load various animations
function preload(){
 ground_image = loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  banana_image = loadImage("banana.png");
  
  obstacle_image = loadImage("stone.png");
  
  
 }
function setup() {
  createCanvas(400, 400);
  //to create the sprites for global variables
   ground = createSprite(200,200,400,40);
  ground.addImage("jungle",ground_image);
    ground.velocityX = -5;
 ground.x = ground.width/2;
 
  monkey = createSprite(50,350,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.04;

   invisibleground = createSprite(10,390,400,10)
  invisibleground.visible = false;
      
  Banana = new Group();
  obstacle = new Group();
  
  score = 0;
   

  }

function draw() {
//to change the background
  background(220);
  //gamestate play
   if(gamestate == play){
      if(keyDown("space") && monkey.y>350) {
      monkey.velocityY = -10;
    }
    
    monkey.velocityY = monkey.velocityY + 0.5;    
     
           if (ground.x < 0)
   ground.x = ground.width/2;
       
               }
     
    if(monkey.isTouching(Banana)){
      score = score+5;
      
    }
     // to increase scale of monkey
     switch(score){
       case 10: monkey.scale = 0.06;
         break;
         case 20: monkey.scale = 0.08;
         break;
         case 30: monkey.scale = 0.10;
         break;
         case 40: monkey.scale = 0.12;
         break;
         case 50: monkey.scale = 0.14;
         break;
         default: break;
     }
     
    food();
  spawnObstacles();

  if(monkey.isTouching(Banana)){
    Banana.destroyEach();
  }
 
  if(obstacle.isTouching(monkey)){
  gamestate = end;
    }

  
   // gamestate end
else if(gamestate == end)
{
     monkey.velocityY = 0;
    obstacle.setVelocityXEach(0);
     obstacle.setLifetimeEach(-1);
     Banana.setLifetimeEach(-1);
    ground.velocityX = 0; 
  Banana.setVelocityXEach(0);
   console.log(cnt);
  
}
  
   monkey.collide(invisibleground);
  

  drawSprites();
  textSize(24);
   fill("black");
  text("Score :" + score,30,20);
 
}

function food(){
  if(frameCount % 80 == 0){
    var banana = createSprite(300,250,10,10);
    banana.addAnimation("Banana",banana_image);
    banana.velocityX = -8;
    banana.scale = 0.05;
    banana.lifetime = 140;
    Banana.add(banana);
}
}

function spawnObstacles(){
  if(frameCount % 100 == 0){
    var stone = createSprite(400,360,10,10);
    stone.addAnimation("Stone",obstacle_image);
    stone.setCollider("rectangle",0,0,400,400);
    stone.velocityX = -10;
    stone.lifetime = 100;
    stone.scale = 0.15;
    obstacle.add(stone);
} 
}
