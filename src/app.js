const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode.js');
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const dirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(dirPath))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Jeevan Malhi'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About me',
        name: 'Jeevan Malhi'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        msg:'Help page',
        title:'Help',
        name:'Jeevan Malhi'
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(req.query.address ,(error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({Error: error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error)
            return res.send({Error: error})
            
            res.send({
                location,
                forecast: forecastData
            })
        })
        
    })
    
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title:'404',
        msg:'Help article not found',
        name:'Jeevan Malhi'
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        title:'404',
        msg:'Page not found',
        name:'Jeevan Malhi'
    })
})

app.listen(port, () => {

    console.log('Server is up on port'+ port)
})