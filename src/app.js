const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kushagra Srivastava'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Kushagra Srivastava',
        helpText: 'Get some help'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kushagra Srivastava',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    var forecast1,location1 
    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {

        if(error){
            return res.send({
                error: 'Error in geocoding'
            })
        }
        
        forecast(latitude,longitude, (error, data1) => {
            if(error){
                return res.send({
                    error: 'Error in forecasting'
                })
            }
            res.send({
                address: req.query.address,
                forecast: data1,
                location,
            })
        })
    })


    
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Kushagra Srivastava',
        error: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Kushagra Srivastava',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})