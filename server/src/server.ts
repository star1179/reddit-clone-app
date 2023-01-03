import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source"
import authRoutes from "./routes/auth"
import cors from 'cors';
import dotenv from 'dotenv';

const app = express(); // express 최상위 함수를 app 변수로 생성

const origin = "http://localhost:3000";
app.use(cors({
    origin,
    credentials: true
}))

// use메소드를 사용하여 사용하기위한 미들웨어 명시
app.use(express.json()); // json 데이터를 express에서 해석해서 사용하기 위함
app.use(morgan("dev"));  // morgan 모듈을 사용할때 -dev, -short, -common, -combined 모드가 있는데 개발할 때는 -dev 모드를 많이 사용한다. 

dotenv.config();

// app.get의 URL로 접속을 하면 해당 블록의 코드를 실행
app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes)

let port = 4999;

// app.listen의 포트로 접속하면 해당 블록의 코드를 실행
app.listen(port, async() =>{
    console.log(`Server running at https://localhost:${port}`);

    AppDataSource.initialize().then(async () => {

        console.log("databse initialized")

    }).catch(error => console.log(error))

});
