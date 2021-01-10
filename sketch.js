var gameState='PLAY';



var tower,towerImg;
var door,doorImg,doorsGrp;
var climber,climberImg,climbersGrp;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGrp;


function preload(){
  towerImg=loadImage("tower.png")
  doorImg=loadImage("door.png")
  climberImg=loadImage("climber.png")
  ghostImg=loadImage("ghost-standing.png")
}

function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300)
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.3;
  
  doorsGrp=new Group();
  climbersGrp=new Group();
  invisibleBlockGrp=new Group();
}

function draw(){
  background(0);
  
  if(gameState==='PLAY'){
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("Left")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("Right")){
    ghost.x=ghost.x+3;
  }
  
 if(keyDown('space')){
   ghost.velocityY=-5;
 } 
  
  
  
  ghost.velocityY=ghost.velocityY+0.3
  
  spawnDoors();
  
  if(climbersGrp.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGrp.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState='END'
  }
     
  drawSprites();
  } 
  if(gameState==='END'){
    textSize(30)
    text('game over',230,250)
  }
}

function spawnDoors(){
  if(frameCount%240===0){
 door=createSprite(200,-50);
  climber=createSprite(200,10);
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
  climber.addImage(climberImg); 
  door.addImage(doorImg);
  door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;
  door.x=Math.round(random(120,400)); 
    climber.x=door.x;
    invisibleBlock.x=door.x;
  door.lifetime=800; 
    climber.lifetime=800;
    invisibleBlock.lifetime=800;
  doorsGrp.add(door);  
    climbersGrp.add(climber);
    invisibleBlockGrp.add(invisibleBlock)
    
  ghost.depth=door.depth;
  ghost.depth+=1;
   
    invisibleBlock.debug=false
}
}