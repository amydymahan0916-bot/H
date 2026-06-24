let risk="mid";



function setRisk(x){

risk=x;

}




function startCard(){


let bet =
Number(document.getElementById("bet").value);



if(!bet || bet<=0){

alert("مبلغ وارد کنید");

return;

}



let data =
JSON.parse(localStorage.getItem("royalData"));



if(data.coins < bet){

alert("موجودی کافی نیست");

return;

}



data.coins-=bet;

data.games++;



let cards;



if(risk=="high"){

cards=[
"BOMB",
"BOMB",
"×3",
"×2",
"×1",
"POUCH"
];

}

else if(risk=="low"){

cards=[
"BOMB",
"×0.5",
"×1",
"×1",
"×2",
"POUCH"
];

}

else{

cards=[
"BOMB",
"BOMB",
"POUCH",
"×0.1",
"×1",
"×3"
];

}



cards.sort(()=>Math.random()-0.5);



let box=document.getElementById("cards");

box.innerHTML="";



cards.forEach(c=>{


box.innerHTML+=`

<div class="card" onclick="openCard(this,'${c}',${bet})">


<div class="inner">


<div class="front">
RG
</div>


<div class="back">
${c}
</div>


</div>


</div>

`;


});



localStorage.setItem(
"royalData",
JSON.stringify(data)
);


document.getElementById("result").innerHTML=
"یک کارت انتخاب کنید";

}




function openCard(card,value,bet){


if(card.classList.contains("open"))
return;


card.classList.add("open");


let data =
JSON.parse(localStorage.getItem("royalData"));



let text="";



if(value=="BOMB"){


text="💣 بمب! مبلغ بازی از بین رفت";


}



else if(value=="POUCH"){


text="پوچ شد";

}


else{


let multi=
Number(value.replace("×",""));


let win=
Math.floor(bet*multi);


data.coins+=win;

data.wins++;

if(win>data.record)
data.record=win;


text=
"🎉 بردید "+win+" 🪙";


}



data.xp+=20;



localStorage.setItem(
"royalData",
JSON.stringify(data)
);



document.getElementById("result").innerHTML=text;



document.getElementById("coins").innerHTML=data.coins;


}
