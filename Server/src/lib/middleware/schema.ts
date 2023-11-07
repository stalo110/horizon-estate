import { check } from "express-validator";

export const password = check("password")
  .not()
  .isEmpty()
  .withMessage("Password is required")
  .trim()
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters")
  .matches(/\d/)
  .withMessage("Password must contain at least one digit")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter");

export const email = check("email")
  .not()
  .trim()
  .isEmpty()
  .toLowerCase()
  .withMessage("email is required")
  .isEmail()
  .withMessage("invalid email address");

export const fullName = check("fullName")
  .not()
  .isEmpty()
  .withMessage("full name is required");
export const userName = check("userName")
  .not()
  .isEmpty()
  .withMessage("user name is required");

export const lastName = check("lastName")
  .not()
  .isEmpty()
  .withMessage(" last name is required");
export const phone = check("phone")
  .not()
  .isEmpty()
  .withMessage("phone is requird")
  .isLength({ min: 11, max: 11 })
  .withMessage("phone number must be 11 digit");
export const price = check("price")
  .not()
  .isEmpty()
  .withMessage("price is required");

export const image = check("image")
  .not()
  .isEmpty()
  .withMessage("image is required");

export const userId = check("userId")
  .not()
  .isEmpty()
  .withMessage("userId is required");
export const propertyId = check("propertyId")
  .not()
  .isEmpty()
  .withMessage("PropertyId is required");
export const complianId = check("complianId")
  .not()
  .isEmpty()
  .withMessage("complianId is required");

export const location = check("location")
  .not()
  .isEmpty()
  .withMessage("location is required");
export const description = check("description")
  .not()
  .isEmpty()
  .withMessage("description is required");
export const flatId = check("flatId")
  .not()
  .isEmpty()
  .withMessage("flatId is required");
export const complian = check("complian")
  .not()
  .isEmpty()
  .withMessage("complian is required");
export const tenantId = check("tenantId")
  .not()
  .isEmpty()
  .withMessage("tenantId is required");
export const flatNumber = check("flatNumber")
  .not()
  .isEmpty()
  .withMessage("flat number is required");
export const comment = check("comment")
  .not()
  .isEmpty()
  .withMessage("comment is required");
export const service = check("service")
  .not()
  .isEmpty()
  .withMessage("service is required");

//node build/bin/index.js
