const request = require("request");

const geocode=(address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoic3VubjkwNTB5IiwiYSI6ImNrZDY3MTZqbjAzenIyeHZxMzR3eTI2c3QifQ.FMwNuXERKI4J1T9-xftRFg&limit=1"
     request({url,json:true},(error,{body}) => {
       if(error){
         callback("Unable to fetch data from internet!",undefined)
       }else if(body.features.length === 0){
         callback("Incorrect name of the place!",undefined)
       }else{
         callback(undefined,{
            city:body.features[0].text,
           longitude:body.features[0].center[0],
           latitude:body.features[0].center[1],
           placename:body.features[0].place_name
         })
       }
     });
   }

   module.exports=geocode