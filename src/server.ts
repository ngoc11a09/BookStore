import { Application, json, urlencoded, Response, Request, NextFunction } from "express";
import cors from "cors"
import compression from "compression";
import applicationRoutes from "@root/routes";
import HTTP_STATUS from "http-status-codes"
import { IErrorResponse, CustomError } from "@global/utils/error-handler"
import { config } from "@root/config"

const SERVER_PORT = 3000;
export default class Server {
  private app: Application;
  constructor(app: Application) {
    this.app = app
  }

  public start(): void {
    this.sercurityMiddleware(this.app)
    this.standardMiddleware(this.app)
    this.routesMiddleware(this.app)
    this.globalErrorHandler(this.app)
    this.startServer(this.app)
  }

  private sercurityMiddleware(app: Application): void {
    app.use(cors());

  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json());  //posting JSON data
    app.use(urlencoded({ extended: true })); //encoding the parameters in the URL
  }

  private routesMiddleware(app: Application): void {
    applicationRoutes(app)
  }

  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found.` })
    })
    app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      console.log("Global Error", error);
      if (error instanceof CustomError)
        return res.status(error.statusCode).json(error.serializeErrors())
      return res.status(500).json(error)
    })
  }

  private async startServer(app: Application): Promise<void> {
    if (!config.JWT_ACCESS_TOKEN)
      throw new Error('JWT_TOKEN must be provided.')
    try {
      app.listen(SERVER_PORT, () => {
        console.log(`Server running on port ${SERVER_PORT}`)
      })
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }
}
