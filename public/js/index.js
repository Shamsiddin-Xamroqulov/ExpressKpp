let elForm = document.querySelector(".js-form") ;
let elEmailInput = document.querySelector('.email-input') ;
let elPasswordInput = document.querySelector('.password-input')

async function handleAdminLogin(email, password){
    let newAdmin = {
        email : email,
        password : password
    }
    try {
        const req = await fetch('http://localhost:4000/api/auth/login', {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(newAdmin),
        });


        if(req.ok){
            const res = await req.json() ;
            window.localStorage.setItem("token", res.token)
            alert("Admin successFully Logined");
            window.location.href = '/admin'
        }
    } catch (error) {
        console.log(error)
    }
}

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault() ;
    handleAdminLogin(elEmailInput.value, elPasswordInput.value) ;
})