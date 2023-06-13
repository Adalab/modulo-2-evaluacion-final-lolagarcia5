'use strict';

let characters = document.querySelector(".characterlist");
let favorite = document.querySelector(".favoritelist");
let favbutton = document.querySelector(".favbutton");


const URL = 'https://api.disneyapi.dev/character?pageSize=50';


let list = []
let favoritelist = []
let id = {
  _id:'',
  name:'',
  imageUrl:'',
};

/*let Storagelist = JSON.parse(localStorage.getItem('fav'));*/
let favstorage =[]
if(localStorage.getItem('fav')!=null){
  favstorage = JSON.parse(localStorage.getItem ('fav'));
}

let cardid = document.querySelector(".cardid");

function engloblist() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      list = data.data;
      console.log(list)
      rendercharacters(list,id);
    });
};

engloblist();
/*fetch (URL)
.then ((response) => response.json())
.then((data) => {
    console.log(data)
    list = data.data;
    list.forEach(element => {
      characters.innerHTML += 
      `<li class="cardid" 
  id="${element._id}"> 
  <img class="card" src="${element.imageUrl}">
   <button class="favbutton">+
  </button> 
  <p> ${element.name}</p> 
  </li>`; 
      
    });
});*/


function rendercharacters(list) {
  favorite.innerHTML = ``;
  characters.innerHTML = ``;

  list.forEach(element => {
    let isfav = "";
  
if (favstorage.includes(element._id.toString()))
 {
  isfav = "paintcard"
      favorite.innerHTML += `<li class="cardid" 
    id="${element._id}"> 
    <img class="card" src="${element.imageUrl}">
     <button class="favbutton">+
    </button> 
    <p> ${element.name}</p> 
    </li>`;
    }

    characters.innerHTML +=
    `<li class="cardid ${isfav}" 
id="${element._id}"> 
<img class="card" src="${element.imageUrl}">
<button class="favbutton">+
</button> 
<p> ${element.name}</p> 
</li>`;

  });
}

let thefavs = [];

function handleClick(event) {
  const id = event.target.closest("li").id;
  
  let favslist = favstorage.find (name => { 
   return name == id});
  console.log(favslist)

  if (favslist == -1||favslist==undefined) {
    favstorage.push(id);

  } else {
    const index = favstorage.indexOf(id);
    favstorage.splice(index, 1);
  }
  localStorage.setItem('fav', JSON.stringify(favstorage));
  engloblist();
}

characters.addEventListener('click', handleClick);





