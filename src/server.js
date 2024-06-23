import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import testConnectDB from './config/ConnectDB'

import cors from 'cors'
require('dotenv').config();

let app = express();
app.use(cors({ origin: true }))
//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);
testConnectDB();
let port = process.env.PORT || 8080;
//Port === undefined => port = 8080
app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})
