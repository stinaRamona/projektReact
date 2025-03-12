import { useState, useEffect } from "react"; 
import { useAuth } from "../context/AuthContext";

const UserPage = () => {
  
  interface ReviewForm {
    _id: string
    bookId: string, 
    userId: string, 
    rating: number, 
    review: string

  }; 

  //states
  const [reviewData, setReviewData] = useState<ReviewForm[]>([{_id: "", bookId : "", userId: "", rating: 1, review: ""}])
  
  //användardata
  const {user} = useAuth(); 

  const getUserReviews = async () => {

    try {
      const response = await fetch("http://localhost:3000/review/user/" + user?._id); 

      const data = await response.json(); 

      setReviewData(data); 

    } catch(error) {
      console.log(error); 
    }
  }

  const deleteReview = async (id: string) => {

    try {
      const response = await fetch("http://localhost:3000/review/" + id, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json"
        }
      }); 
      if(response.ok) {
        console.log("review borttaget!"); 
      }


    } catch(error) {
      console.log(error); 
    }

    getUserReviews(); 

  }

  useEffect(() => {
    getUserReviews(); 
  }, [])

  return (
    <div>
      <h1>Du har kommit till adminsidan!</h1>
      <h2>Dina lämnade recensioner:</h2>
      {
        reviewData.map((review, index) => (
          <div key={index} id="reviewDiv">
            <h3>På boken {review.bookId}</h3> {/*Vill ha namnet på boken...*/}
            <p>{review.rating}/5</p>
            <p>{review.review}</p>
            <button onClick={(event) => deleteReview(review._id)}>Ta bort</button> <button>Uppdatera</button>
          </div>
        ))
      }
    </div>
  )
}

export default UserPage
