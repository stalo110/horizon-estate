import { Router, Request, Response } from "express";
import components from "../components";
import {router as propertyRouter} from '../components/property/router'

const router = Router();
router.get('/', (_: Request, res: Response) => res.status(200).json({message:"success"}))
router.use("/auth", components.auth.routes)
router.use("/Property", propertyRouter)

export default router