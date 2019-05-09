let myBaseLink = "http://ingeniousneuron.com/kbhHusetDB/wordpress/wp-json/wp/v2/";
const template = document.querySelector(".menu-template").content;
const parent = document.querySelector("main");
const navCats = document.querySelector(".navCats");
const urlParams = new URLSearchParams(window.location.search);
const catID = urlParams.get("cat");


function loadAll() {
    fetch(myBaseLink + "menu?per_page=100&_embed").then(e => e.json()).then(show);
}


function show(data) {
    data.forEach(object => {
        //console.log(object);

        //cloning the template
        const clone = template.cloneNode(true);

        //populate it
        const name = clone.querySelector(".menu-name");
        name.textContent = object.title.rendered;

        const price = clone.querySelector(".name");
        price.textContent = object.price + "dkk";

        const category = clone.querySelector(".members");
        category.textContent = object._embedded["wp:term"][0][0].name;
        
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
        if(cat.parent==22){
            const newA = document.createElement("a");
            newA.textContent=cat.name;
            newA.href="?cat="+cat.id;
            navCats.appendChild(newA);
        }
    })
}

loadCats();

function loadMenuByCat(cat) {
    fetch(myBaseLink+"menu?categories="+cat+"&_embed").then(e=>e.json()).then(show);
}

if(catID){
    loadMenuByCat(catID);
}else{
    loadAll();
};

