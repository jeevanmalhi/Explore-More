const request = require('request')

const forecast = (long, lat, callback) => {

    const url ='https://api.darksky.net/forecast/2583d03e42c0094d0c7866d553ece143/'+lat+','+ long+'?units=si'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to forecast services.', undefined)
        }else if(body.error){
            callback('Unable to find location. Try another location.', undefined)
        }else{
                callback(undefined, 
                    body.daily.data[0].summary +' Its currently '+ body.currently.temperature+' degrees outside with a '+ body.currently.precipProbability+'% chance of rain. The day time high temperatre will be '+body.daily.data[0].temperatureHigh+' degrees and the low '+body.daily.data[0].temperatureLow+' degrees.'
                )
            }
        
    })

}

module.exports = forecast