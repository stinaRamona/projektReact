import { useState, useEffect } from "react"

const UserPage = () => {
  
  interface ReviewForm {

    bookId: string, //ska vara från googlebooks 
    userId: string, //ska vara från användaren (redan fixat genom api)
    rating: number, 
    review: string

  }; 

  const [reviewData, setReviewData] = useState<ReviewForm>({bookId : "", userId: "", rating: 1, review: ""})

  return (
    <div>
      <h1>Du har kommit till adminsidan!</h1>
      <h2>Dina lämnade omdömmen:</h2>
      {/*Senaste ämnade omdömena här. Utmappade i en array. 
      Sen ska man kunna ändra och ta bort samt lägga till
      * Lägga till på en annan sida? Klicka på en knapp som sen leder en till ett formulär där man kan ge ett omdömme? 
      På så sätt kan man få med id också - från SinglePage. 
      */}
    </div>
  )
}

export default UserPage
