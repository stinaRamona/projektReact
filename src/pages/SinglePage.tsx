import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../css/SinglePage.css"; 
import { useAuth } from "../context/AuthContext";

const SinglePage = () => {
    
    interface Book {
        id: string, 
        image: string, 
        title: string, 
        author: string, 
        description: string 
    } 

    interface ReviewForm {
        _id: string,
        bookId: string, //ska vara från googlebooks 
        userId: string, //ska vara från användaren (redan fixat genom api)
        rating: number, 
        review: string
    }; 

    interface Review {
        rating: number, 
        review: string
    }

    //states 
    const {id} = useParams<{id: string}>(); 
    const [bookInfo, setBookInfo] = useState<Book>({id:"", image: "", title: "", author: "", description: ""}); 
    const [error, setError] = useState<string>(); 
    const [reviewData, setReviewData] = useState<ReviewForm>({_id:"", bookId : "", userId: "", rating: 1, review: ""})
    const [bookReview, setBookReview] = useState<Review[]>(); 

    const {user} = useAuth();
    
    const getBook = async () => {

        try {
            const response = await fetch("https://www.googleapis.com/books/v1/volumes/" + id); 

            if(response.ok) {
                let data = await response.json(); 
                
                const singleBook = {
                    id: data.id,
                    image: data.volumeInfo.imageLinks.thumbnail,
                    title: data.volumeInfo.title, 
                    author: data.volumeInfo.authors?.join(", "), //sätter ihop om flera 
                    description: data.volumeInfo.description.replace(/<\/?[^>]+>/gi, '')
                }

                setBookInfo(singleBook); 
                console.log("Boken syns"); 
            } else {
                console.log("Något gick fel")
                setError("Kunde inte hämta boken. Försök igen senare"); 
            }

        } catch(error) {

            console.log(error); 
        }

    }

    //Hämtar omdömen om boken
    const getBookReviews = async () => {

        try {
            const response = await fetch("http://localhost:3000/review/" + id); 

            if(response.ok) {
                const data = await response.json(); 
                setBookReview(data); 
            }
        } catch(error) {
            console.log(error); 
        }

    }

    //Lägger till ny recension på boken 
    const submitReview = async (id: any, event:any) => {
        
        event.preventDefault(); 

        console.log("Google books id:" + id); 

        const review = {
            bookId: id, 
            userId: user?._id, 
            rating: reviewData.rating, 
            review: reviewData.review
        }

        try {
            const response = await fetch("http://localhost:3000/review", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(review)
            })

            if(response.ok) {
                console.log("Review postad!"); 
            } else {
                console.log("Måste uppdatera någe"); 
            }

        } catch(error) {
            console.log("Det gick inte att lägga till" + error); 
        }

        setReviewData({_id: "", bookId: "", userId:"", rating: 1, review: ""})

        getBookReviews(); 
    }

    useEffect(() => {
        getBook();
        getBookReviews(); 
    }, [id]); 

    return (
    <div id="mainDivSinglePage">
    <div id="singleBook">
        <span>{error && error}</span>
        <img src={bookInfo?.image} alt={bookInfo?.title}/>
        <h2>{bookInfo?.title}</h2>
        <p>{bookInfo?.author}</p>
        <p>{bookInfo?.description}</p>
    </div>
    <h3>Omdömen:</h3>
    <div id="bookReviewsDiv">
        {!bookReview ? <p>Det finns inga recensioner på denna bok</p> :
        <>
        {bookReview.map((review, index) => (
            <div className="reviewDiv" key={index}>
                <h3>{review.rating}/5</h3>
                <p>{review.review}</p>
                {/*<em>Recenserad av användare {user?.user_name}</em>*/}
            </div>
        ))}
        </> 
        }
    </div>
    {/*Om man inte är inloggad så blir man hänvisad till att logga in om man vill recenserra boken. Annars visas ett formulär för det*/}
    {!user ? <p><NavLink className="inTextLink" to="/login">Logga in</NavLink> för att skriva en recension på boken. Har du inget konto? <NavLink className="inTextLink" to="/register">Registrera dig!</NavLink></p> : 
    
    <form id="reviewForm" onSubmit={() => submitReview(bookInfo?.id, event)}>
        <h3>Lämna en recension på boken, {user.user_name}</h3>

        <label htmlFor="rating">Omdömme (1-5):</label><br /><br />
        <input type="number" id="rating" name="rating" value={reviewData.rating}
        onChange={(event) => setReviewData({...reviewData, rating: Number(event.target.value)})}
        /><br /><br />

        <label htmlFor="review">Din recension:</label><br /><br />
        <textarea rows={10} name="review" id="review" value={reviewData.review}
        onChange={(event) => setReviewData({...reviewData, review: event.target.value})}
        ></textarea><br /><br />

        <input type="submit" value={"Lämna omdömme"} id="newRevBtn"/>
    </form>
    
    }
    
    </div>

  )
}

export default SinglePage
