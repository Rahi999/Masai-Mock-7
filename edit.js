document.getElementById("form").addEventListener("submit",putRequest);
let id = localStorage.getItem("id");

 fetch(`https://fakestoreproducts.herokuapp.com/cars/${id}`)
 .then((res)=> res.json())
 .then((res)=> {
    console.log(res)
    let brand = document.getElementById('cars').value = res.brand;
    let type = document.getElementById('type').value = res.type;
    let year = document.getElementById('year').value = res.year;
    let kms = document.getElementById('driven').value = res.kms
    let description = document.getElementById("description").value = res.description;
    let price = document.getElementById("price").value = res.price;

})


function putRequest(e) {
e.preventDefault();

let brand = document.getElementById('cars').value;
let type = document.getElementById('type').value;
let year = document.getElementById('year').value;
let kms = document.getElementById('driven').value;
let description = document.getElementById("description").value;
let price = document.getElementById("price").value


fetch(`https://fakestoreproducts.herokuapp.com/cars/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        brand: brand,
        type: type,
        year: year,
        kms: kms,
        description : description,
        price : price
    })
   })
    .then(response => response.json())
    .then(response => {
        window.location.href="cars.html"
        localStorage.removeItem("id")
       });
}