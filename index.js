require('dotenv').config();
const express = require('express')
const sequelize = require("./database")
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
// error handling, last middleware(замикаючий мідлвер)
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)


const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {console.log(`app is running on port ${PORT}`)})
    } catch (err) {
        console.log(err)
    }
}
start()

