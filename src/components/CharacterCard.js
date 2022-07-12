/*
BRIEFING:
API endpoint: [ https://hp-assessment-api.herokuapp.com/hp/house/:id ]

- Clicking on the house of a character (house name or houseId) in the Homepage takes you to a details page
- A house is displayed with all it's values (founder, animal, imgUrl, etc)
- There's also a list of students belonging to that house (ideally you use the separate component created for the Homepage)
- Params are used to get the house id
*/

import { Link } from "react-router-dom";

export default function CharacterCard({name, index, id, born, house, image}) {
  return (
   <div id="grid-item" key={index}>
    <p>Name: {name}</p>
    <p>Birth: {born}</p>
    <p>House: <Link to={`/house/${house.id}`}>{house.name}</Link></p>
    <img src={image}></img>
    <button><Link to={`/character/${id}`}>Read More</Link></button>
   </div>
  )
}