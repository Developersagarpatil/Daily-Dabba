import axios from "axios"

const fetchRatings = async(mid, token)=>{
     const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`/api/rating/` + mid, options)
    console.log(response.data)
    return response.data
}

const addRating = async(rating, token)=>{
     const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(`/api/rating/` + rating.mid,rating, options)
    console.log(response.data)
    return response.data
}

const ratingService = {
    fetchRatings,
    addRating
}

export default ratingService
