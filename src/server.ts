import { Application, json, urlencoded, Response, Request, NextFunction } from "express";
import cors from "cors"
import compression from "compression";
import applicationRoutes from "@root/routes";
import HTTP_STATUS from "http-status-codes"
import { IErrorResponse, CustomError } from "@global/utils/error-handler"
import Logger from "bunyan"
import { config } from "@root/config"

const log: Logger = config.createLogger("setUpDatabase")
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
    // this.globalErrorHandler(this.app)
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
      log.error("Global Error", error);
      if (error instanceof CustomError)
        return res.status(error.statusCode).json(error.serializeErrors())
      next()
    })
  }

  private async startServer(app: Application): Promise<void> {
    if (!config.JWT_ACCESS_TOKEN)
      throw new Error('JWT_TOKEN must be provided.')
    try {
      // log.info(`Worker with process id of ${process.pid} has started...`)
      // log.info(`Server has started with process ${process.pid}`)
      app.listen(SERVER_PORT, () => {
        log.info(`Server running on port ${SERVER_PORT}`)
      })
    } catch (err) {
      log.error(err);
      process.exit(1);
    }
  }
}
