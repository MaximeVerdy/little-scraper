
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express()

/** obliger express à utiliser un port donné */
// on set le port sur l'environment variable PORT ou si elle est undefined alors app doit prendre 3000 comme port
app.set('port', process.env.PORT || 3000); 
console.log("Express server écoutant le port " + app.get('port'))

/** classique ~~~ ce qu'on voit le souvent dans les exos */
// app.listen() relie et écoute les connexions sur un port donné
// équivaut au Node http.Server.listen() 
// si pas de port ou port 0 alors port aléatoire non utilisé assigné
const PORT = 3000
app.listen(PORT, function(err){
     if (err) console.log("Error in server setup")
     console.log("Server listening on Port", PORT);
 })

const url = 'https://www.theguardian.com/uk'
axios(url)
     .then(res => {
          const DOM = res.data
          const DataLoaded = cheerio.load(DOM)
          const articles = []
          DataLoaded('.fc-item__title', DOM).each(function () {
               const title = DataLoaded(this).text()
               const url = DataLoaded(this).find('a').attr('href')
               articles.push({
                    title, url
               })
          })
          // console.log(articles);
     }).catch(err => console.log(err))
