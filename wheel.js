let spinning=false;


let prizes=[

"پوچ",
10000,
1000,
3000,
"پوچ",
8000,
15000,
5000,
20000,
"پوچ"

];




function spinWheel(){



if(spinning)
return;


let data =
JSON.parse(localStorage.getItem("royalData"));



if(data.coins < 8000){

alert("موجودی کافی نیست");

return;

}



spinning=true;


data.coins-=8000;


data.games++;



localStorage.setItem(
"royalData",
JSON.stringify(data)
);




let index =
Math.floor(Math.random()*10);



let wheel =
document.getElementById("wheel");



let rotate =

(360*8)+(index*36);



wheel.style.transform=

`rotate(${rotate}deg)`;





setTimeout(()=>{


let prize=prizes[index];



let result =
document.getElementById("result");



if(prize==="پوچ"){


result.innerHTML=

`

<div>
نتیجه:
</div>

<h2>
پوچ
</h2>

`;



}

else{


data.coins+=prize;

data.wins++;


if(prize>data.record)
data.record=prize;


data.xp+=20;



localStorage.setItem(
"royalData",
JSON.stringify(data)
);



result.innerHTML=

`

🎉 تبریک

<br>

جایزه شما:

<h2>
${prize} 🪙
</h2>

`;



document.getElementById("coins").innerHTML=
data.coins;


}



spinning=false;


},20000);



}
