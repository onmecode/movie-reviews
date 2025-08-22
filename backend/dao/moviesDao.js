let movies
export default class MoviesDAO{
    static async injectBD(conn){
        if(movies){
            return
        }
    
    try{
        movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                    .collection('movies')
    }
    catch(e){
        console.log('unable to connect in MoviesDAO: ${e}')
        }
    }
}