const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    
})
.then(()=> console.log('Database connection established'))
.catch(err => console.log(err))



// import routes
const authRouters = require('./routers/auth')

//middleware
app.use('/api', authRouters)



const errorHandler = (err, req, res, next) => {
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({ error:err })
}

app.use(errorHandler)





const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})