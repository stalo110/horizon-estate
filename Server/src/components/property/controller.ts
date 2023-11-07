import { Request, Response } from "express";
import { Property } from "./model";
import { option } from "../../lib/helper/validator";
import { propertySchema, updatePropertySchema } from "./schema";
import { JwtPayload } from "jsonwebtoken";
import { AUTH } from "../Auth";
import { IRequest } from "../../interface/IRequest";
import cloudinary from "../../lib/helper/cloudinary";


export class controller {
  static async getProperties(req: Request, res: Response) {
    try {
      const getAllProperty = await Property.find({active:true});
      return res.status(200).json({
        message: "You have all your properties",
        getAllProperty,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createProperty(req: IRequest, res: Response) {
    try {
      const validateProperty = propertySchema.validate(req.body, option);
      if (validateProperty.error) {
        return res
          .status(400)
          .json({ error: validateProperty.error.details[0].message });
      }

      const admin = await AUTH.findById(req.user)
      if(!admin){
        return res.status(400).json({
          msg : 'You cannot create a property',
          
      })
      }

      const addProperties = await Property.create(req.body);
      return res.status(200).json({
        message: "You have created a property",
        addProperties,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getProperty(req: Request, res: Response) {
    try {
      const getProperty = await Property.findOne({active:true, _id:req.params.id});
      if (!getProperty) {
        throw new Error("property does not exist");
      }
      return res.status(200).json({
        message: "Property Retrieved",
        getProperty,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateProperty(req: IRequest, res: Response) {
    try {

      const validateProperty = updatePropertySchema.validate(req.body, option);
      if (validateProperty.error) {
        return res.status(400).json({
          Error: validateProperty.error.details[0].message,
        });
      }
      const admin = await AUTH.findById(req.user)
      if(!admin){
        return res.status(400).json({
          msg : 'You cannot update a property',
          
      })
      }

      const updateProperty = await Property.findById(req.params.id);

      const updatedProperty = await Property.findByIdAndUpdate({ative:true, _id:req.params.id},
        
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({
        message: "You have successfully updated a property",
        updatedProperty,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteProperty(req: IRequest, res: Response) {
    try{
  
      
      const admin = await AUTH.findById(req.user)
      if(!admin){
        return res.status(400).json({
          msg : 'You cannot delete a property',
          
      })
      }
      const deleteProperty = await Property.findOne({active:true, _id:req.params.id});
      if(!deleteProperty){
        return res.status(400).json({message: "Property deos not exist"})
      }
      deleteProperty.active =false
      await deleteProperty.save();

       return res.status(200).json({
        message: "You have successfully deleted a property",
    
      });

    }catch(error){
      res.status(500).json(error); 
    }

  }


  static async imageUplaod ( req:Request, res:Response){
    try{
      if(!req.file){
        return res.status(400).json({error: "No file uploaded"});
      }

      const uploadedImage = await cloudinary.uploader.upload(req.file.path)

      res.status(200).json({imageUrl: uploadedImage.secure_url})

    }catch (error){
      res.status(500).json({error:'image upload failed'})
    }
  }
}



