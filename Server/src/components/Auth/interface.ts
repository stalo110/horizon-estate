export interface ICreateAuth {
  fullName: string;
  email: string;
  password: string;
  role: string;
  verificationCode?: number| null;
  emailVerificationExpiration?: number | null;
  emailVerificationStatus: boolean;
  isVerified: boolean;
  active: boolean;
  resetPasswordCode?: number | null;
  resetPasswordExpiration?: number | null;
  resetPasswordStatus: boolean;
  image?: string;
}
