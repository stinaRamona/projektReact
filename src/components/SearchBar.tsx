import { useState } from "react";
import "../css/SearchBar.css"; 

const SearchBar = () => {

    //states 
    const [searchData, setSearchData] = useState<string>(); 

    const getSearchedBooks = async (event: any) => {
        //ska hämta böcker baserat på sökresultat
        event.preventDefault(); 

        try {

            const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchData)

            const data = await response.json(); 

            let booklist = data; 

            console.log(booklist.items[0].volumeInfo); //Får ut information om volymen 
            console.log("Bok-ID:" + booklist.items[0].id); //Får ut bokid på boken 

        } catch(error) {

            console.log(error); 
        }

    }

  return (
    <>
      <h1>Sök på boktitel, författare eller tema:</h1>
      <form onSubmit={getSearchedBooks}>
        <br />
        <input type="text" name="searchValue" id="searchValue" value={searchData}
        onChange={(event) => setSearchData(event.target.value)} //värdet från baren.  
        />
        <input type="submit" value={"Sök"} />
      </form>
      
    </>
  )
}

export default SearchBar
