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
            brickWidth:50,
            brickHeight:25,
            lvlX:70,
            lvlY:150,
        };

        this.ball = {
            x: this.platform.x, 
            y: this.platform.y -20,
            width: 20,
            height: 20,
            dx:-2,
            dy:-2,
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
    onMouseMove(e){
       
    }

    restart()
    {
        this.generateNewMap();
    }

    generateNewMap(){
        const {map} = this;
        const bricks = map.bricks=[];
       
        const {brickWidth, brickHeight, lvlX,lvlY} =map;

        for (let row =0; row<10;++row)
        {
            for (let collumn =0; collumn<10;++collumn)
            { if (random(5)!==0)
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

            this.collisionCheck();

            this.renderMap();
            this.renderPlayerPlatform();
            this.renderBall();

            console.log('render');
            window.requestAnimationFrame(() => this.render());
        }
    }
    collideWall(){
        const { ball,canvas} = this;
        const {x,y,width,height,dx,dy}=ball;
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

    collideRect(rect1, rect2)
    {
        const {x:x1,y:y1, width:w1, height:h1} =rect1;
        const {x:x2,y:y2, width:w2, height:h2} =rect2;
        const dx=x2-x1;
        const dy=y2-y1;
        const dw= (w2-w1)/2-Math.abs(dx);
        const dh= (h2-h1)/2-Math.abs(dy);
        
        return {collided:dw>=0 && dh>=0, intersection: {dx,dy,dw,dh}}
    }

    handleCollision(collisionInfo,obj,other){
        const {dw,dh} = collisionInfo.intersection;// 
        //проверка с лицом или с торцом столкнулось тело
        if(dw>dh)
        {
            // Вертикаль
        obj.dy = -obj.dy;
        // Выталкивание
        if (obj.dy < 0) {
            obj.y = other.y - obj.height - 1;
        } else {
            obj.y = other.y + other.height + 1;
        }
    } else {
        // Горизонталь
        obj.dx = -obj.dx;
        if (obj.dx < 0) {
            obj.x = other.x - obj.width - 1;
        } else {
            obj.x = other.x + other.width + 1;
        }
        }
    }

    collidePlayerPlatform(){
         const { ball,platform} = this;
         const collision= this.collideRect(ball,platform);
         if(collision.collided)
         {
            console.log(collision);
            this.handleCollision(collision,ball,platform);
         }
    }
    
    collideBrick(){
         const { map:{bricks},ball} = this;
         
         const collided=false;
         for(let b= 0; b<bricks.length && !collided; ++b)
         {
            const collision= this.collideRect(ball,bricks[b]);
            if(collision.collided)
         {
            this.handleCollision(collision,ball,bricks[b]);
            this.map.bricks.splice(b,1);
         }
         }
         
    } 
    collisionCheck(){
        this.collideWall();
        this.collidePlayerPlatform();
        this.collideBrick();
        
    }

    renderMap(){
        const {map,ctx} = this;
        const {bricks }= map;

        bricks.forEach(({ x,y,width,height}) =>{
            ctx.fillStyle= "violet";
            ctx.fillRect(x, y, width,height);
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
        const { ball} = this;
        const {dx,dy}=ball;
        ball.x+=dx;
        ball.y+=dy;
        }
}

export default Arcanoid;