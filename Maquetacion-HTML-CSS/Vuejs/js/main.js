'use strict'
window.addEventListener('load',()=>{

var template=document.querySelector("#article-template");
var articles=document.querySelector("#articles");


for(var i =1 ;i<4;i++){
    var clonado=template.cloneNode(true);
    clonado.removeAttribute("id");
    var h2=clonado.getElementsByTagName("h2")[0];
    h2.innerHTML=h2.textContent+' ' +i;
   articles.appendChild(clonado);
}

});