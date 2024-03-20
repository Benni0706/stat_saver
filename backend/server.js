const express = require('express')
const sqlite = require('sqlite')
const cors = require('cors')

const app = express()

const port = 3000
const hostname = "localhost"

const cors_options = {
    origin: ['http://localhost:5173'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    methods: '*',
}
app.use(cors(cors_options));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/ you look good today`)
})