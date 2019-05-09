let myBaseLink = "http://ingeniousneuron.com/kbhHusetDB/wordpress/wp-json/wp/v2/";
const template = document.querySelector("#events-template").content;
const parent = document.querySelector("main");


function loadAll() {
    fetch(myBaseLink + "games-events?_embed").then(e => e.json()).then(show);
}


function show(data) {
    data.forEach(object => {
        console.log(object);

        //cloning the template
        const clone = template.cloneNode(true);

        //populate it
        const name = clone.querySelector("h1");
        name.textContent = object.title.rendered;

        const date = clone.querySelector(".date");
        date.textContent = object.event_date;

        const place = clone.querySelector(".place");
        place.textContent = object.place;
        
        const img = clone.querySelector("img");
        img.src = object._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        
        const a = clone.querySelector(".details");
        a.href = "events-details.html?id=" + object.id;
        
        //append to DOM
        parent.appendChild(clone) // puts the tamplate in my <main>
    })
}


loadAll();