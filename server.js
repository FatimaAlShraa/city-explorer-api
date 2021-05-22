'use strict'

require('dotenv').config();
const express = require ('express');
const server =express();
//const weatherData =require('./weather.json')
const cors = require('cors');
const PORT = process.env.PORT
const axios = require('axios')
server.use(cors())

// server.get('/' , (req , res)=>{
//     let test='hello from me'
//     res.send(test)

server.get('/movie', movieFunc);
server.get('/weather', weatherhandler);

class Forecast{
    constructor(item){
        this.date =item.valid_date;
        this.description= item.weather.description
    }
}

async function weatherhandler(req, res) {
    let key = process.env.WEATHER_API_KEY;
    let cityName = req.query.city_name;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${key}&days=4`

    try {
        let result = await axios.get(url)

        let weatherArray = result.data.data.map(item => {
            return new Forecast(item);
            // return newforecast;
        })

        res.send(weatherArray);
        console.log(weatherArray);
    }
    catch (errors) {

        res.send('error: the information not found ' + errors);
    }

}
class Movie {
    constructor(item) {
        this.title = item.original_title,
            this.overview = item.overview,
            this.averageVotes = item.vote_average,
            this.totalVotes = item.vote_count,
            this.posterPath = `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            this.popularity = item.popularity,
            this.releaseDate = item.release_date
    }
}
async function movieFunc(req, res) {
    let key = process.env.MOVIE_API_KEY;
    let cityName = req.query.city_name;9

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}&page=1`

    try {
        let result = await axios.get(url)
        let movieArr = result.data.results.map(item => {
            return new Movie(item);

        })
        res.send(movieArr);
    }
    catch (errors) {

        res.send('error: the information not found' + errors);
    
    }

}
// })http://localhost:3001/getWeather?city_name=Amman

// server.get('/getWeather', (req, res) => {
//     console.log(req.query)
//     let weatherCity= req.query.city_name
//     let searchQuery = weatherData.find(item => {
//         if (item.city_name.toLowerCase == weatherCity.toLowerCase)
//             return item
//     })
//     res.send(searchQuery)

// try{
//     let forecastArrr=searchQuery.data.map((item)=>{
//         return new Forecast(item)
//     })
//      res.send(forecastArrr)
// }
//  catch (errors) {

//         res.status(404).send('error: the informition that you searched for it are not found');
//  }

// })

// server.get('*', (req, res) => {
//     res.status(500).send('the weather for this city is not found');
// })


server.listen(PORT, () =>{
    console.log(`listiningg on PORT ${PORT}`)
})