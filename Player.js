class Player{
    constructor(canvaswidth)
    {
        this.width= 120;
        this.height=20;
        this.x= canvas.width/2 - this.width;
        this.y=canvas.height;
        this.color="#FFFF1F";
        this.canvaswidth=canvaswidth;
        this.speed=10;
    }

    draw(pl)
    {
        pl.fillStyle=this.color;
        pl.fillRect(this.x,this.y,this.width,this.height);
    }

    update(mouseX)
    {
        const targetX=mouseX - this.width/2;
        const dx=targetX-this.x;

        if(Math.abs(dx)> 1)   
        {
            this.x+=Math.sign(dx)*Math.min(Math.abs(dx,this.speed));
        }
        else
        {
            this.x=targetX;
        }

         if (this.x < 0) 
            this.x = 0; //телепорт при достижении границ
        if (this.x + this.width > this.canvasWidth) 
            {
            this.x = this.canvasWidth - this.width;
            }
    }

    collision(ball)
    {
        ballLeft=ball.x -ball.radius;
        ballRight=ball.x + ball.radius;
        ballTop=ball.y -ball.radius;
        ballBottom=ball.y +ball.radius;
    }
}