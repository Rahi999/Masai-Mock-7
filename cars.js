document.getElementById("container").innerHTML = null
let loading = document.createElement("img");
loading.setAttribute('id','loading')
loading.src = "https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"
document.getElementById("container").append(loading)

fetch("https://fakestoreproducts.herokuapp.com/cars")
.then((res)=> res.json())
.then((res)=> {
    
    displayCars(res) 
    
    // ------->>>>>>>>> Sort BY Price ----->>>>>>>>>>>>>

    document.getElementById("select").addEventListener("change", handlePriceSort)
    function handlePriceSort(){
            document.getElementById("container").innerHTML = null
            let loading = document.createElement("img");
            loading.setAttribute('id','loading')
            loading.src = "https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"
            document.getElementById("container").append(loading)
   
          var selected = document.querySelector("#select").value;
          console.log(selected);
          if(selected=="asc")
          {
              res.sort(function(a,b){
                  if(Number(a.price) > Number(b.price) )  return 1
                  if(Number(a.price) < Number(b.price) )  return -1;
                  return 0
              });
              displayCars(res)
          }
          if(selected=="des")
          {
              res.sort(function(a,b){
                  if(Number(a.price) > Number(b.price) )  return -1
                  if(Number(a.price) < Number(b.price) )  return 1;
                  return 0
              });
              displayCars(res)
          }
      }

      // ------>>>>>>>> Sort By Kelometers Driven   ---------->>>>>>>>>>

      document.getElementById("select1").addEventListener("change", handlekeloMeterDriven)
      function handlekeloMeterDriven(){
              document.getElementById("container").innerHTML = null
              let loading = document.createElement("img");
              loading.setAttribute('id','loading')
              loading.src = "https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"
              document.getElementById("container").append(loading)
     
            var selected = document.querySelector("#select1").value;
            console.log(selected);
            if(selected=="asc")
            {
                res.sort(function(a,b){
                    if(Number(a.kms) > Number(b.kms) )  return 1
                    if(Number(a.kms) < Number(b.kms) )  return -1;
                    return 0
                });
                displayCars(res)
            }
            if(selected=="des")
            {
                res.sort(function(a,b){
                    if(Number(a.kms) > Number(b.kms) )  return -1
                    if(Number(a.kms) < Number(b.kms) )  return 1;
                    return 0
                });
                displayCars(res)
            }
        }
});

// ------->>>>>>>>> Deleting Functionality  -------->>>>>>>>>

function deleteCarData(id){

    fetch(`https://fakestoreproducts.herokuapp.com/cars/${id}`,{
        method: "DELETE"
    })
    .then((res)=> res.json())
    .then((res)=> window.location.reload())
}

// ---------->>>>>>>>>>Editing Functionalities   ---->>>>>>>>>>>>>>>>

function editCarData(id) {
    localStorage.setItem("id",id)
    window.location.href = "edit.html"
}


// ------->>>>>> Add To WishList Functionality   -------->>>>>>>>>>>>

function addToWishList(year, brand, kms, type, price, description) {
    fetch('https://fakestoreproducts.herokuapp.com/wishlisted_cars',{
        method:"POST",
        body:JSON.stringify(
            {
                brand: brand,
                year: year,
                type: type,
                kms: kms,
                description: description,
                price : price
            }
        ),
        headers: {
         "Content-type": "application/json"
     }

    })
        .then(res=>res.json())
        .then(json=> {
         alert("Item Added To Wishlist")
         window.location.href="wishlist.html"
         
     })
     .catch(()=> alert("Adding Failed!!"))
}

// document.getElementById("container").innerHTML = null


 //   -------->>>>>>>>> Displayig All Cars Details On UI    ------------->>>>>>>>>>>>>
function displayCars(data) {
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
        price.innerText = `Price :${el.price}₹`

        let description = document.createElement("h3");
        description.setAttribute("id","description");
        description.innerText = el.description;

        let btn = document.createElement("img");
        btn.setAttribute("id","delete");
       btn.src = 'https://www.svgrepo.com/show/21045/delete-button.svg'
        btn.addEventListener("click",()=> deleteCarData(el.id));

        let edit = document.createElement("img");
        edit.setAttribute("id","edit");
        edit.src = 'https://cdn-icons-png.flaticon.com/512/157/157325.png'
        edit.addEventListener("click",()=> editCarData(el.id));

        let wishList = document.createElement("img");
        wishList.setAttribute("id","wishList");
        wishList.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2aguVXc-XVXtv6Q7Q0Plt6TBQvVibvO7Lqb9XH8v2tyhB05j_VF1Dwaebhpq5te9wSTc&usqp=CAU'
        wishList.addEventListener("click",()=> addToWishList(el.year, el.brand, el.kms, el.type, el.price, el.description));

        box.append(img,description,year,brand,driven,type,price,btn,edit,wishList);
        parent.append(box)
    })
}


//  ------>>>>>>>>> Filter By Brand ------>>>>>>>>>>>>>

  document.getElementById("filter").addEventListener("change", filterBrand);

  function filterBrand() {
    let query = document.getElementById("filter").value;
    fetch(`https://fakestoreproducts.herokuapp.com/cars?q=${query}`)
    .then((res)=> res.json())
    .then((res)=> displayCars(res))
    .catch((err)=> alert("Didn't Match The Same"))
  }
  