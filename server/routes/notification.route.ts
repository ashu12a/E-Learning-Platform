import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getNotification, updateNotificationStatus } from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get('/get-all-notification', isAutheticated, authorizeRoles("admin"), getNotification);

notificationRouter.put('/update-notification/:id', isAutheticated, authorizeRoles("admin"), updateNotificationStatus);


export default notificationRouter;