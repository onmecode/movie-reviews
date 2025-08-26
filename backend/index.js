import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import MoviesDao from './dao/moviesDao.js'

async function main() {
    dotenv.config()
    console.log("DB URI:", process.env.MOVIEREVIEWS_DB_URI)
    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    )
    const port = process.env.PORT || 8000
    console.log(port)

try {

    await client.connect()
    await MoviesDao.injectDB(client)

    app.listen(port, () => {
        console.log('server is running on port:'+port);
    })
    } catch (e) {
        console.error(e);
        process.exit(1)
}

}
main().catch(console.error);