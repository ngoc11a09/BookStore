import dotenv from "dotenv"
import bunyan from "bunyan"

dotenv.config({});

class Config {
    public DATABASE_URL: string | undefined;
    public JWT_TOKEN: string | undefined;

    private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/chattyapp-backend';

    constructor() {
        this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
        this.JWT_TOKEN = process.env.JWT_TOKEN || "1234";
    }

    public createLogger(name: string): bunyan {
        return bunyan.createLogger({name,level: "debug"});
    }
}

export const config: Config = new Config();