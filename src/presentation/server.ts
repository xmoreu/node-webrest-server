import express, { Router } from 'express'
import path from 'path'
import { sequelize } from '../data/sequelize'
interface Options {
    port: number,
    public_path?: string,
    routes:Router
}
export class Server {
    private app = express()
    private readonly port: number
    private readonly publicPath: string
    private readonly routes:Router

    constructor(options: Options) {
        const { port, public_path ,routes} = options
        this.port = port
        this.publicPath = public_path ?? 'public'
        this.routes=routes
    }

    async start() {

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully with MySQL(sequelize).');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
         const actoresModel= sequelize.models.get('actores')
         const actores=await actoresModel?.findAll()
         console.log(actores)


        // Middlewares
        this.app.use(express.json())  //Permet llegir json pel raw
        this.app.use(express.urlencoded({extended:true})) //Permet llegir format x-www-form-urlencode
        //Public folder
        this.app.use(express.static(this.publicPath))

        //Routes
        this.app.use(this.routes)
       


        this.app.get('/*path', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
            res.sendFile(indexPath)
            return
        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port number ${3000}`)
        })
    }
}