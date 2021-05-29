const axios = require('axios');

module.exports = weatherhandler;

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