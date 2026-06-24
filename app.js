let data = JSON.parse(localStorage.getItem("royalData")) || {

coins:100000,
wins:0,
games:0,
record:0,
xp:650,
history:[]

};



function save(){

localStorage.setItem(
"royalData",
JSON.stringify(data)
);

}




function update(){


coins.innerHTML=data.coins;

wins.innerHTML=data.wins;

games.innerHTML=data.games;

record.innerHTML=data.record;

xp.innerHTML=data.xp;


xpProgress.style.width=
(data.xp/10)+"%";



history.innerHTML =
data.history.length ?
data.history.join("<br>") :
"هنوز بازی‌ای انجام نشده";



save();

}




function addHistory(text){

data.history.unshift(text);

if(data.history.length>5)
data.history.pop();

update();

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
