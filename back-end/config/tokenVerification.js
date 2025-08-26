import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const tokenVerification = (req, res, next) => {
 try{
  if(req.headers?.authorization) {
  const token = req.headers.authorization?.split(" ")[1];
   var decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded){
         next();
    }else{
        return res.status(401).json({ message: "Unauthorized access, invalid token" });
    }
  }else{
    return res.status(401).json({ message: "Unauthorized access, token is missing" });
  }
} catch (error) {
  console.error("Token verification error:", error.message);
  return res.status(401).json({ message: "Unauthorized access, token verification failed" });
 }
};
export default tokenVerification;