let coins = 100000;

let win = 0;

let games = 0;

let record = 0;



function update(){


document.getElementById("coins").innerHTML=coins;

document.getElementById("walletCoins").innerHTML=coins;

document.getElementById("win").innerHTML=win;

document.getElementById("games").innerHTML=games;

document.getElementById("record").innerHTML=record;


}



function charge(){

alert(
"برای افزایش موجودی و شارژ حساب به آیدی زیر در روبیکا پیام دهید:\n\n@Omidi__Xx"
);

}




function withdraw(){

alert(
"درخواست برداشت ثبت شد."
);

}



update();
