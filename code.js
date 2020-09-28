var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["7d8e6183-cf78-43b1-af62-531fe4400fbf","091d5ec5-8820-4aae-acbb-0fa1fae1b949"],"propsByKey":{"7d8e6183-cf78-43b1-af62-531fe4400fbf":{"name":"background","sourceUrl":null,"frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":12,"version":"ffefFmteUOfiL1l9XZK8_YYOkSZVmqn0","loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/7d8e6183-cf78-43b1-af62-531fe4400fbf.png"},"091d5ec5-8820-4aae-acbb-0fa1fae1b949":{"name":"Striker","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"vNLAZ1kLw4YtwTgJR4j2lmm7NoBTY.bu","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/091d5ec5-8820-4aae-acbb-0fa1fae1b949.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var background1   = createSprite(200, 200,400,400);
background1.setAnimation("background");

var invisBarrier = createSprite(200, 250,400,10);
invisBarrier.rotation = 180;

var goal1 = createSprite(200, 28,100,20);
goal1.shapeColor = ("Yellow");
var goal2 = createSprite(200, 372,100,20);
goal2.shapeColor = ("yellow");

var striker = createSprite(200, 200,10,10);
striker.shapeColor = ("white");
striker.scale = 0.3;
striker.setAnimation("Striker");


var compMallet = createSprite(200, 50,50,10);
compMallet.shapeColor = ('black');

var playerMallet = createSprite(200,350,50,10);
playerMallet.shapeColor = ('black');

var compScore = 0;
var playerScore = 0;

var gameState = "serve";

function draw() {
  edges = createEdgeSprites();
  drawSprites();
  
  invisBarrier.visible = false;
  
  striker.bounceOff(edges);
  striker.bounceOff(compMallet);
  striker.bounceOff(playerMallet);
  playerMallet.bounceOff(edges);
  playerMallet.bounceOff(invisBarrier);
  
  //dotted line
  for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  //AI
  compMallet.x = striker.x;
  
  //player movement and controls
  if (keyDown("up")) {
    playerMallet.y -= 10;
  }
  
  if (keyDown("down") ) {
        playerMallet.y += 10;
  }
  
  if (keyDown("left")) {
        playerMallet.x -= 10;
  }
  
  if (keyDown("right")) {
        playerMallet.x += 10;
  }
  
  //score
  if (striker.isTouching(goal1) || striker.isTouching(goal2)) {
    
    if (striker.isTouching(goal1)) {
      playerScore += 1;
    }
    
    if(striker.isTouching(goal2)){
      compScore += 1;
    }
    
    reset();
    gameState = "serve";
  }
  
  if (gameState === "GameOver"){
    
    compScore = 0;
    playerScore = 0;
    
    reset();
  }
  
  if (gameState === "serve"){
    textFont(22);
    fill("white");
    text("PRESS SPACE TO SERVE",135,190);
  }
  
  if (keyDown("space") && gameState === "serve") {
    serve();
    gameState = "play";
  } 
  
  if (compScore === 5 || playerScore === 5){
    gameState = "GameOver";
  }  
  
  if (keyDown("r") && gameState === "GameOver") {
    reset();
    gameState = "serve";
  }
  
  if (gameState === "GameOver"){
    fill("white");
    text("GAME OVER",170,190);
    text("PRESS 'R' TO RESTART",140,220);
  }

  
  fill("white");
  textSize(20);
  text(compScore,20,190);
  text(playerScore,20,220);
  

}

function serve(){
  striker.velocityX = 4;
  striker.velocityY = 5;
}

function reset(){
  striker.x = 200;
  striker.y = 200;
  striker.velocityX = 0;
  striker.velocityY = 0;
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
