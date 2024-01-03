
require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500
const { logger, logEvents } = require('./middleware/logger')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorHandler')
const corsOptions = require('./config/corsOption')
const cors = require('cors')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose') 


connectDB()

app.use(logger)
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use('/', express.static(path.join(__dirname, 'public')))


app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/products', require('./routes/productRoutes'))

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not found')
  }
})

app.use(errorHandler)


mongoose.connection.once('open', () => {
  console.log('connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))
})

mongoose.connection.on('error', (err) => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})