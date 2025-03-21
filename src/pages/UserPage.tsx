import { useState, useEffect } from "react"; 
import { useAuth } from "../context/AuthContext";
import "../css/UserPage.css"; 

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //användardata
  const {user} = useAuth(); 

  const getUserReviews = async () => {

    try {
      setIsLoading(true);
      const response = await fetch("https://projektreactapi.onrender.com/review/user/" + user?._id); 

      const data = await response.json(); 
      setReviewData(data); 
      data.forEach((review: ReviewForm) => getBookName(review.bookId));

    } catch(error) {
      console.log(error); 

    } finally {
      setIsLoading(false);
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
      const response = await fetch("https://projektreactapi.onrender.com/review/" + id, {
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
      const response = await fetch("https://projektreactapi.onrender.com/review/" + currentReviewId, {
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
    <div id="mainDivUserPage">
      <h1>Välkommen tillbaka {user?.user_name}</h1>
      <br />
      <h2>Se och hantera dina recensioner</h2>
      {isLoading && <em>Laddar dina recensioner...</em>}
      {
        reviewData.map((review, index) => (
          <div key={index} className="reviewDiv">
            <h3>På boken {bookName[review.bookId]}</h3> 
            <p>{review.rating}/5</p>
            <p>{review.review}</p>
            <button id="deleteBtn" onClick={() => deleteReview(review._id)}>Ta bort</button> <button id="updateBtn" onClick={() => toggleUpdateForm(review._id)}>Uppdatera</button>
          </div>
        ))
      }

      {isVisible == true && updatedReviewData &&
      <form id="updateForm" onSubmit={updateReview}>
        <label htmlFor="rating">Omdömme:</label><br /><br />
        <input type="number" name="rating" id="rating" value={updatedReviewData?.rating}
        onChange={(event) => setUpdatedReviewData({ ...updatedReviewData, rating: Number(event.target.value) })}
        /><br /><br />

        <label htmlFor="review">Recension:</label><br /><br />
        <textarea name="review" id="review" rows={10} value={updatedReviewData?.review}
        onChange={(event) => setUpdatedReviewData({ ...updatedReviewData, review: event.target.value})}
        ></textarea><br /><br />

        <input type="submit" value={"Uppdatera"} />
      </form>}
    </div>
  )
}

export default UserPage
