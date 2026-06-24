let coins = 100000;


let prizes = [

"پوچ",
"10000",
"1000",
"3000",
"پوچ",
"8000",
"15000",
"5000",
"20000",
"پوچ"

];



let spinning = false;



function updateCoins(){

document.getElementById("coins").innerHTML =
coins;

}





function spin(){


if(spinning)
return;



if(coins < 8000){

alert("سکه کافی نیست");

return;

}



spinning=true;



coins-=8000;


updateCoins();



let wheel =
document.getElementById("wheel");



let random =
Math.floor(Math.random()*10);



let degree =
(360*8) + (random*36);



wheel.style.transform =
"rotate("+degree+"deg)";





setTimeout(()=>{


let result =
prizes[random];



let box =
document.getElementById("result");



if(result=="پوچ"){


box.innerHTML=

`
<h2>
نتیجه
</h2>

پوچ شد

`;



}else{


coins += Number(result);


updateCoins();


box.innerHTML=

`
<h2>
🎉 نتیجه گردونه
</h2>


جایزه شما:

<br>

<b>
${result} 🪙
</b>

`;



}



spinning=false;


},60000);



}



updateCoins();
