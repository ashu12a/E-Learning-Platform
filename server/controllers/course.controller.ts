import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";

//upload course
export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = req.body;
        const thumbnail = data.thumbnail;

        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });

            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        createCourse(data, res, next);

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})


// edit course
export const editCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;

        if (thumbnail) {
            await cloudinary.v2.uploader.destroy(thumbnail.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        const courseId = req.params.id;

        const course = await CourseModel.findByIdAndUpdate(courseId, {
            $set: data,
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            course
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})


// Get single course
export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const courseId = req.params.id;

        const isCacheExist = await redis.get(courseId);

        if (isCacheExist) {
            const course = JSON.parse(isCacheExist);
            res.status(200).json({
                success: true,
                course
            });
        } else {
            const course = await CourseModel.findById(req.params.id).select("-courseData.videoUrl -courseData.suggetion -courseData.questions -courseData.links");

            await redis.set(courseId, JSON.stringify(course), 'EX', 604800); // 7 days in second

            res.status(200).json({
                success: true,
                course
            })

        }


    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

//get all courses
export const getAllCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const isCacheExist = await redis.get("allcourses");

        if (isCacheExist) {
            const courses = JSON.parse(isCacheExist);
            res.status(200).json({
                success: true,
                courses
            });
        } else {
            const courses = await CourseModel.find().select("-courseData.videoUrl -courseData.suggetion -courseData.questions -courseData.links");

            await redis.set("allcourses", JSON.stringify(courses));

            res.status(200).json({
                success: true,
                courses
            })

        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})


// get course content == only for valid user
export const getCourseByUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.course;
        const courseId = req.params.id;

        const courseExist = userCourseList?.find((course: any) => course._id.toString() === courseId);

        if (!courseExist) {
            return next(new ErrorHandler("Your are not eligible to access this course", 400));
        }

        const course = await CourseModel.findById(courseId);

        const content = course?.courseData;

        res.status(200).json({
            success: true,
            content
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})


// Add question in course
interface IAddQuestionData {
    question: string;
    courseId: string;
    contentId: string;
}

export const addQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { question, courseId, contentId }: IAddQuestionData = req.body;

        const course = await CourseModel.findById(courseId);

        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("Invalid Content Id", 400));
        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));

        if (!courseContent) {
            return next(new ErrorHandler("Invalid Content Id", 400));
        }

        // create a mew question object
        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: []
        };

        // add this question to our course content
        courseContent.questions.push(newQuestion);

        // send notification
        await NotificationModel.create({
            user: req.user?._id,
            title: "New Question Received",
            message: `You have a new question in ${courseContent?.title}`
        });

        // save the updated course
        await course?.save();

        res.status(200).json({
            success: true,
            course
        });



    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// Add answer in course question
interface IAddAnswerData {
    answer: string;
    courseId: string;
    contentId: string;
    questionId: string;
}

export const addAnswer = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { answer, courseId, contentId, questionId }: IAddAnswerData = req.body;

        const course = await CourseModel.findById(courseId);

        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("Invalid Content Id", 400));
        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));

        if (!courseContent) {
            return next(new ErrorHandler("Invalid Content Id", 400));
        }

        const question = courseContent?.questions?.find((item: any) => item._id.equals(questionId));

        if (!question) {
            return next(new ErrorHandler("Invalid Question Id", 400));
        }

        // create a mew answer object
        const newAnswer: any = {
            user: req.user,
            answer
        }

        // add this answer to our question
        question.questionReplies.push(newAnswer);

        // save the updated course
        await course?.save();

        if (req.user?._id === question.user._id) {
            // send notification
            await NotificationModel.create({
                user: req.user?._id,
                title: "New Question Reply Received",
                message: `You have a new question reply in ${courseContent?.title}`
            });
        } else {
            // send an Email
            const data = {
                name: question.user.name,
                title: courseContent.title
            }

            const html = await ejs.renderFile(path.join(__dirname, "../mails/question-reply.ejs"), data);

            try {
                await sendEmail({
                    email: question.user.email,
                    subject: "Question Reply",
                    template: "question-reply.ejs",
                    data
                });

            } catch (error: any) {
                return next(new ErrorHandler(error.message, 400));
            }
        }

        res.send(200).json({
            success: true,
            course
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// add review in course 
interface IAddReviewData {
    review: string;
    courseId: string;
    rating: string;
    userId: string;
}

export const addReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.course;

        const courseId = req.params.id;

        //check if courseId already exists in userCourseList based on _id
        const courseExists = userCourseList?.some((course: any) => course._id.toString() === courseId.toString());

        if (!courseExists) {
            return next(new ErrorHandler("Your are not eligible to access this course", 400));
        }

        const course = await CourseModel.findById(courseId);

        const { review, rating } = req.body as IAddReviewData;

        const newReviewData: any = {
            user: req.user,
            comment: review,
            rating
        }

        // add this review to our course
        course?.reviews.push(newReviewData);

        let avg = 0;

        course?.reviews.forEach((review: any) => {
            avg += review.rating;
        });


        if (course) {
            course.ratings = avg /= course?.reviews.length; // on example we have 2 reviews one is 5 another one is 4 so math working like this =>  9/2 = 4.5   
        }

        await course?.save();

        const notification = {
            title: "New Review Received",
            message: `${req.user?.name} has given a review in ${course?.name}`
        }

        // create notification
         await NotificationModel.create({
            user: req.user?._id,
            title: "New Review Received",
            message: `You have a new Review in ${course?.name}`
        });

        res.status(200).json({
            success: true,
            course
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// Add reply in review only admin can
interface IAddReviewReplyData {
    comment: string;
    courseId: string;
    reviewId: string;
}

export const addReplyToReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { comment, courseId, reviewId } = req.body as IAddReviewReplyData;

        const course = await CourseModel.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course not found", 400));
        }

        const review = course?.reviews?.find((rev: any) => rev._id.toString() === reviewId);

        if (!review) {
            return next(new ErrorHandler("Review not found", 400));
        }

        const newReviewReplyData: any = {
            user: req.user,
            comment
        }

        if (!review.commentReplies) {
            review.commentReplies = [];
        }

        review.commentReplies?.push(newReviewReplyData);

        await course?.save();

        res.status(200).json({
            success: true,
            course
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// Get all courses
export const getAllCourses =  CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try{
        getAllCoursesService(res);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// Delete Course --only for admin
export const deleteCourse =  CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try{
       const {id} = req.params;
       
       const course = await CourseModel.findById(id);

       if(!course){
        return next(new ErrorHandler("Course not found", 400));
       }

       await course.deleteOne({id});

       await redis.del(id);

       res.status(200).json({
           success: true,
           message: "Course deleted successfully"
       })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})