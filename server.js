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

// })http://localhost:3001/getweather?city_name=Amman
server.get('/weather', (req, res) => {
    console.log(req.query)
    let weatherCity= req.query.city_name
    let weatherItem = weatherData.find(item => {
        if (item.city_name.toLowerCase() == weatherCity.toLowerCase())
        
            return item
    })
    console.log(weatherItem.data);

    let saeed=[];

    weatherItem.data.forEach(element=>{
       saeed.push(new Weather(element));
    })
    res.send(saeed)
})

class Weather {
    constructor(item){
        this.date=item.valid_date,
        this.descreption=`low of ${item.min_temp}, hight of${item.max_temp} with ${item.weather.description}`
    }
}

server.get('*', (req, res) => {
    res.status(500).send('the weather for this city is not item');
})





server.listen(PORT, () =>{
    console.log(`listiningg on PORT ${PORT}`)
})