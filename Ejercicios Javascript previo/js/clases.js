class Coche{
    
    constructor(modelo, velocidad,antiguedad){
        this.modelo=modelo;
        this.velocidad=velocidad;
        this.antiguedad=antiguedad;
    }
    aumentarVelocidad(){
        this.velocidad+=1;
    }
    restarVelocidad(){
        this.velocidad-=1;
    }
}

class Autobus extends Coche{
    constructor(modelo,velocidad,antiguedad){
        super(modelo,velocidad,antiguedad);
        this.altura=5;
    }
    mostrarAltura(){
        return "la altura del bus es "+this.altura +" metros";
    }
}


var autobus1 = new Autobus('Pegasus',100,2010);
var coche1 =new Coche('BMW',200,2017);
var coche2 =new Coche('Mercedes',100,2015);
var coche3 =new Coche('Ford',180,2013);
var coche4 =new Coche('Mercedes',200,2018);
console.log(coche1)
coche1.aumentarVelocidad();
coche1.aumentarVelocidad();
coche1.aumentarVelocidad();
console.log(coche1);
console.log(autobus1.mostrarAltura());

