import { SECRET_JWT } from "../dotenv/dotenv";
import jwt from "jsonwebtoken";
export const GenerateJwt = async (payload: any) => {
  const token = await jwt.sign({ payload }, SECRET_JWT, { expiresIn: "1h" });
  return token;
};
