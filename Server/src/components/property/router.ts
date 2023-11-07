import express from 'express';
import {Property} from './model';
import { controller } from './controller';
import { AuthMiddleware } from '../../lib/middleware/AuthMiddleware';
import upload from '../../lib/helper/multer';


const router = express.Router();

router.get('/GetProperty',controller.getProperties );
router.post('/AddProperty',AuthMiddleware.Authenticate(["admin"]), controller.createProperty );
router.get('/GetProperty/:id', controller.getProperty);
router.patch('/UpdateProperty/:id', AuthMiddleware.Authenticate(["admin"]), controller.updateProperty);
router.delete('/DeleteProperty/:id', AuthMiddleware.Authenticate(["admin"]), controller.deleteProperty);
router.post('/image', upload.single('image'), AuthMiddleware.Authenticate(["admin"]), controller.imageUplaod)




export {router};