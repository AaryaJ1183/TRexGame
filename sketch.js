var TRex, TRexIMG, TRexDead;
var Ground , GroundIMG;
var InvisiGround; 
var CloudsGroup, CloudIMG;
var ObstaclesGroup, ObstacleIMG1 , ObstacleIMG2, ObstacleIMG3 , ObstacleIMG4 , ObstacleIMG5, ObstacleIMG6;
var Score = 0;
var DinoGroup, DinoGroupIMG;
var PLAY =0;
var END = 1;
var GameState = PLAY;
var GameOver, GameOverIMG;
var Restart, RestartIMG;
var TRexDucking;


function preload(){
TRexIMG = loadAnimation("trex1.png" , "trex3.png" , "trex4.png" );
TRexDead = loadAnimation("trex_collided.png");
GroundIMG=loadImage("ground2.png");
CloudIMG=loadImage("cloud.png");
ObstacleIMG1=loadImage("obstacle1.png");
ObstacleIMG2=loadImage("obstacle2.png");
ObstacleIMG3=loadImage("obstacle3.png");
ObstacleIMG4=loadImage("obstacle4.png");
ObstacleIMG5=loadImage("obstacle5.png");
ObstacleIMG6=loadImage("obstacle6.png");
DinoGroupIMG=loadImage("Bird.png_1.png");
GameOverIMG=loadImage("gameOver.png");
RestartIMG=loadImage("restart.png");
TRexDucking=loadImage("Dino 1.png_1.png");
}




function setup() {
  createCanvas(600, 200);
  TRex = createSprite(100,175,20,20);
  TRex.addAnimation("TRexRunning" , TRexIMG);
  TRex.addAnimation("TRexCollided", TRexDead);
  TRex.addAnimation("TRexDucking",TRexDucking);
  GameOver = createSprite(300,100,10,10);
  GameOver.addImage("GameOver!", GameOverIMG);
  GameOver.scale=0.6;
  GameOver.visible=false;
  Restart = createSprite(300,120,10,10);
  Restart.addImage("Restart!", RestartIMG);
  Restart.scale=0.3;
  Restart.visible=false;
  TRex.scale = 0.5;
  Ground = createSprite(200,180,430,10);
  Ground.addImage("Ground", GroundIMG );
  InvisiGround = createSprite(200,190,430,10);
  InvisiGround.visible = false;
  CloudsGroup = new Group();
  DinoBirdGroup = new Group();
  ObstaclesGroup = new Group();
}

function draw() {
  background("white");
  drawSprites();
  
  TRex.collide(InvisiGround);
  
  
  console.log(TRex.y);
  
  if(mousePressedOver(Restart)){
     reset();
  }
  
  text("Score: " + Score, 500,50);
  
  
  if(GameState===PLAY){
  Ground.velocityX = - (4 + Score/100);
  if ( Ground.x<0){
  Ground.x=Ground.width/2;
  }
  if(keyDown("space") && (TRex.y>=161.5)){
   TRex.velocityY=-10;
  }
  TRex.velocityY = TRex.velocityY + 0.6;
    Score =Score + Math.round(getFrameRate()/30);
    spawnDinos();
    spawnClouds();
    spawnObstacles();
  
    if(keyDown("down")){
    TRex.changeAnimation("TRexDucking",TRexDucking);
    TRex.scale=0.15;
    }
    
    if(keyWentUp("down")){
    TRex.changeAnimation("TRexRunning",TRexIMG);
    TRex.scale=0.5;
    }
  
  if(TRex.isTouching(ObstaclesGroup)||TRex.isTouching(DinoBirdGroup)){
  GameState = END;
  }
    
    
    
  }else if(GameState === END){
  Ground.velocityX = 0;
  TRex.velocityY = 0;
  CloudsGroup.setVelocityXEach(0);
  CloudsGroup.setLifetimeEach(-1);
  ObstaclesGroup.setVelocityXEach(0);
  ObstaclesGroup.setLifetimeEach(-1);
  DinoBirdGroup.setVelocityXEach(0);
  DinoBirdGroup.setLifetimeEach(-1);
  TRex.changeAnimation("TRexCollided",TRexDead);
  TRex.scale=0.5;
  GameOver.visible=true;
  Restart.visible=true;
  
  }
  
  
  
}

function spawnClouds(){

  
  if(frameCount%80 == 0){
  var Cloud = createSprite(600,100,10,10);
    Cloud.velocityX=-(4 + Score/100 );
    Cloud.addAnimation("MovingClouds", CloudIMG);
    Cloud.scale=0.5;
   Cloud.lifetime = 170;
    TRex.depth = Cloud.depth;
    TRex.depth = TRex.depth + 1;
    Cloud.y=random(100,150);
    
    CloudsGroup.add(Cloud);
  }
  
}
 function spawnObstacles(){
if(frameCount%170==0){
var Obstacle = createSprite(600,170,10,10);
  Obstacle.velocityX = -(4 + Score / 100);
  Obstacle.scale=0.5;
  Obstacle.lifetime = 170;
  
  var rand = Math.round(random(1,6));
  
  switch(rand){
    case 1: Obstacle.addImage("obstacle",ObstacleIMG1);
    break;
    case 2: Obstacle.addImage("obstacle",ObstacleIMG2);
    break;
    case 3: Obstacle.addImage("obstacle",ObstacleIMG3);
    break;
    case 4: Obstacle.addImage("obstacle",ObstacleIMG4);
    break;
    case 5: Obstacle.addImage("obstacle",ObstacleIMG5);
    break;
    case 6: Obstacle.addImage("obstacle",ObstacleIMG6);
    break;
    default: break;
    
  }

  ObstaclesGroup.add(Obstacle);

}
 }  
  
 function spawnDinos(){
if(frameCount%300==0){
  var DinoBird = createSprite(600,150,10,10);
  DinoBird.velocityX = -(4 + Score / 100);
  DinoBird.lifetime = 160;
  DinoBird.addAnimation("DinoBirdIMG" ,DinoGroupIMG);
  DinoBird.scale = 0.15;
  DinoBird.y = random(50,150);
  DinoBirdGroup.add(DinoBird);

 }

 }

function reset(){
TRex.changeAnimation("TRexRunning" , TRexIMG);
ObstaclesGroup.destroyEach();
CloudsGroup.destroyEach();
DinoBirdGroup.destroyEach();
GameOver.visible = false;
Restart.visible=false;
Score = 0;
GameState=PLAY;
}