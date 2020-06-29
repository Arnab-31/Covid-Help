const express               = require("express");             //To use express.js
      request               = require('request');
      bodyParser            = require("body-parser");
      mongoose              = require("mongoose"); 
      User                  = require("./models/user");
      path                  = require("path");

var app = express();

const port = process.env.PORT || 5000


//support parsing of application form post data
app.use(bodyParser.urlencoded({
    extended: true
}));


//To use external css files from the public directory
app.use('/public', express.static('public')); 



app.set("view engine","ejs");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);


//Connecting to Database
var url = process.env.DATABASEURL || "mongodb://localhost/Covid-Help"
mongoose.connect(url);


app.get("/",function(req,res)
{
    res.render("landing");
})

app.get("/news/:key",function(req,res)
{
    var key = req.params.key;
    var art;
    var url = 'http://newsapi.org/v2/everything?' +
          'q=' + key + '&' +
          'from=2020-06-16&' +
          'sortBy=popularity&' +
          'apiKey=d43a57d42659440190c62c563fb36344';

    request(url, { json: true }, (err, res, body) => {
    if (err) 
    {
        return console.log(err); 
    }
    art=body.articles;
    });
    setTimeout( function()
    {
        res.render("news",{articles:art});
    },4000);
 
})

app.post("/contact", function(req,res)
{
    var newUser = {name: req.body.name, phone: req.body.phone, email: req.body.email, message: req.body.message};
    User.create(newUser, function(err,newlyCreated)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/")
        }
        else
        {
            res.redirect("/")
        }
    })
})

app.get("/download",function(req,res)
{
    var file = req.params.file;
    var filePath = path.join('./files', 'help.pdf');
    res.download(filePath, file);
})

//Listening to server
app.listen(port ,function()  //replace process.env.PORT, process.env.IP with 5000 if running in local
{
    console.log("Serving Covid-Help on port 5000");
})