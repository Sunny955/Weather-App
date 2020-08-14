// const forecast = require("../../src/utils/forecast");

console.log("Client side javascript");

// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//        console.log(data);
//     })
// })



const Form=document.querySelector("form")
const search=document.querySelector("input")
const message_1=document.querySelector("#message-1")
const message_2=document.querySelector("#message-2")
const message_3=document.querySelector("#message-3")
Form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const Location=search.value
    message_1.textContent="Loading..."
    message_2.textContent=" "
    message_3.textContent=" "
    fetch("http://localhost:3000/weather?address="+Location).then((response) =>{
    response.json().then((data)=>{
      if(data.error){
          message_1.textContent=data.error
      }else{
    //   console.log(data.location);
    //   console.log(data.forecast.weather);
    //   console.log(data.forecast.temperature);
        message_1.textContent=data.location
        message_2.innerHTML="<strong>Weather:</strong>"+data.forecast.weather
        message_3.innerHTML="<strong>Temperature in C:</strong>"+data.forecast.temperature
        }
    })
})
})