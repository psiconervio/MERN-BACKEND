import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id
      }).populate('user')
      //variable guardado en tasks se devuelve
      res.json(tasks);
  } catch (error) {
    return res.status(404).json({message:"Error"})
  }
};
export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    console.log(req.user)
      const newTask = new Task({
        title,
        description,
        date,
        user:req.user.id
      });
      const savedTask = await newTask.save();
      res.json(savedTask);
  } catch (error) {
    return res.status(404).json({ error: "error "})
  }
};
/////////////////////////////////////////
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json;
    res.json(task);
  } catch (error) {
    return res.status(404).json({message:"task no found"})
  }
};
export const deleteTask = async (req, res) => {
 try {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json;
  return res.sendStatus(204);
 } catch (error) {
   return res.status(404).json({message:"task not found"})
 }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "task not found " });
    res.json(task);
  } catch (error) {
    return res.status(404).json({message:"task not found"})
  }
};

//1:38:29 / 4:47:24