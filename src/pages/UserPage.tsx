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
  const [isVisible, setIsVisible] = useState<boolean>(false); 
  const [currentReviewId, setCurrentReviewId] = useState<string | null>(null); 
  const [updatedReviewData, setUpdatedReviewData] = useState<ReviewForm | null>(null); 

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

  const toggleUpdateForm = async (id: string) => {
    setIsVisible(true); 
    setCurrentReviewId(id); 
    const review = reviewData.find(review => review._id === id); 
    setUpdatedReviewData(review || null); 
  }


  //kommer behöva få in id hit med. 
  const updateReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if(!currentReviewId || !updatedReviewData) return; 
    
    let updatedReview = {
      bookId: updatedReviewData.bookId, 
      userId: updatedReviewData.userId, 
      rating: updatedReviewData.rating, 
      review: updatedReviewData.review
    }

    try {
      const response = await fetch("http://localhost:3000/review/" + currentReviewId, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(updatedReview)
      }); 

      if(response.ok) {
        const data = await response.json(); 
        console.log(data);
        getUserReviews(); 
        setIsVisible(false);

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
            <h3>På boken {bookName[review.bookId]}</h3> 
            <p>{review.rating}/5</p>
            <p>{review.review}</p>
            <button onClick={() => deleteReview(review._id)}>Ta bort</button> <button onClick={() => toggleUpdateForm(review._id)}>Uppdatera</button>
          </div>
        ))
      }

      {isVisible == true && updatedReviewData &&
      <form onSubmit={updateReview}>
        <label htmlFor="rating">Omdömme:</label><br />
        <input type="number" name="rating" id="rating" value={updatedReviewData?.rating}
        onChange={(event) => setUpdatedReviewData({ ...updatedReviewData, rating: Number(event.target.value) })}
        /><br />

        <label htmlFor="review">Recension:</label><br />
        <textarea name="review" id="review" rows={10} value={updatedReviewData?.review}
        onChange={(event) => setUpdatedReviewData({ ...updatedReviewData, review: event.target.value})}
        ></textarea><br />

        <input type="submit" value={"Uppdatera"} />
      </form>}
    </div>
  )
}

export default UserPage
