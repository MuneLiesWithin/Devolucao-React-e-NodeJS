var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/backend', function (req, res) {
   res.writeHead(200, {'Content-Type': 'application/json'});
   const resp =  '"Aluno: Rômulo de Medeiros"';
   res.end(resp);
});

app.post('/backend', function (req, res) {
   console.log(req.body);
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end('Cheque seu terminal!');
});

var server = app.listen(3000, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Escutando na porta " + port);
});