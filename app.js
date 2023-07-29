const path = require('path')
const express = require('express')
const hbs = require('hbs');
const request = require('postman-request');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();
console.log(__dirname);
console.log(__filename);
const publicDirectoryPath = path.join(__dirname, '/public');
const viewPath = path.join(__dirname,'/templates/views');
const partialPath = path.join(__dirname,'/templates/partials')
console.log(publicDirectoryPath)
app.set("view engine","hbs");
app.set('views',viewPath);
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialPath)
app.get('/weather', (req, res) => {
   
    if(!req.query.address){
        return res.send({
            error:"Please Provide Address"
        })
    } else{
    
        geocode(req.query.address, (error, {latitude,longitude}={}) => {
            if (error) {
                return  res.send({
                    error:error
                })
            }
          console.log(latitude,longitude);
            forcast(latitude, longitude, (error, response) => {
                if (error) {
                    return  res.send({
                        error:error
                    })
                }
                // console.log(data.location)
                return  res.send({
                    response:response,
                    address:req.query.address
                })
               // console.log(response, "Response");
            })
        })
    }
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     add:req.query.address
    // })
});
app.get('', (req, res) => {
    res.render('index',{
        title:"Weather Test",
        author:"jaswanth"
    })
})
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/about.html'))
})
app.get('/help', (req, res) => {
    res.render('help',{
        title:"Weather Test",
        author:"jaswanth"
    })
    //res.sendFile(path.join(__dirname, '/public/help.html'))
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title:"Weather Test",
        author:"jaswanth",
        errorMsg:"No Directory found"
    })
    //res.sendFile(path.join(__dirname, '/public/help.html'))
})

app.get('*', (req, res) => {
    res.render('error',{
        title:"Weather Test",
        author:"jaswanth",
        errorMsg:"Page Not Found"
    })
    //res.sendFile(path.join(__dirname, '/public/help.html'))
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})