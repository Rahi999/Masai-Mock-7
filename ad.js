document.getElementById("form").addEventListener('submit',postReq);

 function postReq(e) {
    e.preventDefault()
    let brand = document.getElementById("cars").value;
    let type = document.getElementById("type").value;
    let year = document.getElementById("year").value;
    let driven = document.getElementById("driven").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;

     
        fetch('https://fakestoreproducts.herokuapp.com/cars',{
            method:"POST",
            body:JSON.stringify(
                {
                    brand: brand,
                    year: year,
                    type: type,
                    kms: driven,
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
             alert("Please Verify OTP For Create Add")
             window.location.href="otp.html"
             
         })
         .catch(()=> alert("Adding Failed!!"))
           

     
 }