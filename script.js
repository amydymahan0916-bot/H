let coins = 100000;

let win = 0;
let lose = 0;


function update(){

document.getElementById("coins").innerHTML=coins;

document.getElementById("win").innerHTML=win;

document.getElementById("lose").innerHTML=lose;

document.getElementById("profit").innerHTML=win-lose;

}



function showWheel(){

document.getElementById("game").innerHTML=`

<h2>گردونه شانس</h2>

<div class="wheel" id="wheel"></div>

<button onclick="spin()">چرخاندن - 8000 🪙</button>

`;

}



function spin(){

if(coins < 8000){

alert("سکه کافی نیست");

return;

}


coins-=8000;

lose+=8000;


let prizes=[
0,
10000,
1000,
3000,
0,
8000,
15000,
5000,
20000,
0
];


let wheel=document.getElementById("wheel");

let deg=Math.floor(Math.random()*360)+2000;

wheel.style.transform=
"rotate("+deg+"deg)";


setTimeout(()=>{


let result=
prizes[Math.floor(Math.random()*prizes.length)];


if(result>0){

coins+=result;

win+=result;

alert("برنده شدید: "+result+" سکه");

}else{

alert("پوچ شد");

}


update();


},5000);



}




function showCards(){


let results=[

"bomb",
"bomb",
"0",
"×0.1",
"×1",
"×3"

];


results.sort(()=>Math.random()-0.5);



document.getElementById("game").innerHTML=`

<h2>کارت را انتخاب کنید</h2>

<div class="cards">

${results.map((x,i)=>`

<div class="card" onclick="openCard(this,'${x}')">
؟
</div>

`).join("")}

</div>

`;

}



function openCard(card,result){


if(card.classList.contains("open"))
return;


card.classList.add("open");


if(result=="bomb"){

card.innerHTML="💣";

alert("باختید");

}

else if(result=="0"){

card.innerHTML="پوچ";

alert("پوچ شد");

}

else{


let text=result;

card.innerHTML=text;


let number=
result.replace("×","");


alert("ضریب شما: "+text);

}



}




function charge(){

alert(
"برای افزایش موجودی و شارژ حساب به آیدی زیر در اپلیکیشن روبیکا پیام دهید.\n\n@Omidi__Xx"
);

}


update();