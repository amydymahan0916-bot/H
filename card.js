let bet=0;

let profit=0;

let multi=1;

let playing=false;



let data =
JSON.parse(localStorage.getItem("royalData")) || {

coins:100000,
wins:0,
games:0,
record:0

};




function update(){

coins.innerHTML=data.coins;

}



update();




function startGame(){


if(playing)
return;



bet=
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

multi=1;


playing=true;



document.getElementById("betShow").innerHTML=bet;

document.getElementById("profit").innerHTML=0;

document.getElementById("multi").innerHTML="×1";



let cards=[

"BOMB",
"BOMB",
"POUCH",
"×1",
"×2",
"×3"

];



cards.sort(()=>Math.random()-0.5);



let box=document.getElementById("cards");


box.innerHTML="";



cards.forEach(x=>{


box.innerHTML+=`

<div class="card" onclick="openCard(this,'${x}')">


<div class="inner">


<div class="front">
RG
</div>


<div class="back">
${x}
</div>


</div>


</div>

`;

});



document.getElementById("cashout").disabled=false;


save();

update();

}





function openCard(card,value){


if(!playing)
return;


if(card.classList.contains("open"))
return;


card.classList.add("open");



if(value=="BOMB"){


profit=0;


playing=false;


document.getElementById("cashout").disabled=true;


document.getElementById("result").innerHTML=

"💣 BOMB<br>بازی تمام شد";


}




else if(value=="POUCH"){


document.getElementById("result").innerHTML=

"پوچ شد";



}




else{


multi=
Number(value.replace("×",""));



profit=
Math.floor(bet*multi);



document.getElementById("profit").innerHTML=
profit;


document.getElementById("multi").innerHTML=
value;



document.getElementById("result").innerHTML=

"🎉 سود فعلی: "+profit+" 🪙";



}



}




function cashOut(){


if(!playing)
return;


data.coins+=profit;


if(profit>data.record)
data.record=profit;


data.wins++;


playing=false;


document.getElementById("cashout").disabled=true;



document.getElementById("result").innerHTML=

"💰 برداشت شد: "+profit+" 🪙";



save();

update();


}




function save(){

localStorage.setItem(
"royalData",
JSON.stringify(data)
);

  }
