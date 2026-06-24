class Mouse{
    constructor(obj)
    {
        this.obj= obj;
        this.x=0;
        this.y=0;
        this.left= false;
        this.subs = {};

        this.handle (event =>'mousedown ', (e) => this.onMouseDown(e));
        this.handle (event =>'mouseup ', (e) => this.onMouseUp(e));
        this.handle (event=>'mousemove ', (e) => this.onMouseMove(e));

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
        this.x=e.layerX;
        this.y=e.layerY;
    }

    onMouseEvent(e,callback)
    {
        callback(e);
    }

    
}
export default Mouse;