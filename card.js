let risk="normal";

let bet=0;

let profit=0;

let playing=false;


let data=
JSON.parse(localStorage.getItem("royalData"))
||
{
coins:100000,
wins:0,
games:0,
record:0
};



function save(){

localStorage.setItem(
"royalData",
JSON.stringify(data)
);

}



function update(){

coins.innerHTML=data.coins;

}


update();





function setRisk(x){

risk=x;

}





function startGame(){


if(playing)
return;



bet=
Number(document.getElementById("bet").value);



if(!bet || bet>data.coins){

alert("مبلغ اشتباه است");

return;

}



data.coins-=bet;

data.games++;


profit=0;

playing=true;



betView.innerHTML=bet;

profit.innerHTML=0;

multi.innerHTML="×1";



let cards;



if(risk=="safe"){

cards=[
"×1",
"×1.5",
"×2",
"POUCH",
"BOMB",
"BOMB"
];

}

else if(risk=="elite"){

cards=[
"BOMB",
"BOMB",
"×3",
"×4",
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



cards.sort(()=>Math.random()-.5);



let box=document.getElementById("cards");

box.innerHTML="";



cards.forEach((x,i)=>{


box.innerHTML+=`

<div class="card">

<div class="inner"
onclick="chooseCard(this,'${x}')">

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



cashout.disabled=false;


save();

update();


}





function chooseCard(card,value){


if(!playing)
return;


card.parentElement.classList.add("open");



if(value=="BOMB"){


card.parentElement.classList.add("bomb");


profit=0;

playing=false;


cashout.disabled=true;



message.innerHTML=

"💣 BOMB<br>بازی تمام شد";

}



else if(value!="POUCH"){


let m=
Number(value.replace("×",""));


profit=
bet*m;



document.getElementById("profit").innerHTML=profit;

multi.innerHTML=value;


card.parentElement.classList.add("win");



message.innerHTML=

"✨ سود فعلی: "+profit+" 🪙";


}


}





function cashOut(){


if(!playing)
return;


data.coins+=profit;

data.wins++;


if(profit>data.record)
data.record=profit;


playing=false;


cashout.disabled=true;


message.innerHTML=
"💰 برداشت شد "+profit+" 🪙";


save();

update();


}
