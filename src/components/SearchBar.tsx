import { useState } from "react";
import "../css/SearchBar.css"; 
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    //interface 
    interface searchResult {
      id: string, 
      image: string, 
      title: string, 
      author: string, 
      description: string
    }

    //states 
    const [searchData, setSearchData] = useState<string>(); 
    const [bookList, setBookList] = useState<searchResult[]>([]); //testar om det funkar. 
    //const [isVisible, setIsVisible] = useState(false); | FÖR DESCRIPTION kanske ska använda
    const navigate = useNavigate(); 

    const getSearchedBooks = async (event: any) => {
        //ska hämta böcker baserat på sökresultat
        event.preventDefault(); 

        try {

            const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchData)

            const data = await response.json(); 

            //array av svaret from api 
            const books = data.items.map((item: any) => ({
              id: item.id,
              image: item.volumeInfo.imageLinks?.smallThumbnail, //lägg till placeholder ifall bild inte finns 
              title: item.volumeInfo.title, 
              author: item.volumeInfo.authors?.join(", "), //sätter ihop om flera 
              description: item.volumeInfo.description
            }));

            setBookList(books); 

        } catch(error) {

            console.log(error); 
        }

    }

    //för att komma till bokinfo om en bok. 
    const goToSinglePage = async (id: string) => {
      navigate("/book/" + id); 
    }; 

  return (
    <>
      <h1>Sök på boktitel, författare eller tema:</h1>
      <form id="searchBar" onSubmit={getSearchedBooks}>
        <br />
        <input type="text" name="searchValue" id="searchValue" value={searchData}
        onChange={(event) => setSearchData(event.target.value)} //värdet från baren.  
        />
        <input type="submit" value={"Sök"} />
      </form>

      { searchData && <p>Visar resultat för {searchData}</p>}
      <div id="searchResultDiv">
        {
          bookList.map((book, index) => (
            <div className="bookItem" key={index}>
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              {/*KANSKE beskrivning här, kanske inte. Inte bestämt, föredrar looken utan */}
              <button onClick={() => goToSinglePage(book.id)}>Gå till bok</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default SearchBar
