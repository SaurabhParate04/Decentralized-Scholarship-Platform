const express = require('express')
const cors = require('cors')
// const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const app = express()
const port = process.env.port || 5000

app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log('Server is running on port: ' + port)
})

app.use('/api/blockchain', require('./routes/blockchainscripts.js'))