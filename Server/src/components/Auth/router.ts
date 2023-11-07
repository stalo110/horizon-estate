import { Controller } from "./Controller";
import { Router } from "express";
import { AuthMiddleware } from "../../lib/middleware/AuthMiddleware";
import upload from "../../lib/helper/multer";

const router = Router();
router.post("/register/user", Controller.signupUser);
router.post("/login/user", Controller.signinUser);
router.post("/login/admin", Controller.signinAdmin);
router.post("/register/admin", Controller.signupAdmin);
router.post("/send_verification", Controller.sendVerificationCode);
router.post("/verify_code", Controller.verify_code);
router.post("/reset_password/code", Controller.generatePasswordReset);
router.post("/reset_password", Controller.resetPassword);
router.get("/", AuthMiddleware.Authenticate(["admin"]));
router.put("/update_user", AuthMiddleware.Authenticate(["user", "admin"]), Controller.updateUser);
router.delete("/delete_user", AuthMiddleware.Authenticate(["admin"]), Controller.deleteUser);
router.post('/image', upload.single('image'), AuthMiddleware.Authenticate(["user", "admin"]), Controller.imageUpload)
export const AuthRouter = router;
