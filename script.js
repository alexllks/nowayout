var isGameOver;
var score;

var GRAVITY = 0.3;
var JUMP = -5;

var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var ROOF_SPRITE_WIDTH = 50;
var numGroundSprites;
var playerImage;
var backgroundImage;
var groundImage;
var player;

var obstacleSprites;



function preload() {
    playerImage = loadImage("vegeta.png");
    backgroundImage = loadImage("images/background.png");
    groundImage = loadImage("images/ground.png");
    roofImage = loadImage("images/pallete.png");


}


function setup() {
    isGameOver = false;
    score = 0;
    createCanvas(1200, 1080);
    background(150, 200, 250);
    groundSprites = new Group();

    numGroundSprites = Math.ceil(width / GROUND_SPRITE_WIDTH) + 1;

    numRoofSprites = Math.ceil(width / ROOF_SPRITE_WIDTH ) +1 ;

    roofSprites = new Group ();
    // createCanvas(400, 300);
    // background(150, 200, 250);
    // groundSprites = new Group();

    // numGroundSprites = width / GROUND_SPRITE_WIDTH + 2;

    for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(n * GROUND_SPRITE_WIDTH, height - 25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
        groundSprite.addImage(groundImage);  // Προσθήκη της εικόνας του πατώματος
        groundSprite.immovable = true;
        groundSprites.add(groundSprite);


    }
    for ( var n = 0; n < numRoofSprites; n++) {
        var roofSprite = createSprite(n * GROUND_SPRITE_WIDTH, 25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
        roofSprite.addImage(roofImage);
        roofSprite.immovable = true;
        roofSprites.add(roofSprite);
    }

    player = createSprite(100, height - 75, 50, 50);

    player.addImage(playerImage);

     player.scale = 0.08;

    
    obstacleSprites = new Group();
}


function draw() {



    if (isGameOver) {
        background(0);
        fill(255);
        textAlign(CENTER);
        text("Your score was: " + score, camera.position.x, camera.position.y - 20);
        text("Game Over! Click anywhere to restart", camera.position.x, camera.position.y);
    } else {

        
        //background(150, 200, 250);
        background(backgroundImage);  // Ορισμός της εικόνας ως φόντο
        player.velocity.y = player.velocity.y + GRAVITY;
        player.collide(groundSprites, stopFalling);  // stamatame thn ptwsi otan akoumpaei to edafos
        player.collide(roofSprites,stopFallingRoof);
        if (groundSprites.overlap(player)) {
            player.velocity.y = 0;
            player.position.y = (height - 50) - (player.height / 2);
        }

        // Κίνηση του παίκτη δεξιά και αριστερά
        if (keyIsDown(RIGHT_ARROW)) {
            player.velocity.x = 5;  // Κίνηση δεξιά με σταθερή ταχύτητα
        }
        else if (keyIsDown(LEFT_ARROW)) {
            player.velocity.x = -5;  // Κίνηση αριστερά με σταθερή ταχύτητα
        } else {
            player.velocity.x = 0;  // Όταν δεν πατιέται κανένα κουμπί, σταματάει
        }



        if (keyDown(UP_ARROW)) {
            player.velocity.y = JUMP;
        }


        

        player.position.x = player.position.x;
        camera.position.x = player.position.x + (width /4) ;

        for (var i = 0; i < groundSprites.length; i++) {
            var groundSprite = groundSprites[i];

            // Όταν το πλακίδιο βγαίνει εκτός οθόνης στα αριστερά, το μεταφέρουμε στο τέλος
            if (groundSprite.position.x <= camera.position.x - width / 2) {
                groundSprite.position.x += numGroundSprites * GROUND_SPRITE_WIDTH;
            }
        }

        
        for (var i = 0; i < roofSprites.length; i++) {
            var roofSprite = roofSprites[i];

            // Όταν το πλακίδιο βγαίνει εκτός οθόνης στα αριστερά, το μεταφέρουμε στο τέλος
            if (roofSprite.position.x <= camera.position.x - width / 2) {
                roofSprite.position.x += numRoofSprites * GROUND_SPRITE_WIDTH;
            }
        }
        


        if (random() > 0.95) {
            var obstacle = createSprite(camera.position.x + width, random(0, (height - 50) - 15), 30, 30);
            obstacleSprites.add(obstacle);
        }

        var firstObstacle = obstacleSprites[0];
        if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width / 2 + firstObstacle.width / 2)) {
            removeSprite(firstObstacle);
        }

        obstacleSprites.overlap(player, endGame);

        drawSprites();

        score = score + 1;
        textAlign(CENTER);
        text(score, camera.position.x, 10);
        text("Player X: " + Math.round(player.position.x), camera.position.x, 30);
        text("Player Y: " + Math.round(player.position.y), camera.position.x, 50);
    }
}
function stopFalling(player, ground) {
    player.velocity.y = 0;
}

function stopFallingRoof(player, roof) {
    player.velocity.y = 0;
}
function endGame() {
    isGameOver = true;
}

function mouseClicked() {
    if (isGameOver) {

        for (var n = 0; n < numGroundSprites; n++) {
            var groundSprite = groundSprites[n];
            groundSprite.position.x = n * 50;
        }

        player.position.x = 100;
        player.position.y = height - 75;

        obstacleSprites.removeSprites();

        score = 0;
        isGameOver = false;
    }
}