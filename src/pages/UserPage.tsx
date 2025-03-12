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
  const [bookName, setBookName] = useState<{ [key: string]: string }>({}); 
  
  //användardata
  const {user} = useAuth(); 

  const getUserReviews = async () => {

    try {
      const response = await fetch("http://localhost:3000/review/user/" + user?._id); 

      const data = await response.json(); 
      setReviewData(data); 
      data.forEach((review: ReviewForm) => getBookName(review.bookId));

    } catch(error) {
      console.log(error); 
    }
  }

  const getBookName = async (bookId: string) => {
    
    try {
      const response = await fetch("https://www.googleapis.com/books/v1/volumes/" + bookId);

      const data = await response.json(); 
      setBookName(prevState => ({ ...prevState, [bookId]: data.volumeInfo.title }))
    } catch(error) {
      console.log(error)
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

  const updateReview = async (id: string) => {
    
    const updatedReview = {
      /*Ny data, ett formulär? Eller någon annan lösning?*/
    }

    try {
      const response = await fetch("http://localhost:3000/review/" + id, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(updatedReview)
      }); 

      if(response.ok) {
        const data = await response.json(); 
        console.log(data);
      } else {
        console.log("det gick inte att uppdatera"); 
      }
 

    } catch(error) {
      console.log(error); 
    }

  }

  useEffect(() => {
    getUserReviews(); 
  }, [])

  return (
    <div>
      <h1>Du har kommit till adminsidan!</h1>
      <h2>Se och hantera dina recensioner</h2>
      {
        reviewData.map((review, index) => (
          <div key={index} id="reviewDiv">
            <h3>På boken {bookName[review.bookId]}</h3> {/*Vill ha namnet på boken...*/}
            <p>{review.rating}/5</p>
            <p>{review.review}</p>
            <button onClick={() => deleteReview(review._id)}>Ta bort</button> <button onClick={() => updateReview(review._id)}>Uppdatera</button>
          </div>
        ))
      }
    </div>
  )
}

export default UserPage
