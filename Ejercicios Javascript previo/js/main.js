window.addEventListener('load',()=>{


let nombre="Esteban indiveri";
let altura =170;

var concatenacion=nombre+" "+altura;

// var datos= document.querySelector("#datos");
// datos.innerHTML=`
// <h1>Soy la caja de datos</h1>
// <h2>Mi nombre es: ${nombre}</h2>
// <h3>Mido: ${altura} </h3>
// `;

if(altura>=190){
    datos.innerHTML+=`
        <h3>Eres una persona alta</h3>
    `;
}else{
    datos.innerHTML+=`<h3>Eres una persona bajita</h3>`;
}

for(var i=2000;i<=2020;i-=-1){
    //bloque de instrucciones
    datos.innerHTML+= `
    <h2>Estamos en el año ${i}</h2>`;
}

function muestraName(nombre, altura){
    var misDatos=`
<h1>Soy la caja de datos</h1>
<h2>Mi nombre es: ${nombre}</h2>
<h3>Mido: ${altura} </h3>
`;
return misDatos;
};

function imprimir(){
    var datos=document.querySelector("#datos");
    datos.innerHTML=muestraName('esteban',170);
}

imprimir();


var nombres=['victor', 'antonio','joaquin'];
// for(i=0;i<nombres.length;i++){
//     document.querySelector(".array").innerHTML=(nombres);
// };

nombres.forEach((nombre)=>{
   console.log(nombre)
   var arrayy=document.querySelector(".arrayy");
    document.write(nombre);
});

let coche={
modelo:'mercedes',
maxima:500,
antiguedad:2019,
mostrarDatos(){
console.log(this.modelo,this.maxima,this.antiguedad);
},
propiedad1:"valor aleatorio"
}

// document.querySelector(".auto").innerHTML+=(coche.modelo);
// coche.mostrarDatos();

var saludar=new Promise((resolve,reject)=>{
    
    setTimeout(() => {
        let saludo="Hola muy buenas a todos chavales!!";
        if(saludo){
            resolve(saludo);

        }else{
            reject("no hay saludo disponible");
        }
    }, 2000);

    saludar.then(resultado=>{
        alert(resultado)
    })
    .catch(err=>{
        alert(err);
    });
});
});