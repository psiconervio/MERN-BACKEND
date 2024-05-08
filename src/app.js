import express from 'express';
import morgan from 'morgan';    
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes  from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.routes.js";
//const whitelist = ["https://mern-crud-auth-fatz.vercel.app","http://localhost:5173"];
dotenv.config();
//const corsOptions = {
//    origin: function(origin,callback){
//        if(whitelist.indexOf(origin) !== -1){
//            callback(null,true);
//    }else{
//        callback(new Error("no allowed by CORS"));
//    }
//    },
//    credentials:true
//}
//app.use(cors(corsOptions));
const app = express();
app.use(cors('*'
     //{
     //    origin:"https://mern-crud-auth-fatz.vercel.app/",
     //    credentials:true
     //}
   //  {origin: "http://localhost:5173",
   //  credentials: true }
));
//peticiones al backend
app.use(morgan('dev'));
//convierte las peticiones en json
app.use(express.json())
app.use(cookieParser());
//ruta api
app.use('/api',authRoutes);
app.use('/api',taskRoutes);


export default app;

module.exports = app;