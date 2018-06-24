class Circle{
    constructor(){
        this.x = width/2;
        this.y = height/2;
    }
    update(newX,newY){
        this.x = newX;
        this.y = newY;
    }
    show(){
        fill(255);
        ellipse(this.x,this.y,10,10);
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
}