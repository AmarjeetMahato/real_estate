import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import bodyParser from "body-parser"
import authRoute from "./routes/authRoutes";
import postRoute from "./routes/postRoute";
import userRoute from "./routes/userRoutes";
import chatRoute from "./routes/chatRoutes";
import messageRoute from "./routes/messageRoutes";
import testRoute from "./routes/testRoute"
import cookieParser  from "cookie-parser"
import cors from "cors"


dotenv.config();


const PORT  = process.env.PORT || 5000


const app = express()


// MiddleWare
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({origin:process.env.CLIENT_URL!, credentials:true}))


// Api Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use(`/api/test`,testRoute)




app.listen(PORT, ()=> console.log(`Server runnig on PORT ${PORT}`))
