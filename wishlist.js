document.getElementById("container").innerHTML = null
let loading = document.createElement("img");
loading.setAttribute('id','loading')
loading.src = "https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"
document.getElementById("container").append(loading)
 
 fetch("https://fakestoreproducts.herokuapp.com/wishlisted_cars")
 .then((res)=> res.json())
 .then((res)=> displayWishListedCars(res))



function displayWishListedCars(data) {
    document.getElementById("container").innerHTML = null;
    data.map((el)=> {
        let parent = document.getElementById("container");
      

        let box = document.createElement("div");
        box.setAttribute('id',"box");

        let img = document.createElement("img");
        img.setAttribute("id","img");
        img.src = "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?cs=srgb&dl=pexels-mike-b-120049.jpg&fm=jpg";

        let year = document.createElement("h3");
        year.setAttribute("id","year")
        year.innerText = `Purchase Year :${el.year}`

        let brand = document.createElement("h3");
        brand.setAttribute("id","brand");
        brand.innerText = `Car Brand :${el.brand}`

        let driven = document.createElement("h3");
        driven.setAttribute("id","driven");
        driven.innerText = `Driven :${el.kms}Kms`

        let type = document.createElement("h3");
        type.setAttribute("id","type");
        type.innerText = `Car Type :${el.type}`

        let price = document.createElement("h3");
        price.setAttribute("id","price");
        price.innerText = `Price :${el.price}`

        let description = document.createElement("h3");
        description.setAttribute("id","description");
        description.innerText = el.description;

        let btn = document.createElement("img");
        btn.setAttribute("id","delete");
       btn.src = 'https://www.svgrepo.com/show/21045/delete-button.svg'
        btn.addEventListener("click",()=> deleteCarData(el.id));



        box.append(img,year,brand,driven,type,price,description,btn);
        parent.append(box)
    })
}

// Delete From WishList --->>>>>>>>>>>>>>

function deleteCarData(id){

    fetch(`https://fakestoreproducts.herokuapp.com/wishlisted_cars/${id}`,{
        method: "DELETE"
    })
    .then((res)=> res.json())
    .then((res)=> window.location.reload())
}