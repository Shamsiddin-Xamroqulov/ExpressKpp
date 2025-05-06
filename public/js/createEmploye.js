const elForms = document.querySelector(".js-forms") ;
const elFirst = document.querySelector('.js-firstname');
const elLast = document.querySelector('.js-lastname') ;
const elEmail = document.querySelector('.js-email') ;
const elPhone = document.querySelector('.js-phone');

let token = localStorage.getItem("token");

if(!token) {
    window.location.href = "/login";
}

elForms.addEventListener("submit", (evt) => {
    evt.preventDefault() ;
    handleAdEmploye(elFirst.value , elLast.value, elEmail.value, elPhone.value)
});

async function handleAdEmploye(firstname, lastname, email, phone) {
    try {
        const req = await fetch('http://localhost:4000/api/employes/create', {
            method : "POST",
            headers : {
                "Content-type" : "application/json",
                token: localStorage.getItem("token")
            },
            body : JSON.stringify({firstname, lastname, email, phone}),
        });
        if(req.ok){
            const res = await req.json() ;
            alert(`Employe muvaffaqiyatli qqo'shildi`) ;
            window.location.href = '/employes' ;
        }
    } catch (error) {
        console.log(error)
    }
}