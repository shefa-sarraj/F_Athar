const cities=[
    {name:"غزة هاشم", title:"مدينة الصمود", img:"images/gaza.jpeg", link: "about_city_3.html"},
    {name:" القدس الشريف", title:"مدينة الصمود..تاريخ يرويه الحجر", img:'images/jerosalem.jpeg' , link: "about_city.html"},
    {name:" يافا", title:" عروس البحر", img:"images/yafa.jpeg" , link: "about_city_4.html"} ,
    {name:" حيفا", title:" عروس الكرمل", img:"images/heafa.jpeg" , link: "about_city_5.html"},
    {name:" الخليل", title:"مدينة الاباء", img:"images/hebron.jpeg" , link: "about_city_2.html"},
    {name:"بيت لحم", title:"مدينة الميلاد", img:"images/beat laheam.jpeg" , link: "about_city_6.html"},
    {name:" جنين", title:"عش الشهداء", img:"images/jenean.jpeg" , link: "about_city_7.html"},
    {name:"طول كرم", title:"خضراء فلسطين", img:"images/toal karem.jpeg" , link: "about_city_8.html"},
    {name:" قلقيلية", title:"مدينة البرتقال", img:"images/qalaelia.jpeg" , link: "about_city_13.html"},
    {name:" أريحا", title:"مدينة القمر", img:"images/jericho.jpeg" , link: "about_city_1.html"},
    {name:"رام الله", title:"عروس المصايف", img:"images/ramallah.jpeg" , link: "about_city_9.html"},
    {name:" سلفيت", title:"سلة خبز فلسطين", img:"images/salfeat.jpeg" , link: "about_city_14.html"},
    {name:" طوباس", title:"سلة الغذاء", img:"images/tobas.jpeg" , link: "about_city_12.html"},
    {name:"بيت جالا", title:"مدينة الكرمة", img:"images/beatjala.jpeg" , link: "about_city_10.html"},
    {name:"بيت ساحور", title:"مدينة الرعاء", img:"images/beat sahour.jpeg" , link: "about_city_11.html"}
];


const container = document.getElementById("city-container");

let currentIndex = 0;

function createCards(){

    cities.forEach((city,index)=>{

        const card = document.createElement("div");

        card.className = "card";

        if(index === 0){
            card.classList.add("left");
        }

        if(index === 1){
            card.classList.add("center");
        }

        if(index === 2){
            card.classList.add("right");
        }

        card.innerHTML = `

            <div class="city-img-frame">

                <img src="${city.img}"
                     class="city-image">

                <img src="images/decoration.png"
                     class="gate-frame">

            </div>

            <h3>${city.name}</h3>

            <p>${city.title}</p>

            <a class="explore-btn" href="${city.link}">
                أدخل إلى ${city.name}
            </a>

        `;

        container.appendChild(card);
    });

}


let position = 0;

function updateCards(){

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.classList.remove(
            "left",
            "center",
            "right",
            "hidden"
        );

    });

    const total = cards.length;

    const left =
        (position) % total;

    const center =
        (position + 1) % total;

    const right =
        (position + 2) % total;

    cards.forEach((card,index)=>{

        if(index === left){

            card.classList.add("left");

        }

        else if(index === center){

            card.classList.add("center");

        }

        else if(index === right){

            card.classList.add("right");

        }

        else{

            card.classList.add("hidden");

        }

    });

}

function changeCity(step){

    const cards =
        document.querySelectorAll(".card");

    position =
        (position + step + cards.length)
        % cards.length;

    updateCards();
}

createCards();

updateCards();





