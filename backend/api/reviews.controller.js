import ReviewsDao from '../dao/reviewsDao.js'

export default class ReviewsController{
    
    static async apiPostReview(req, res, next){
        try{
            console.log("you are inside the post controller")
            const movieId = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const ReviewResponse = await ReviewsDao.addReview(
                movieId,
                userInfo,
                review,
                date
            )

            res.json({ status: "success",
                response_movie_id: ReviewResponse.movieId,
                response_user_info: ReviewResponse.userInfo,
                response_review: ReviewResponse.review,
                review_date: ReviewResponse.date

            })
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateReview(req,res, next){
        try{
            const reviewId = req.body.review_id
            const review = req.body.review

            const date = new Date()

            const ReviewResponse = await ReviewsDao.updateReview(
                reviewId,
                req.body.user_id,
                review,
                date
            )

            var { error } = ReviewResponse
            if (error) {
                return res.status(400).json({ error });
            }

            if (ReviewResponse.modifiedCount === 0) {
                    return res.status(400).json({ error: "Unable to update review." });
            }

             return res.json({ status: "success"})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.body.reviewId
            const userId = req.body.user_id
            const ReviewResponse = await ReviewsDao.deleteReview(
                reviewId,
                userId
            )

            res.json({ status: "success"})
        }catch(e){
            res.status(500).json({ error: e.message})
        }
    }
}