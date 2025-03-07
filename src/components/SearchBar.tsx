import { useState, useEffect } from "react";
import "../css/SearchBar.css"; 

const SearchBar = () => {
    //interface 
    interface searchResult {
      image: string, 
      title: string, 
      author: string, 
      description: string
    }

    //states 
    const [searchData, setSearchData] = useState<string>(); 
    const [bookList, setBookList] = useState<searchResult[]>([]); //testar om det funkar. 

    const getSearchedBooks = async (event: any) => {
        //ska hämta böcker baserat på sökresultat
        event.preventDefault(); 

        try {

            const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchData)

            const data = await response.json(); 

            //array av svaret from api 
            const books = data.items.map((item: any) => ({
              image: item.volumeInfo.imageLinks.smallThumbnail, 
              title: item.volumeInfo.title, 
              author: item.volumeInfo.authors.join(", "), //sätter ihop om flera 
              description: item.volumeInfo.description
            }));

            setBookList(books); 

            /*
            console.log(bookList.items[0].volumeInfo); //Får ut information om volymen 
            console.log("Bok-ID:" + booklist.items[0].id); //Får ut bokid på boken 
            */

        } catch(error) {

            console.log(error); 
        }

    }

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

      <div id="searchResultDiv">
        {
          bookList.map((book, index) => (
            <div className="bookItem" key={index}>
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <article>{book.description}</article>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default SearchBar
