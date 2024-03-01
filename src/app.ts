import express from "express";
import cors from "cors"
import compression from "compression"
import cookieParser from "cookie-parser"
const app = express();

app.use(cors());

app.use(compression({
    level: 6,
    threshold: 100000
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use((req, res, next) => {
//   //code khi notfound
//   return next(new ApiError(404, "Resource not found!"));
// });
// app.use((err, req, res, next) => {
//   return res.status(err.statusCode || 500).json({
//     message: err.message || "Internal Server Error",
//   });
// // });

export default app;
