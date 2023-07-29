const request = require('postman-request');

const forcast = (latitude,longitude,callback)=> {

    const url = `https://api.weatherapi.com/v1/current.json?key=25ccb1753e9140e097524332231407&q=${latitude},${longitude}&aqi=no`;
    console.log(url);
    request({url:url,json:true},(error,response,body) => {
        if (error) {
            callback("Unable to connect Weather Service",undefined)
        } else if (response.body.error) {
           callback("Unable to Find Location",undefined);
        } else {
            const current = body.current;
            callback(undefined,
               "In "+ body.location.name+" climate looks "+current.condition.text+". current temp is "+current.temp_c+" but feels like "+current.feelslike_c)
           
        }
    })
}

module.exports = forcast;