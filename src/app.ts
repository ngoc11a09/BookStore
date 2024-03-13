import express, {Express} from "express";
import Logger from 'bunyan'
import {config} from '@root/config'
import DatabaseConnection from '@root/setupDatabase'
import Server from '@root/server'

const log : Logger = config.createLogger('app')

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