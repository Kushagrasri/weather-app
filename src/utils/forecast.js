const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url= 'http://api.weatherstack.com/current?access_key=ef45b326d9ffc32e626606f96db36df1&query='+latitude+','+longitude
    request( {url, json: true}, (error,{body}) => {
        // console.log(response.body)
        if(error){
            callback('Unable to connect to services!',undefined)
        }
        else if(body.error){
            callback('Unable to find location!',undefined)
        }else{
            const curr=body.current
            const data = curr.weather_descriptions[0] + '. It is currently ' + curr.temperature + ' degrees Celsius outside. There is a ' + curr.precip + '% chance of rainfall. '
            
            callback(undefined, data)
        }
        
    })
}

module.exports = forecast
