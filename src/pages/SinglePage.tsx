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

    //states 
    const {id} = useParams<{id: string}>(); 
    const [bookInfo, setBookInfo] = useState<Book>(); 
    const [error, setError] = useState<string>(); 

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

    const writeReview = async (id: any) => {
        //Tar emot id så att man kan koppla till omdömmet på boken
    }

    useEffect(() => {
        getBook();
    }, [id]);

    return (
    <>
    <div id="singleBook">
        <span>{error && error}</span>
        <img src={bookInfo?.image} alt={bookInfo?.title}/>
        <h2>{bookInfo?.title}</h2>
        <p>{bookInfo?.author}</p>
        <p>{bookInfo?.description}</p>
    </div>
    <h3>Omdömen:</h3>
    <div id="bookReviewsDiv">
        {/*Här ska det vara omdömen på boken  */}
        <p>Här ska omdömmena på boken finnas</p>
    </div>
    {!user ? <p><NavLink className="inTextLink" to="/login">Logga in</NavLink> för att skriva en recension på boken. Har du inget konto? <NavLink className="inTextLink" to="/register">Registrera dig!</NavLink></p> : 
    <button onClick={() => writeReview(bookInfo?.id)}>Lämna ett omdömme</button>}
    
    </>

  )
}

export default SinglePage
