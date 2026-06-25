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
            x: canvas.width / 2, 
            y: canvas.height - 100,
            width: 100,
            height: 20,
            
        };
        const map=this.map = {
            bricks: [],
            brickWidth:60,
            brickHeight:30,
        };

        this.ball = {
            x: this.platform.x, 
            y: this.platform.y -20,
            width: 20,
            height: 20,
            dx:-1,
            dy:-1,
        }

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
        this.generateNewMap();
    }

    generateNewMap(){
        const {map} = this;
        const bricks = map.bricks=[];
        const lvlY=150;
        const lvlX=50;
        const {brickWidth, brickHeight} =map;

        for (let row =0; row<10;++row)
        {
            for (let collumn =0; collumn<10;++collumn)
            { if (random(15)!==0)
                {
                    bricks.push({
                        x: lvlX +collumn *(brickWidth+1), // +1 для пространства между блоками
                        y:lvlY +row *(brickHeight+1) ,
                        width:brickWidth,
                        height:brickHeight
                    });
                }
                }
        }
    }
    
    render(){
        if (this.state !== 'pause')
        {   
            this.clearScreen();

            this.movePlatform();
            this.moveBall();

            this.renderMap();
            this.renderPlayerPlatform();
            this.renderBall();

            console.log('render');
            window.requestAnimationFrame(() => this.render());
        }
    }

    renderMap(){
        const {map,ctx} = this;
        const {bricks }= map;

        bricks.forEach(({ x,y,width,height}) =>{
            ctx.fillStyle= "violet";
            ctx.fillRect(x-width/2, y-height/2, width,height);
        })
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
        ctx.fillStyle= "#00d4ff";
        ctx.fillRect(x, y, width,height);
    }
    renderBall(){
        const {ball: {x,y,width,height}, ctx} = this;
        ctx.fillStyle= "#ff6b6b";
        ctx.fillRect(x, y, width,height);
        
    }
    movePlatform(){
         const { platform, mouse, canvas } = this;
         const diff=this.mousex - platform.x;
         const delta=Math.abs(diff)<2 ?diff:2;//1 08 50
        let newX = mouse.x - platform.width / 2;
        
        if (newX < 0) {
            newX = 0;
        } else if (newX + platform.width > canvas.width) {
            newX = canvas.width - platform.width;
        }
        
        platform.x = newX + delta;
    }

    moveBall(){
        const { ball,canvas} = this;
        const {x,y,width,height,dx,dy}=ball;
        ball.x+=dx;
        ball.y+=dy;
        
        //левый край
        if(ball.x< width/2)
        {   ball.x= width/2;
            ball.dx= - ball.dx;
        }
        if(ball.y<height/2)
        {   ball.y= height/2;
            ball.dy= - ball.dy;
        }

        //правый край
        if(ball.x>canvas.width -width/2)
        {   ball.x= canvas.width -width/2;
            ball.dx= - ball.dx;
        }
        if(ball.y>canvas.height- height/2)
        {   ball.y= canvas.height-height/2;
            ball.dy= - ball.dy;
        }

    }
}

export default Arcanoid;