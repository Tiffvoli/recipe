const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
  modal.classList.add("hide");
});

const spreadsheetID = "14jN_OBdG3KbLqxa-GYlX9AWd0M0EtconzV_pqAAe7uk";
const endpoint= `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/od6/public/values?alt=json`;



fetch(endpoint)
.then(res=>res.json())
.then(function(data){
    data.forEach(buildCategory)
    getProducts();
})

function buildCategory(data){
    const section = document.createElement("section");
    const header = document.createElement("h1");
    header.textContent= data;
    section.setAttribute("id", data);
    section.appendChild(header);
    document.querySelector("main").appendChild(section);;
}

function getProducts(){
fetch(endpoint)
.then(function(response){
    return response.json()
}).then(function(data){
   data.forEach(showFood)
})
}


function showFood(foodData){
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    console.log(foodData.gsx$name.$t)
    copy.querySelector(".recipe-name").textContent=foodData.gsx$name.$t;
    copy.querySelector(".country").textContent=foodData.gsx$country.$t;
    copy.querySelector(".flag").src = `http://tiffvoli.com/flag-images/${foodData.gsx$flag.$t}`;
    copy.querySelector(".food-pic").src = `http://tiffvoli.com/food-images/${foodData.gsx$foodimg.$t}`;
    copy.querySelector(".difficulty").textContent= "Difficulty: " +  foodData.gsx$difficulty.$t;
    copy.querySelector(".popularity").textContent="Popularity: " +  foodData.gsx$popular.$t;
    copy.querySelector(".short-description").textContent= foodData.gsx$description.$t;
     copy.querySelector("button").addEventListener("click", () => {
    fetch(endpoint)
      .then(res => res.json())
      .then(showDetails);
  });
    document.querySelector(`$#{foodData.gsx$category.$t}`).appendChild(copy);
}




function showDetails(data) {

  modal.classList.remove("hide");
}