import dotenv from "dotenv"
import bunyan from "bunyan"

dotenv.config()

class Config {
    public DATABASE_URL: string | undefined;
    public JWT_TOKEN: string | undefined;

    private readonly DEFAULT_DATABASE_URL = "";

    constructor() {
        this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
        this.JWT_TOKEN = process.env.JWT_TOKEN || "1234";
    }

    public createLogger(name: string): bunyan {
        return bunyan.createLogger({name, level: "debug"});
    }

    public validateConfig(): void {
        for(const [key,value] of Object.entries(this)) {
            if (value === undefined) 
                throw new Error(`Configuration ${key} is undefined.`)
        }
    }
}

export const config: Config = new Config();