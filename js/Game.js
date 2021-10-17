class Game {
  constructor(){

  }

 

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  getState(secretWord) {
    var gameStateRef = database.ref(`users/${secretWord}/game_state/`);
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref(`users/${secretWord}/`).update({
      game_state: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

      

    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
    admin = new Admin();
  }

  StateTimer(){
    //form.hide();

    
  }

  formdisplay(){
    form.hide();

    form2 = new Form2();
      form2.display();
  }

  admindisplay(){
    console.log("called")
    clear();
    form2.hide1();

   
   admin.display();
  }

  play(){
    //form.hide();

      

    
    Player.getPlayerInfo();
     
    
      
      
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      //background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)
        textAlign(CENTER);
        textSize(20);
        fill("yellow");
        text(allPlayers[plr].name , cars[index-1].x , cars[index-1].y+85)
       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,80,90);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860 && passedFinishLine === false){
      gameState = 2;
      passedFinishLine = true ;
      Player.updateCarsAtEnd();
      //player.rank += 1;
      player.rank = finishedCars;
      player.update();
      //Player.updateCarsAtEnd(player.rank);

    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
  }

  displayRanks(){
    Player.getPlayerInfo();
    camera.position.x = 0 ;
    camera.position.y = 0;
    var ypos = -250;
    clear();
    fill("black");
    stroke("yellow");
    textSize(30);
    for(var plr in allPlayers){
      text(allPlayers[plr].name+" : "+allPlayers[plr].rank , displayWidth/20 , ypos)
      ypos += 50;
    }
    game.update(2);
  }
}
