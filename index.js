const dotenv = require ('dotenv')
dotenv.config();
const bodyParser = require ('body-parser');
const express = require ('express')
const cookieParser = require ('cookie-parser');
const morgan = require ("morgan");
const app = express();
const db = require ("./DB/connection");
app.use(express.json());

// const user =require ("./DB/model/user");
// const officer =require ("./DB/model/officer");
// const car =require ("./DB/model/car");
// const violation =require ("./DB/model/violation");

const authRouter=require('./routers/authRouter')
app.use('/api/auth',authRouter);
const violationRouter=require('./routers/violationRouter')
app.use('/api/violation',violationRouter);

app.use(cookieParser());
app.use(bodyParser.json());

app.use(morgan('dev')); 

const PORT = 3307;
 
db.sync({logging: false , force:false})
    .then((value) => {
        console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('An error occurred while synchronizing models:', error);
    });

app.listen(PORT, () => {
    console.log(`Application server is up and running on PORT ${PORT}`);
})
