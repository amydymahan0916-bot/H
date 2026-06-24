let risk = "normal";

let bet = 0;

let profit = 0;

let playing = false;


let data = JSON.parse(localStorage.getItem("royalData")) || {

    coins:100000,
    wins:0,
    games:0,
    record:0,
    history:[]

};



function save(){

    localStorage.setItem(
        "royalData",
        JSON.stringify(data)
    );

}



function update(){

    document.getElementById("coins").innerHTML =
    data.coins;

}



update();





function setRisk(type){

    risk = type;


    document.querySelectorAll(".risk-panel button")
    .forEach(btn=>{

        btn.style.opacity="0.5";

    });


    event.target.style.opacity="1";

}







function startGame(){


    if(playing)
    return;



    bet =
    Number(
        document.getElementById("bet").value
    );



    if(!bet || bet<=0){

        alert("مبلغ بازی را وارد کنید");
        return;

    }



    if(bet > data.coins){

        alert("موجودی کافی نیست");
        return;

    }



    data.coins -= bet;


    data.games++;



    profit = 0;


    playing = true;



    document.getElementById("betView").innerHTML =
    bet;



    document.getElementById("profit").innerHTML =
    0;



    document.getElementById("multi").innerHTML =
    "×1";





    let cards;



    if(risk==="safe"){


        cards=[

            "×1",
            "×1.5",
            "×2",
            "×3",
            "POUCH",
            "BOMB"

        ];

    }


    else if(risk==="hard"){


        cards=[

            "BOMB",
            "BOMB",
            "×2",
            "×3",
            "×5",
            "×10"

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






    cards.sort(()=>Math.random()-0.5);





    let box =
    document.getElementById("cards");



    box.innerHTML="";





    cards.forEach((item,index)=>{



        box.innerHTML += `


        <div class="card">


            <div class="inner"
            onclick="chooseCard(this,'${item}')">


                <div class="front">

                    RG

                </div>


                <div class="back">

                    ${item}

                </div>


            </div>


        </div>



        `;



    });





    document.getElementById("cashout").disabled=false;



    document.getElementById("message").innerHTML=
    "یک کارت انتخاب کنید";



    save();

    update();


}









function chooseCard(card,value){



    if(!playing)
    return;



    if(card.parentElement.classList.contains("open"))
    return;




    card.parentElement.classList.add("open");






    if(value==="BOMB"){



        profit=0;


        playing=false;


        document.getElementById("cashout").disabled=true;



        document.getElementById("message").innerHTML=

        `
        💣 BOMB

        <br>

        بازی تمام شد

        <br>

        مبلغ بازی از بین رفت

        `;



        return;

    }







    if(value==="POUCH"){



        document.getElementById("message").innerHTML=

        `
        کارت پوچ شد

        `;


        return;

    }







    let number =
    Number(value.replace("×",""));



    profit =
    Math.floor(
        bet * number
    );




    document.getElementById("profit").innerHTML =
    profit;



    document.getElementById("multi").innerHTML =
    value;





    document.getElementById("message").innerHTML=

    `
    ✨ برد فعلی

    <br>

    ${profit} 🪙

    `;



}








function cashOut(){



    if(!playing)
    return;



    data.coins += profit;



    data.wins++;



    if(profit > data.record){

        data.record = profit;

    }





    data.history.unshift(

        "🃏 Card Master : +"+profit+" 🪙"

    );





    playing=false;



    document.getElementById("cashout").disabled=true;



    document.getElementById("message").innerHTML=

    `
    💰 برداشت موفق

    <br>

    ${profit} 🪙

    `;




    save();

    update();


      }
