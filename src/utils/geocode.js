const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + 
        '.json?access_token=pk.eyJ1Ijoic3VuZ3AyayIsImEiOiJjanp1b2Rvam8waGdoM25sbXQ0bWk0cmU3In0.dGfCr2r_bQoUAYiUHHtFGA'
    //request({url: url, json: true}, (error, response) => {
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        //} else if (response.body.features.length < 1) {
        } else if (body.features.length < 1) {
            callback('Unable to find the address. Try another search', undefined);
        } else {
         //   const {center, place_name: location} =  response.body.features[0]
         //  const {center, place_name: location} =  response.body.features[0]
            const {center, place_name: location} =  body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location,
            })
        } 
    })
}


module.exports = geocode;