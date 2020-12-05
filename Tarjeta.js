class Tarjeta {

    constructor(x, y, image, tipo){
        //[]
        this.x = x;
        this.y = y;
        this.tipo = tipo;
        this.image = image[tipo];
        this.mostrar = false;
        this.completado = false;
        this.score = 50;
    }

    pintar (){
        if(!this.completado){
        if(!this.mostrar){
            rectMode(CENTER);
            noStroke();
            fill(255);
            rect(this.x, this.y, 70, 70);
        }else {
            imageMode(CENTER);
            image(this.image, this.x, this.y);
           }
        }else {
            imageMode(CENTER);
            image(this.image, this.x, this.y);
           }
    }

    validar (dx, dy){
        let result = false;
        if(dx > this.x && dx < this.x + 70 && 
            dy > this.y && dy < this.y + 70 &&
            !this.mostrar && 
            !this.completado){
                result = true;
        }
        return result;
    }

    setCompletado (completado){
        this.completado = completado;
      }

      setMostrar (mostrar){
        this.mostrar = mostrar;
      }

      getTipo (){
        return this.tipo;
      }

      getScore (){
        return this.score;
      }


}