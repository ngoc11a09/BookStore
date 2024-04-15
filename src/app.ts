import express, { Express } from "express";
import { config } from '@root/config'
import DatabaseConnection from '@root/setupDatabase'
import Server from '@root/server'


class Application {
    public init(): void {
        this.loadConfig();
        DatabaseConnection()
        const app = express()
        const server: Server = new Server(app)
        server.start()
    }
    private loadConfig(): void {
        config.validateConfig()
    }
}

const application: Application = new Application()
application.init()