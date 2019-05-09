let myBaseLink = "http://ingeniousneuron.com/kbhHusetDB/wordpress/wp-json/wp/v2/";
const template = document.querySelector("#games-template").content;
const parent = document.querySelector(".games-main");
const navCats = document.querySelector(".navCats");
const urlParams = new URLSearchParams(window.location.search);
const catID = urlParams.get("cat");


function loadAll() {
    fetch(myBaseLink + "board_game?_embed").then(e => e.json()).then(show);
}


function show(data) {
    data.forEach(object => {
        console.log(object);

        //cloning the template
        const clone = template.cloneNode(true);

        //populate it
        const name = clone.querySelector("h1");
        name.textContent = object.title.rendered;

        const players = clone.querySelector(".players");
        players.textContent = "players: " + object.number_of_players;

        const genre = clone.querySelector(".genre");
        genre.textContent = object.genre;
        
        const img = clone.querySelector("img");
        img.src = object._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        
        const a = clone.querySelector(".details");
        a.href = "games-details.html?id=" + object.id;
        
        //append to DOM
        parent.appendChild(clone) // puts the tamplate in my <main>
    })
}


//loadAll();


function loadCats() {
    fetch(myBaseLink + "categories?per_page=100").then(e=>e.json()).then(makeCatMenu);
}

function makeCatMenu(data){
    //console.log(data);
    data.forEach(cat=>{
        console.log(cat.parent)
        if(cat.parent==19){
            const newA = document.createElement("a");
            newA.textContent=cat.name;
            newA.href="?cat="+cat.id;
            navCats.appendChild(newA);
        }
    })
}

loadCats();

function loadGamesByCat(cat) {
    fetch(myBaseLink+"board_game?categories="+cat+"&_embed").then(e=>e.json()).then(show);
}

if(catID){
    loadGamesByCat(catID);
}else{
    loadAll();
};

