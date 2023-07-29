console.log("Client script loaded !")

let weatherForm = document.querySelector("form");
let searchInput = document.querySelector("input");
let messageOne = document.querySelector("#message-1");
weatherForm.addEventListener("submit",(e) => {
    e.preventDefault();
    messageOne.textContent ="Loading..."
    let location = searchInput.value;
    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((res) => {
            console.log(res);
            if(res.error){
             messageOne.textContent = res.error;
            } else {
            messageOne.textContent = res.response;
            }
        })
    })
    console.log("submitted...!")
})