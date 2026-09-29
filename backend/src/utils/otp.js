import crypto from 'crypto'
import bcrypt from 'bcrypt'
export const generateOtp = ()=>{
    return crypto.randomInt(100000,1000000).toString();
};
export const hasOtp = async (otp)=>{
    return bcrypt.hash(otp,10);
}
export const getOtpExpiry = ()=>{
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10);
    return expiry;
}