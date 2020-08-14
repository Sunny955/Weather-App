const request=require("request");

const forecast = (address,callback) =>{
    const url ="http://api.weatherstack.com/current?access_key=21fbb4ac5c14ed46d0be12dd6e97e40a&query="+encodeURIComponent(address)+"&units=m"
     request({url,json:true},(error,{body}) => {
         if(error){
             callback("Network error can't able to fetch data",undefined)
         }else if(body.success===false){
             callback("Weather not available",undefined)
         }else{
             callback(undefined,{
                palcename:body.request.query,
                weather:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                feels_like:body.current.feelslike,
                day:body.current.is_day   
             })
         }
     });

}
module.exports=forecast