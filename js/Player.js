class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = 0;
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;
    var positionX;
    if (this.index === 1) {
      positionX = width / 2 - 100;
    } else {
      positionX = width / 2 + 100;
    }

    database.ref(`users/${secret_word}/${playerIndex}`).set({
      name: this.name,
      positionX: positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      life: this.life
    });
  }

  getDistance() {
    var playerIndex = "players/player" + this.index;
    var playerDistanceRef = database.ref(`users/${secret_word}/${playerIndex}`);
    playerDistanceRef.on("value", data => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    });
  }

  getCount(){
    var playerCountRef = database.ref(`users/${secret_word}/player_count/`);
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('users/${secret_word}/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(`users/${secret_word}/${playerIndex}`).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref(`users/${secret_word}/players/`);
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getCarsAtEnd(){
    database.ref(`users/${secret_word}/cars_at_end/`).on("value" , (data)=>{
     // this.rank = data.val();
     finishedCars = data.val();
    })

  }
  static updateCarsAtEnd(){
    database.ref(`users/${secret_word}/`).update({
      carsAtEnd : finishedCars+1
    })
  }
}
