import Mouse from "/Mouse.js";

const random =max => Math.random()*max | 0;
const randomArrElem=arr=> arr[random(arr.length)];

class Arcanoid
{
    constructor(canvasID)
    {
        const canvas=this.canvas=document.getElementById('game');
        this.ctx= this.canvas.getContext('2d');
        this.mouse= new Mouse(this.canvas);

        this.platform = {
            x: canvas.width / 2 - 50, 
            y: canvas.height - 100,
            width: 100,
            height: 20,
            
        };
        const map=this.map = {
            bricks: [],
            brickWidth:80,
            brickHeight:40,
        };

        this.pause();
        this.restart();
    }
    run(){
        this.mouse.on('mousedown',e=> this.onMouseDown(e));
        this.mouse.on('mousemove',e=> this.onMouseMove(e));
        this.unpause();
        this.render();
    }

    onMouseDown(e){
       
    }

    restart()
    {
        this.generatenewMap();
    }

    generatenewMap(){

    }
    
    render(){
        if (this.state !== 'pause')
        {   
            this.clearScreen();

            this.movePlatform();
            this.renderMap();
            this.renderPlayerPlatform();
            console.log('render');
            window.requestAnimationFrame(() => this.render());
        }
    }

    renderMap(){
        const {map} = this;
        const {bricks}= map;
    }
    pause(){
        this.state='pause';
    }

    unpause(){
        this.state='running';
        this.render();
    }

    clearScreen(){
        const {ctx,canvas}=this;
        const {width,height}= canvas;
        ctx.clearRect(0,0,width,height);
    }

    renderPlayerPlatform(){
        const {platform: {x,y,width,height}, ctx} = this;
        ctx.fillStyle= "red";
        ctx.fillRect(x, y, width,height);
    }

    movePlatform(){
         const { platform, mouse, canvas } = this;
         const diff=this.mousex - platform.x;
         const delta=Math.abs(diff)<2 ?diff:2;
        let newX = mouse.x - platform.width / 2;
        
        if (newX < 0) {
            newX = 0;
        } else if (newX + platform.width > canvas.width) {
            newX = canvas.width - platform.width;
        }
        
        platform.x = newX + delta;
    }
}

export default Arcanoid;