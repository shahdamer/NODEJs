const dotenv = require ('dotenv')
dotenv.config();
const bodyParser = require ('body-parser');
const express = require ('express')
const cookieParser = require ('cookie-parser');
const morgan = require ("morgan");
// import errorHandler from "./middlewares/errorHandler";
const app = express();
const db = require ("./DB/connection");
// import associations from './models/Associations';
// import router from "./routes";
// import cors from 'cors';
const user =require ("./DB/model/user");
const officer =require ("./DB/model/officer");
const car =require ("./DB/model/car");
const violation =require ("./DB/model/violation");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev')); // Create new morgan logger middleware function

const PORT = 3307;

// app.use('/api', router);
// app.use(errorHandler);

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
