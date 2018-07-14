class Circle {
    constructor(){
        this.x = height/2;
        this.y = width/2;
    }
    getX(){
        return this.x;
    }
    getY() {
        return this.y;
    }
    update(newX,newY){
        this.x = newX;
        this.y = newY;
    }
    show(){
        fill(255);
        ellipse(this.x,this.y,10,10);
    }
}