const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/7220f82ecc28b3f0df33cd01ae9ebe18/' + lat + ',' + lon 
//    request({url, json: true}, (error, response) => {
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        //} else if (response.body.error) {
        } else if (body.error) {
            callback('Unable to find the location. Try another search', undefined);
        } else {
            const {currently, daily} = body;
            const {temperature: currentTemp, precipProbability: precipProb} = currently;
            // callback(undefined, {
            //     dailySummary:  daily.data[0].summary,
            //     currentTemp,
            //     precipProb,
            // })
            callback(undefined, daily.data[0].summary + 'It is currently ' + currentTemp + ' with chance of rain ' + precipProb)
        } 
    })
}


module.exports = forecast;