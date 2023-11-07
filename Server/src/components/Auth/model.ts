import { Error, model, Schema } from "mongoose";
import { ICreateAuth } from "./interface";
import { Util } from "../../utils";
interface CustomError extends Error {
  message: string;
  code: number;
}

const AuthModel = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },

    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,

      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: Number,
      default: null,
    },
    emailVerificationExpiration: {
      type: Number,
      default: null,
    },
    emailVerificationStatus: {
      type: Boolean,
      default: false,
    },
    resetPasswordExpiration: {
      type: Number,
      default: null,
    },
    resetPasswordStatus: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

AuthModel.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hash = await Util.bcryptEncoded({ value: this.password });
    this.password = hash;
    return next();
  } catch (error) {
    const customErr = error as CustomError;
    return next(customErr);
  }
});

export const AUTH = model<ICreateAuth>("auth", AuthModel);
