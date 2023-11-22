import express from "express";
import { deleteCourse, addAnswer, addQuestion, addReplyToReview, addReview, editCourse, getAllCourse, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";

const courseRouter = express.Router();

courseRouter.post('/upload-course', isAutheticated, authorizeRoles("admin"), uploadCourse);

courseRouter.put('/edit-course/:id', isAutheticated, authorizeRoles("admin"), editCourse);

courseRouter.get('/get-course/:id', getSingleCourse);

courseRouter.get('/get-courses', getAllCourse);

courseRouter.get('/get-course-content/:id',isAutheticated, getCourseByUser);

courseRouter.post('/add-question',isAutheticated, addQuestion);

courseRouter.put('/add-answer', isAutheticated, addAnswer);

courseRouter.post('/add-review/:id', isAutheticated, addReview);

courseRouter.put('/add-reply', isAutheticated, authorizeRoles("admin"), addReplyToReview);

courseRouter.get("/get-all-courses",isAutheticated,authorizeRoles('admin'),getAllCourses);

courseRouter.delete("/delete-course/:id",isAutheticated,authorizeRoles('admin'),deleteCourse);

export default courseRouter;