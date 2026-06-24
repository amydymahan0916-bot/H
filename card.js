let risk = "normal";

let bet = 0;

let profit = 0;

let playing = false;

let selectedCards = [];

let totalMultiplier = 1;



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
    data.coins.toLocaleString();

}


update();







function setRisk(type){

    risk = type;

}








function startGame(){


    if(playing)
    return;



    bet = Number(
        document.getElementById("bet").value
    );



    if(!bet || bet<=0){

        alert("مبلغ را وارد کنید");
        return;

    }



    if(bet > data.coins){

        alert("موجودی کافی نیست");
        return;

    }



    data.coins -= bet;



    data.games++;



    profit = 0;

    selectedCards = [];

    totalMultiplier = 1;


    playing = true;





    document.getElementById("betView").innerHTML =
    bet.toLocaleString();



    document.getElementById("profit").innerHTML =
    0;



    document.getElementById("multi").innerHTML =
    "×1";





    let cards;



    if(risk=="safe"){


        cards=[

        "×1",
        "×1.5",
        "×2",
        "×3",
        "POUCH",
        "BOMB"

        ];


    }


    else if(risk=="hard"){


        cards=[

        "BOMB",
        "BOMB",
        "×3",
        "×5",
        "×8",
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





    cards.sort(()=>Math.random()-0.5);





    let box =
    document.getElementById("cards");



    box.innerHTML="";





    cards.forEach((item)=>{


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

    "کارت انتخاب کنید";



    save();

    update();


}









function chooseCard(card,value){



    if(!playing)
    return;



    let parent = card.parentElement;



    if(parent.classList.contains("open"))
    return;



    parent.classList.add("open");







    if(value=="BOMB"){


        parent.classList.add("bomb");


        profit=0;


        playing=false;


        document.getElementById("cashout").disabled=true;



        document.getElementById("message").innerHTML=

        `
        💣 BOMB

        <br>

        بازی تمام شد

        `;


        return;


    }








    if(value=="POUCH"){


        document.getElementById("message").innerHTML=

        `
        کارت پوچ شد

        `;


        return;

    }







    let multi =
    Number(value.replace("×",""));



    selectedCards.push(multi);



    totalMultiplier *= multi;




    profit =
    Math.floor(
        bet * totalMultiplier
    );




    document.getElementById("multi").innerHTML =

    "×"+totalMultiplier;





    document.getElementById("profit").innerHTML =

    profit.toLocaleString();





    parent.classList.add("win");





    let list="";



    selectedCards.forEach((x,index)=>{


        list +=

        `
        کارت ${index+1}: ×${x}
        <br>
        `;


    });





    document.getElementById("message").innerHTML=

    `

    ✨ برد


    <br><br>

    ${list}


    <br>

    مجموع ضریب:
    ×${totalMultiplier}


    <br><br>


    مجموع سود:
    ${profit.toLocaleString()} 🪙


    `;



}








function cashOut(){



    if(!playing)
    return;




    data.coins += profit;



    data.wins++;



    if(profit > data.record)

    data.record = profit;




    data.history.unshift(

    "Card Master + "+profit+" 🪙"

    );




    playing=false;



    document.getElementById("cashout").disabled=true;




    document.getElementById("message").innerHTML=

    `

    💰 برداشت موفق


    <br>


    ${profit.toLocaleString()} 🪙

    `;




    save();

    update();


}
