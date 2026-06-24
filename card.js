let risk = "normal";

let bet = 0;

let profit = 0;

let multiplier = 1;

let playing = false;



let data = JSON.parse(localStorage.getItem("royalData")) || {

coins:100000,
wins:0,
games:0,
record:0,
history:[]

};



function save(){

localStorage.setItem(
"royalData",
JSON.stringify(data)
);

}



function updateCoins(){

document.getElementById("coins").innerHTML =
data.coins;

}



updateCoins();





function setRisk(type){

risk = type;


document.querySelectorAll(".risk button")
.forEach(x=>x.style.opacity="0.5");


event.target.style.opacity="1";


}





function startGame(){


if(playing)
return;



bet =
Number(document.getElementById("bet").value);



if(!bet || bet<=0){

alert("مبلغ وارد کنید");
return;

}



if(bet>data.coins){

alert("موجودی کافی نیست");
return;

}




data.coins-=bet;


data.games++;


profit=0;

multiplier=1;


playing=true;



document.getElementById("betView").innerHTML =
bet;


document.getElementById("profit").innerHTML =
0;


document.getElementById("multi").innerHTML =
"×1";



let cards;



if(risk=="safe"){


cards=[

"×0.5",
"×1",
"×1.5",
"×2",
"POUCH",
"BOMB"

];


}



else if(risk=="hard"){


cards=[

"BOMB",
"BOMB",
"×2",
"×3",
"×5",
"POUCH"

];


}



else{


cards=[

"BOMB",
"BOMB",
"POUCH",
"×1",
"×2",
"×3"

];


}




cards.sort(()=>Math.random()-0.5);



let table =
document.getElementById("table");



table.innerHTML="";



cards.forEach(value=>{


table.innerHTML+=`

<div class="card" onclick="chooseCard(this,'${value}')">


<div class="inner">


<div class="front">

RG

</div>


<div class="back">

${value}

</div>


</div>


</div>

`;

});




document.getElementById("cashout").disabled=false;



document.getElementById("message").innerHTML=

"یک کارت انتخاب کنید";



save();

updateCoins();


}






function chooseCard(card,value){


if(!playing)
return;



if(card.classList.contains("open"))
return;



card.classList.add("open");




let message =
document.getElementById("message");





if(value=="BOMB"){



card.classList.add("bomb");



profit=0;


playing=false;


document.getElementById("cashout").disabled=true;



message.innerHTML=

`
💣 BOMB

<br>

بازی تمام شد

<br>

موجودی این مرحله از بین رفت

`;



document.querySelectorAll(".card")
.forEach(c=>{

c.style.pointerEvents="none";

});



}





else if(value=="POUCH"){



message.innerHTML=

`
پوچ

<br>

سودی دریافت نشد

`;



}





else{


multiplier =
Number(value.replace("×",""));



profit =
Math.floor(bet*multiplier);



document.getElementById("profit").innerHTML =
profit;



document.getElementById("multi").innerHTML =
value;



card.classList.add("win");



message.innerHTML=

`
✨ برد

<br>

سود فعلی:

<h2>
${profit} 🪙
</h2>

`;



}



}






function cashout(){


if(!playing)
return;



data.coins += profit;


data.wins++;


if(profit > data.record)

data.record=profit;



data.history.unshift(

"🃏 Card Master +"+profit+" 🪙"

);



playing=false;



document.getElementById("cashout").disabled=true;



document.getElementById("message").innerHTML=

`
💰 برداشت موفق

<br>

${profit} 🪙 اضافه شد

`;



save();

updateCoins();


}
