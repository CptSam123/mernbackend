import express from "express";
import {
  getAllCourses,
  getSingleCourse,
  fetchLectures,
  getMyCourses,
  fetchLecture,
} from "../controllers/course.js"; // Removed `fetchLecture` import
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures); // Fetch all lectures for a course
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);

export default router;
