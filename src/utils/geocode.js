const request = require('request')

const geocode = (address,callback) => {
    const location = encodeURIComponent(address)
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1Ijoib2theWt1c2giLCJhIjoiY2tpOTkxaHltMGRoazMxdGd3OHo4ZGJuaSJ9.i0js6NNBRIJ7kD_1fFWEEw&limit=1'

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to services')
        }
        else if(body.features.length === 0){
            callback('location not found')
        }
        else{
            
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode