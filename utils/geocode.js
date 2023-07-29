const request = require('postman-request');

const geocode = (address,callback)=> {

    const url = `https://api.weatherapi.com/v1/current.json?key=25ccb1753e9140e097524332231407&q=${encodeURIComponent(address)}&aqi=no`;
    request({url:url,json:true},(error,response,body) => {
        if (error) {
            callback("Unable to connect Weather Service",undefined)
        } else if (response.body.error) {
           callback("Unable to Find Location",undefined);
        } else {
            const current = body.current;
            callback(undefined,{
               "longitude":body.location.lon,
               "latitude":body.location.lat,
               "location":`${body.location.name}, ${body.location.country}`
            })
           
        }
    })
}

module.exports = geocode