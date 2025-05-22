
let btn = document.querySelector(".button-t") ;

let token = localStorage.getItem("token");

if(!token) {
    window.location.href = "/login";
}

document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".custom-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          this.classList.add("bg-primary");
          this.classList.add("border-primary");
        } else {
          this.classList.remove("bg-primary");
          this.classList.remove("border-primary");
        }
      });
    });
  });

window.addEventListener("click", (evt) => {
    if(evt.target.matches(".button-t")){
       handleDel(evt.target.dataset.id) ;
    };
});

window.addEventListener("change", async (evt) => {
    let idx = evt.target.dataset.id ;
    if(evt.target.matches(".js-first")){
        try {
            const req = await fetch(`http://localhost:4000/api/employes/edit/${idx}`, {
                method : "PUT",
                headers : {
                    "Content-type" : "application/json",
                    token: localStorage.getItem("token")
                },
                body : JSON.stringify({firstname : evt.target.value})
            });
            if(req.ok){
                const res = await req.json() ;
            }
        } catch (error) {
            console.log(error)
        }
    };
    if(evt.target.matches(".js-last")){
        try {
            const req = await fetch(`http://localhost:4000/api/employes/edit/${idx}`, {
                method : "PUT",
                headers : {
                    "Content-type" : "application/json",
                    token: localStorage.getItem("token")
                },
                body : JSON.stringify({lastname : evt.target.value})
            });
            if(req.ok){
                const res = await req.json() ;
            }
        } catch (error) {
            console.log(error)
        }
    };
    if(evt.target.matches(".js-email")){
        try {
            const req = await fetch(`http://localhost:4000/api/employes/edit/${idx}`, {
                method : "PUT",
                headers : {
                    "Content-type" : "application/json",
                    token: localStorage.getItem("token")
                },
                body : JSON.stringify({email : evt.target.value})
            });
            if(req.ok){
                const res = await req.json() ;
            }
        } catch (error) {
            console.log(error)
        }
    };
    if(evt.target.matches(".js-phone")){
        try {
            const req = await fetch(`http://localhost:4000/api/employes/edit/${idx}`, {
                method : "PUT",
                headers : {
                    "Content-type" : "application/json",
                    token: localStorage.getItem("token")
                },
                body : JSON.stringify({phone : evt.target.value})
            });
            if(req.ok){
                const res = await req.json() ;
            }
        } catch (error) {
            console.log(error)
        }
    }
})

async function handleDel(id){
    try {
        const req = await fetch(`http://localhost:4000/api/employes/delete/${id}`, {
            method : "DELETE",
            headers : {
                "Content-type" : "application/json",
                token: localStorage.getItem("token"),
            },
            body: JSON.stringify({
                deleteId: id
            })
        });
        if(req.ok){
            const res = await req.json() ;
            alert("Employe muvaffaqiyatli o'chirib bo'lindi")
            window.location.href = '/employes'
        }
    } catch (error) {
        console.log(error)
    }
}
