import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";


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
            const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + id); 

            if(response.ok) {
                let data = await response.json(); 
                
                console.log("Bokdata: " + data.items.volumeInfo); //visar bokdata nu undefined
                
                const singleBook = {
                    id: data.items.id,
                    image: data.items.volumeInfo.imageLinks.smallThumbnail, //lägg till placeholder ifall bild inte finns 
                    title: data.items.volumeInfo.title, 
                    author: data.items.volumeInfo.authors?.join(", "), //sätter ihop om flera 
                    description: data.items.volumeInfo.description
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
    <div id="singleBook">
        <span>{error && error}</span>
        <img src={bookInfo?.image} alt={bookInfo?.title}/>
        <h2>{bookInfo?.title}</h2>
        <p>{bookInfo?.author}</p>
        <p>{bookInfo?.description}</p>
    </div>
  )
}

export default SinglePage
