//esto va a responder lo que esta dentro de llaves
//no olvidar el comando res.send para poder responder la peticion
//auth.controller tiene que recibir los datos en formato json
import User from "../models/user.model.js";
//MANEJANDO PETICIONES POST/JSON DESDE REGISTER
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../libs/jwt.js";
import userModel from "../models/user.model.js";
import { TOKEN_SECRET} from "../config.js";

export const register = async (req, res) => {
  ///console.log(req.body);
  const { email, password, username } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json(["the email esta en uso"] )
    //entra un hask, se encripta
    const passwordHash = await bcrypt.hash(password, 10); //esto me va a dar un hash del password
    //se crea un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    //se guarda el usuario
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  ///console.log(req.body);
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "credeinciales incorrectas" });
    //entra un hask, se encripta
    //se crea un nuevo usuario

    //se guarda el usuario
    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  //responde
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const {token} = req.cookies
  if(!token) return res.status(401).json({message:"no autorizado"})

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if(err) return res.status(401).json({message:"no autorizado"})

      const userFound = await User.findById(user.id)
      if(!userFound) return res.status(401).json({message:"no autorizado"})
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,

      })
  })}
// // se crea el token y cuando se crea responde el callback
// jwt.sign({
//     id:userSaved._id,
// },
// "secret123",
// {
//     expiresIn: "1d",
// },
// //callback
// (err, token) => {
//     if(err) console.log(err);
//     //se guarda dentro de una cookie
//     //enviando datos atraves de headers
//     res.cookie("token",token)
//     res.json({
//         message: "usuario creado satisfactoriamente"
//     })
// })

//res.json(userSaved)
//RETURN envio al frontend
/* res.json({
    id:userSaved._id,
    username:userSaved.username,
    email:userSaved.email,
    createdAt: userSaved.createdAt,
    updatedAt:userSaved.updatedAt,
}) */
//res.send("registrando")
// } catch (error) {
//     console.log(error);
// }
//console.log(newUser);
//responde con un texto que diga registrando

//export const login = (req, res) => res.send('login');