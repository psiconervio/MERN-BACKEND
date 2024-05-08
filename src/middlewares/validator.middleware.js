export const validateSchema = (schema)=> (req,res,next) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    return res
    .status(400)
    .json(error.errors.map((error => error.message)))
    
  }
};

//validacion de datos con zod
//1:52:44 / 4:47:24