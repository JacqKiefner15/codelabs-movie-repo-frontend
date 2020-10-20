const express = require('express',)
var forceSsl = require('force-ssl-heroku');
const path = require('path')
const enableProdMode = require('@angular/core').enableProdMode

enableProdMode();

const app = express();

app.use(forceSsl);

app.use(express.static('/dist/codelabs-movie-frontend'));

app.get('/*', (req,res)=>{
  res.sendFile(path.join(_dirname, '/dist/codelabs-movie-frontend'))
});

app.listen(process.env.PORT || 8080, ()=>{
  console.log('Server started')
})


