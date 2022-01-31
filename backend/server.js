let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
let bodyParser = require('body-parser')
let dbConfig = require('./database/db')


const taskRoute = require('../backend/routes/task.route')

mongoose.Promise = global.Promise
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log('Database sucessfully connected!')
    },
    (error) => {
      console.log('Could not connect to database : ' + error)
    },
  )

const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(cors())
app.use('/tasks', taskRoute)

// PORT
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})


app.use((req, res, next) => {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})


// const express = require('express');
// const cors = require('cors')
// const app = express();

// app.use(cors());

// app.use('/login', (req, res) => {
//   res.send({
//     token: 'test123'
//   });
// });

// app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));