const axios = require('axios'); 


module.exports = Movie;


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
let memories=[];
async function movieFunc(req, res) {
    let key = process.env.MOVIE_API_KEY;
    let cityName = req.query.city_name;9
    if (momiers[cityName] !== undefined){
        console.log('this data from memories');
        res.send(momiers[cityName]);
    }else {

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


}