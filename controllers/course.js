import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";

// Function to get all available courses
export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({ courses });
});

// Function to get a single course by ID
export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }
  res.json({ course });
});

// Function to fetch all lectures for a given course
export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });
  res.json({ lectures });
});

// Function to get all the courses enrolled by a user
export const getMyCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({ courses });
});

// Function to fetch a single lecture by ID
export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (!lecture) {
    return res.status(404).json({ success: false, message: "Lecture not found" });
  }

  // Return lecture if the user is an admin
  if (user.role === "admin") {
    return res.json({ lecture });
  }

  res.json({ lecture });
});
export const addProgress = TryCatch(async (req, res) => {
  const progress = await Progress.findOne({
    user: req.user._id,
    course: req.query.course,
  });

  const { lectureId } = req.query;

  if (progress.completedLectures.includes(lectureId)) {
    return res.json({
      message: "Progress recorded",
    });
  }

  progress.completedLectures.push(lectureId);

  await progress.save();

  res.status(201).json({
    message: "new Progress added",
  });
});