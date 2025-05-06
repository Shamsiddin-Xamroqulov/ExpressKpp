const mainDoor = document.querySelector(".js-main");
const backDoor = document.querySelector(".js-back");

mainDoor.addEventListener("click", () => {
    let doorId = localStorage.setItem("kppId", 1)
})

backDoor.addEventListener("click", () => {
    let doorId = localStorage.setItem("kppId", 2)
})