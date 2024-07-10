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
     res.json({movies : datas.results})
    })
  .catch(err => console.error('error:' + err))
})


module.exports = router;
