const path =require("path");
const express = require("express");
const hbs=require("hbs");
const geocode=require("./utils/geocode");
const forecast=require("./utils/forecast");

const app = express();
const PublicPath=path.join(__dirname,"../public")
const ViewPath=path.join(__dirname,"../templates/views")
const PartialsPath=path.join(__dirname,"../templates/partials")
app.set("view engine","hbs")
app.set("views",ViewPath)
app.use(express.static(PublicPath))
hbs.registerPartials(PartialsPath)


app.get("",(req,res) => {
    res.render("index",{
        title:"Weather App",
        name:"Amiya Ranjan"
    })
})

app.get("/about",(req,res) => {
    res.render("about",{
        title:"About Page!!",
        name:"Amiya Ranjan"
    })
})

app.get("/help",(req,res) => {
    res.render("help",{
        message:"It's a help page",
        title:'Help',
        name:"Amiya Ranjan"
    })
})
 

app.get("/weather",(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide an address!"
        })
    }

    geocode(req.query.address,(error,{placename,city}={}) => {
       if(error){
           return res.send({error})
       }
      
        forecast(city,(error,{weather,temperature}={}) => {
            if(error){
                return res.send({error})
            }
            
            res.send({
                address:req.query.address,
                location:placename,
                forecast:{
                    weather,
                    temperature                    
                }
            });
        })
    })    
    
});

// app.get("/products",(req,res)=>{
//     if(!req.query.size){
//         return res.send({
//             error:"Galat likha hai tune bsdk"
//         })
//     }
//     console.log(req.query);
//     res.send({
//         products:[
//             req.query.name,
//             req.query.size
//         ]
//     })
// })

app.get("/help/*",(req,res) => {
    res.render("error",{
        title:"404",
        name:"Amiya Ranjan",
        errorMessage:"Help article not found"
    })
})

app.get("*",(req,res) => {
    res.render("error",{
        title:"404",
        name:"Amiya Ranjan",
        errorMessage:"Page not found"
    })
})


app.listen(3000,() => {
    console.log("Connected to port 3000");
});