var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

router.get('/movies', (req, res) => {

fetch('https://api.themoviedb.org/3/discover/movie?&language=fr-FR&sort_by=popularity.desc',
{
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.MTDB_API_KEY}`
}})
  .then(res => res.json())
  .then(datas => {
    console.log(datas)
    let formatted_datas=[]
    for(let data of datas.results)
    {
      formatted_datas.push({title: data.title, poster: 'https://image.tmdb.org/t/p/original'+data.poster_path, voteAverage:data.vote_average, voteCount:data.vote_count , overview:data.overview.length == 0 ? 'Pas de description' : data.overview.slice(0,250)+'...'})
    }
    
     res.json(formatted_datas)
    })
  .catch(err => console.error('error:' + err))
})

/**
 *  "adult": false,
      "backdrop_path": "/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
      "genre_ids": [
        16,
        10751,
        12,
        35,
        18
      ],
      "id": 1022789,
      "original_language": "en",
      "original_title": "Inside Out 2",
      "overview": "Fraichement diplômée, Riley est désormais une adolescente, ce qui n'est pas sans déclencher un chamboulement majeur au sein du quartier général qui doit faire face à quelque chose d'inattendu : l'arrivée de nouvelles émotions ! Joie, Tristesse, Colère, Peur et Dégoût - qui ont longtemps fonctionné avec succès - ne savent pas trop comment réagir lorsqu'Anxiété débarque. Et il semble qu'elle ne soit pas la seule…",
      "popularity": 10032.488,
      "poster_path": "/eHUWo4AiomQwG8EpWhvNNA1RMYz.jpg",
      "release_date": "2024-06-11",
      "title": "Vice-Versa 2",
      "video": false,
      "vote_average": 7.72,
      "vote_count": 1533
 */


module.exports = router;



