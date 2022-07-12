/*
API endpoint: [ https://hp-assessment-api.herokuapp.com/hp/characters ]

- The Homepage displays a list of characters
- A separate component is used to display the characters
- Characters should be sorted alphabetically by their first name
- Each charcter is displayed with their name, birth, image, house (name or houseId) and "read more" button
- Clicking on the "Read more" button takes you to a details page
*/
import Characters from "../components/Characters"
import Navbar from "../components/Navbar"
import Title from "../components/Title"

export default function Homepage() {
  return (
    <div className="Homepage">
        <Title></Title>
        <Navbar></Navbar>
        <Characters></Characters>
    </div>
  )
}
