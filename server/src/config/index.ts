//link to env
import dotenv from "dotenv";
dotenv.config();
import env from 'env-var'

export const PORT=env.get('PORT').default(4000).asPortNumber();
export const mongo_uri=process.env.MONGO_URI;