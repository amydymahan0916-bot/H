let coins = 100000;
let currentBet = 0;


function updateCoins(){

    document.getElementById("coins").innerHTML = coins;

}




function startGame(){


    currentBet = Number(
        document.getElementById("bet").value
    );


    if(!currentBet || currentBet <= 0){

        alert("مبلغ را وارد کنید");
        return;

    }


    if(currentBet > coins){

        alert("موجودی کافی نیست");
        return;

    }



    coins -= currentBet;

    updateCoins();



    let cards = [

        "BOMB",
        "BOMB",
        "POUCH",
        "×0.1",
        "×1",
        "×3"

    ];



    cards.sort(
        ()=>Math.random()-0.5
    );



    let box =
    document.getElementById("gameBox");



    box.innerHTML = `

    <div class="cards">

    ${
        cards.map((item)=>`

        <div class="card" onclick="openCard(this,'${item}')">

            <div class="card-inner">

                <div class="front">
                    ?
                </div>

                <div class="back">
                    ${item}
                </div>

            </div>

        </div>

        `).join("")
    }

    </div>

    `;



    document.getElementById("result").innerHTML =
    "یک کارت انتخاب کنید";

}





function openCard(card,value){



    if(card.classList.contains("open"))
    return;



    card.classList.add("open");



    let result =
    document.getElementById("result");



    if(value=="BOMB"){


        result.innerHTML =
        `
        💣 BOMB

        <br>

        مبلغ ${currentBet} سکه از بین رفت

        `;


        document
        .querySelectorAll(".card")
        .forEach(c=>c.onclick=null);



    }


    else if(value=="POUCH"){


        result.innerHTML =
        `
        پوچ

        <br>

        جایزه‌ای دریافت نشد

        `;


    }


    else{


        let multi =
        Number(value.replace("×",""));



        let prize =
        Math.floor(currentBet * multi);



        coins += prize;


        updateCoins();



        result.innerHTML =
        `
        🎉 برنده شدید

        <br>

        ضریب:
        ${value}

        <br>

        جایزه:
        ${prize} 🪙

        `;


    }


}
