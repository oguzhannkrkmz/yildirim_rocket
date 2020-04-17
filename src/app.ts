import bodyParser from "body-parser";
import express, { Application } from "express";
import exphbs from "express-handlebars";
import { __static } from "../host.json";
// Connection import
import { ApiRoutes } from "./routes/api-routes";

class App {
    public app: Application

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routeConfig();
        this.handlebars();
    }

    private config = () => {
        this.app.use(express.static(__static));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    }

    private handlebars = ()=>{
        this.app.engine('handlebars', exphbs({}));
        this.app.set('view engine','handlebars');
    }

    private routeConfig = () => {
        this.app.use('/api', new ApiRoutes(this.app).Routes)
    }

    private mongoSetup = () => {
        // Mongo Setup
    }
}

export default new App().app;