const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'))
// Define paths for Express Config
const publicDirectory =  path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// %nodemon src/app.js -e js,hbs
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)
// Setup directory static asset 
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sung Park'
    })
})
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//     }, 
//     {
//         name: 'Sung',
//     }])
// })


//http://localhost:3000/products?search=games&rating=5
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    res.send({
       products: [], 
    })
    console.log(req.query);
})


app.get('/about', (req, res) => {
     res.render('about', {
         title: 'About Me',
         name: 'Sung Park'
     })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'How To Use This Site',
        name: 'Sung Park',
        helpText: 'This is some helpful text'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide and address'
        })
    }
    geocode(req.query.address, (error, locationData) => {
        if (error) {
            return res.send({ error })
        }
        forecast(locationData.latitude, locationData.longitude, (error, forcastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forcastData.dailySummary,
                location: locationData.location, 
                address: req.query.address,
            })
        })
    }) 
    console.log(req.query);
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Navigation Error',
        name: 'Sung Park',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Navigation Error',
        name: 'Sung Park',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});

