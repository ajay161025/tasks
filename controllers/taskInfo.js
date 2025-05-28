// import userModel from "../models/users.js";

import tasksModel from "../models/tasks.js";

// tasks
const newTasks = async (req, res) => {
  try {
    const savetasks = await tasksModel.create({
      userId: req.ajay.id,
      task: req.body.task,
    });
    console.log(req.ajay);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// const updateTasks = async (req, res) => {
//   try {
//     const addnewtasks = await tasksModel.findByIdAndUpdate(req.params.id, {
//       addnewtasks: req.body.addnewtasks,
//     });
//     if (!addnewtasks)
//       return res
//         .status(403)
//         .json({ message: "add new tasks only on your profile " });
//     res.status(201).json({ message: "update new tasks" });

//     if (addnewtasks.dailyTasks.includes(req.body.userId)) {
//       await addnewtasks.updateOne(dailyTasks.push());
//     }

//     console.log(addnewtasks);
//   } catch (err) {
//     console.log(err);

//     res.status(500).json(err);
//   }
// };

// update
const updateTasks = async (req, res) => {
  try {
    const addtask = await tasksModel.findByIdAndUpdate({_id:req.ajay.id}, {
      task: req.body.task,
    });

    res.status(200).json({ message: "update new tasks" });
    console.log(addtask);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
};


// 
// const update = async (req,res)=>{
//   try {
//     const update = await tasksModel.findByIdAndUpdate({userId:req.ajay.id})
//     res.status(200).json({"message":"update new tasks"})
//     console.log(update);
    
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }

// update new tasks
const updateNewTasks = async (req, res) => {
  try {
    const addnewtasks = await tasksModel.findById(req.params.id);
    if (!addtask) return res.status(403).json({ "message ": "user not found" });
    if (addtask.includes(req.body.userId)) {
      await addtask.updateOne({ $push: { task: req.body.addnewtasks } });
      res.status(200).json(addnewtasks);
    } else {
      res.status(403).json(" ");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete tasks
const deleteTasks = async (req, res) => {
  try {
    const deletetasks = await tasksModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ "message ": "deleted" });
    console.log();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// if (!deleteone)
//   return res
//     .status(403)
//     .json({ message: "only you can add new tasks in your profile" });

// delete one tasks
const deleteOneTasks = async (req, res) => {
  try {
    const deleteone = await tasksModel.findById(req.body.userId);

    if (!deleteone) {
      return res
        .status(403)
        .json({ message: "only you can add new tasks in your profile" });
    } else {
      await deleteone.updateOne({ $pull: { task: req.body.task } });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// all tasks
const getAllTasks = async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const skip = (page-1) * limit
  try {
    const getall = await tasksModel.find({userId:req.ajay.id}).skip(skip).limit(limit)
    res.status(200).json(getall);
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  newTasks,
  updateTasks,
  deleteTasks,
  updateNewTasks,
  deleteOneTasks,
  getAllTasks,
 
};
