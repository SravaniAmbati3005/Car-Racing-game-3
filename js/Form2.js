class Form2 {
    constructor(){
        console.log("constructor")
        this.button1 = createButton('create a game')
        this.button2 = createButton('Join a game')
        this.button3 = createButton('Random')
    }

    hide1(){
        console.log("hiding")
        this.button1.hide();
        this.button2.hide();
        this.button3.hide();
    }

    display(){
        this.button1.position(displayWidth/2 , displayHeight/2)
        this.button2.position(displayWidth/2 , displayHeight/2 - 50)
        this.button3.position(displayWidth/2, displayHeight/2 - 100)

        this.button1.mousePressed(()=>{

           gameState = 2;
        })

        this.button2.mousePressed(()=>{
            gameState = 3;
        })
    }
}