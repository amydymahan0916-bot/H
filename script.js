let coins = 100000;
let todayWin = 0;
let history = [];



function update(){

    document.getElementById("coins").innerHTML = coins;

    document.getElementById("todayWin").innerHTML = todayWin;

    document.getElementById("historyList").innerHTML =
    history.length ? history.join("<br>") : "هنوز بازی انجام نشده";

}




function addHistory(text){

    history.unshift(text);

    if(history.length > 5)
        history.pop();

    update();

}




// ---------------- کارت ----------------


function openCards(){


document.getElementById("gameArea").innerHTML = `

<h2>🃏 بازی کارت</h2>


<p>
مبلغ ورود را وارد کنید
</p>


<input id="bet" type="number" placeholder="مثلا 5000">


<br><br>


<button onclick="startCards()">
شروع بازی
</button>


`;

}



function startCards(){


let bet =
Number(document.getElementById("bet").value);



if(!bet || bet<=0){

alert("مبلغ وارد کنید");
return;

}


if(bet>coins){

alert("موجودی کافی نیست");
return;

}


coins-=bet;



let cards=[

"bomb",
"bomb",
"empty",
"×0.1",
"×1",
"×3"

];



cards.sort(()=>Math.random()-0.5);



window.currentBet=bet;



document.getElementById("gameArea").innerHTML=

`

<h2>یک کارت انتخاب کنید</h2>


<div class="cards">


${cards.map((x,i)=>`

<div class="card" onclick="chooseCard(this,'${x}')">

?

</div>

`).join("")}


</div>


`;



}



function chooseCard(card,result){


if(card.classList.contains("open"))
return;



card.classList.add("open");



if(result=="bomb"){


card.innerHTML="💣";


addHistory("💣 باخت - "+window.currentBet+" سکه");


alert(
"بمب خورد!\nمبلغ بازی از بین رفت"
);


document.querySelectorAll(".card")
.forEach(c=>c.onclick=null);



}


else if(result=="empty"){


card.innerHTML="پوچ";


addHistory("پوچ - بدون جایزه");


alert("پوچ شد");


}



else{


let multi =
Number(result.replace("×",""));


let prize =
Math.floor(window.currentBet * multi);



coins+=prize;

todayWin+=prize;



card.innerHTML=result;



addHistory(
"🏆 برد "+prize+" سکه"
);



alert(
"برنده شدید: "+prize+" سکه"
);


}



update();


}





// ---------------- گردونه ----------------



function openWheel(){



document.getElementById("gameArea").innerHTML=`

<h2>🎡 گردونه شانس</h2>


<div class="wheel" id="wheel"></div>


<button onclick="spinWheel()">

چرخاندن - 8000 🪙

</button>


`;

}




function spinWheel(){


if(coins<8000){

alert("سکه کافی نیست");
return;

}


coins-=8000;



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



let wheel=
document.getElementById("wheel");



wheel.style.transform=
"rotate("+(
Math.floor(Math.random()*3600)+1000
)+"deg";



setTimeout(()=>{


let prize=
prizes[Math.floor(Math.random()*prizes.length)];



if(prize){

coins+=prize;

todayWin+=prize;


addHistory(
"🎡 برد گردونه "+prize+" سکه"
);


alert(
"تبریک! "+prize+" سکه"
);


}else{


addHistory(
"🎡 گردونه پوچ"
);


alert("پوچ شد");


}


update();


},5000);



}




// ---------------- شارژ ----------------



function charge(){


alert(

"برای افزایش موجودی و شارژ حساب به آیدی زیر در اپلیکیشن روبیکا پیام دهید.\n\n@Omidi__Xx"

);


}





// ---------------- برداشت ----------------



function withdraw(){


alert(

"درخواست برداشت ثبت شد.\n\nموجودی شما بررسی می‌شود."

);


}




update();
