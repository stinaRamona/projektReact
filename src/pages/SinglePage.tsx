import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../css/SinglePage.css"; 

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
    <p> <NavLink className="inTextLink" to="/login">Logga in</NavLink> för att skriva en recension på boken. Har du inget konto? <NavLink className="inTextLink" to="/register">Registrera dig!</NavLink></p>
    </>

  )
}

export default SinglePage
