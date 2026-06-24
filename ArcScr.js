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
        this.mouse.on('mousemove',e=> this.onMouseDown(e));
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
            this.renderMap();
            this.renderPlayer();
            window.requestAnimationFrame(() => this.render());
        }
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
}
