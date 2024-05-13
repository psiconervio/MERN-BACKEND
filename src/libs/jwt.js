import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

// Asegúrate de usar el middleware de cookie-parser en tu aplicación
app.use(cookieParser());

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d", 
      },
      //callback
      (err, token) => {
        if(err) reject(err);

        // Establecer la cookie
        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        });

        resolve(token);
      }
    );
  });
};

//codigo generico
//import jwt from "jsonwebtoken";
//import { TOKEN_SECRET } from "../config.js";
//
//export function createAccessToken(payload) {
// return  new Promise((resolve, reject) => {
//        jwt.sign(
//            payload,
//            TOKEN_SECRET,
//        {
//            expiresIn: "1d", 
//        },
//        //callback
//        (err, token) => {
//            if(err) reject(err);
//            resolve(token);
//
//        });
//    }
//    )};
//minuto 54 video fatz