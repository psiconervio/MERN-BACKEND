import app from './app.js';
import express from 'express';
import morgan from 'morgan';    
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';


connectDB();
//prueba
//const port = process.env.PORT || 3000;
//app.listen(port);
//console.log(port)

//app.get("/",(req,res)=>{
//    const htmlresponse= `<html>
//    <head>
//        <title>
//            Hello World
//        </title>
//    </html>`;
//    res.send(htmlresponse);
//});
//
//app.listen(port, () => {
//  console.log(`Server is running on port uno y ${port}`);
//});
//oficial
app.listen();
console.log('listening on port 3000',3000);
