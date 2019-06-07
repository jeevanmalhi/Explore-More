const request = require('request')

const pointOfInterest = (address, callback) => {

    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Point+of+Interest+'+encodeURIComponent(address)+'&key=AIzaSyCSv7fHBG3qCuZewrE9uUoDlYoCh6ZnMSE'

    request({url, json: true},(error,{body}) => {
        if(error){
            callback('Uanble to connect to Points of Interest services', undefined)
        }
        else if(body.results.length === 0){
            callback('Unable to find location. Try different search', undefined)
        }
        else{
            callback(undefined, [
            
              {title: body.results[0].name,
                address: body.results[0].formatted_address,
                rating: body.results[0].rating
              },
              {
                title: body.results[1].name,
                address: body.results[1].formatted_address,
                rating: body.results[1].rating
              },
              {
                title: body.results[2].name,
                address: body.results[2].formatted_address,
                rating: body.results[2].rating
              },
              {
                title: body.results[3].name,
                address: body.results[3].formatted_address,
                rating: body.results[3].rating
              }]

            )
        }
    })
}

module.exports = pointOfInterest