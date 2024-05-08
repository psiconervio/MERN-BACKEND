import express from 'express';
import morgan from 'morgan';    
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
           console.log("connect to mongodb");

    } catch(error){
        console.log(error);
    }
};
//conexion antigua
//async function main(){
//    //proceso de conexion a la base de datos para 
//    await mongoose.connect(process.env.DB_CONNECTION_STRING);
//    console.log("connect to mongodb");
//}
//
//main().catch(console.error);
