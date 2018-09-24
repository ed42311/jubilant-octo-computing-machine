const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/more_test', { useNewUrlParser: true })
let Bear  = require('./app/models/bear');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let port = process.env.PORT || 8000
let router = express.Router()

router.use((req, res, next) => {
  console.log("something is happening")
  next()
})

router.get('/', (req, res) => {
  res.json({message: 'hooray! welcome to our api!'})
})

router.route('/bears')
  .post((req, res) => {
      let bear = new Bear()
      console.log(req.body)
      bear.name = req.body.name
      console.log(bear)

      bear.save((err) => {
        if(err)
          res.send(err)
         res.json({message: "Bear Created!"})
      })
  })

app.use('/api', router)

app.listen(port)
console.log("magic happens on " + port)
