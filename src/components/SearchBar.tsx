import { useState } from "react";

const SearchBar = () => {

    //states 
    const [searchData, setSearchData] = useState<string>();

    const getSearchedBooks = async (event: any) => {
        //ska hämta böcker baserat på sökresultat
        event.preventDefault(); 

        try {
            const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchData)

            const data = await response.json(); 

            const bookList = data 

            console.log(bookList); 

        } catch(error) {

            console.log(error); 
        }

    }

  return (
    <>
      <form onSubmit={getSearchedBooks}>
        <label htmlFor="searchValue">Sök efter titel, författare eller tema:</label>
        <input type="text" name="searchValue" id="searchValue" value={searchData}
        onChange={(event) => setSearchData(event.target.value)} //värdet från baren.  
        />
        <input type="submit" value={"Sök"} />
      </form>
    </>
  )
}

export default SearchBar
