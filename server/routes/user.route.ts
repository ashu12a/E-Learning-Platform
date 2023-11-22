import express from "express";
import { DeleteUser, activateUser, getAllUsers, getUserInfo, loginUser, logoutUser, registerationUser, socialAuth, updateAccessToken, updatePassword, updateProfilePicture, updateUserRole } from "../controllers/user.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post('/registration',registerationUser);

userRouter.post('/activate-user',activateUser);

userRouter.post('/login',loginUser);

userRouter.post('/logout',isAutheticated,logoutUser);

userRouter.get('/refresh',updateAccessToken);

userRouter.get('/me',isAutheticated,getUserInfo);

userRouter.post('/social-auth',socialAuth);

userRouter.put('/update-user-info',isAutheticated,socialAuth);

userRouter.put('/update-user-password',isAutheticated,updatePassword);

userRouter.put('/update-user-avatar',isAutheticated,updateProfilePicture);

userRouter.get('/get-all-users',isAutheticated,authorizeRoles('admin'),getAllUsers);

userRouter.put('/update-user-role',isAutheticated,authorizeRoles('admin'),updateUserRole);

userRouter.delete('/delete-user/:id',isAutheticated,authorizeRoles('admin'),DeleteUser);


export default userRouter;