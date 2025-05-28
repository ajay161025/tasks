import express from "express";
const router = express.Router();

import { authentication } from "../controllers/userinfo.js";
import {
  newTasks,
  updateTasks,
  deleteTasks,
  deleteOneTasks,
  updateNewTasks,
  getAllTasks,
  
} from "../controllers/taskInfo.js";

// create tasks
router.post("/", authentication, newTasks);

// update tasks
router.put("/update", authentication, updateTasks);

//  update new tasks
router.put(":id/update/new", authentication, updateNewTasks);

//  delete tasks
router.delete("/:id/delete", authentication, deleteTasks);

//  delete one task
router.delete("/:id/delete/one", authentication, deleteOneTasks);

//  get all tasks
router.get("/alltasks",authentication, getAllTasks);



// 
// router.patch("/updatee", update);

export default router;
