import dotenv from "dotenv"
import bunyan from "bunyan"

dotenv.config()

class Config {
    public DATABASE_URL: string | undefined;
    public JWT_ACCESS_TOKEN: string | null;
    public JWT_REFRESH_TOKEN: string | null;
    public ACCESS_TOKEN_EXPIRESIN: string;
    public REFRESH_TOKEN_EXPIRESIN: string;


    private readonly DEFAULT_DATABASE_URL = "";

    constructor() {
        this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
        this.JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN || "1234";
        this.JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN || "4321";
        this.ACCESS_TOKEN_EXPIRESIN = process.env.ACCESS_TOKEN_EXPIRESIN || "5m";
        this.REFRESH_TOKEN_EXPIRESIN = process.env.REFRESH_TOKEN_EXPIRESIN || "1h";
    }

    public createLogger(name: string): bunyan {
        return bunyan.createLogger({ name, level: "debug" });
    }

    public validateConfig(): void {
        for (const [key, value] of Object.entries(this)) {
            if (value === undefined)
                throw new Error(`Configuration ${key} is undefined.`)
        }
    }
}

export const config: Config = new Config();