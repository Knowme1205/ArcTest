 class Mouse{
    constructor(obj)
    {
        this.obj= obj;
        this.x=0;
        this.y=0;
        this.left= false;
        this.subs = {};

        this.handle ('mousedown', (e) => this.onMouseDown(e));
        this.handle ('mouseup', (e) => this.onMouseUp(e));
        this.handle ('mousemove', (e) => this.onMouseMove(e));

    }

    handle(event, callback){
        this.obj.addEventListener(event, e => {
            this.onMouseEvent(e,callback);
            this.trigger(event,e);
        } , false);
    }

    on(event, callback)
    {
        if(!this.subs[event]) this.subs[event] = [];
        this.subs[event].push(callback);
    }

    trigger (event,e)
    {
        const callbacks = this.subs[event];
       if (callbacks) { callbacks.forEach(cb => cb(e)); };
    }
    

    onMouseUp(e)
    {
        this.left = e.button!==0;
    }

    onMouseDown(e)
    {

        this.left = e.button===0;
    }
    onMouseMove(e)
    {
       const rect = this.obj.getBoundingClientRect();
        
        // Вычисляем позицию
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
   
        
        this.x = x;
        this.y = y;
    }

    onMouseEvent(e,callback)
    {
        callback(e);
    }

    
} export default Mouse; 