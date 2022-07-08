/*
BRIEFING:
API endpoint: [ https://hp-assessment-api.herokuapp.com/hp/house/:id ]

- Clicking on the house of a character (house name or houseId) in the Homepage takes you to a details page
- A house is displayed with all it's values (founder, animal, imgUrl, etc)
- There's also a list of students belonging to that house (ideally you use the separate component created for the Homepage)
- Params are used to get the house id
*/

import { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "./CharacterCard";

export default function Characters() {

    const [ characters, setCharacters ] = useState(null)
    const [ houses, setHouses ] = useState(null)
    const [ sortBy, setSortBy ] = useState("")
    const [ filter, setFilter ] = useState("")

    const getCharacters = async () => {
        const response = await axios.get("https://hp-assessment-api.herokuapp.com/hp/characters");
        setCharacters(response.data);
    }

    const getHouses = async () => {
        const response = await axios.get("https://hp-assessment-api.herokuapp.com/hp/houses");
        setHouses(response.data)
    }

    useEffect( () => {
        getCharacters();
        getHouses();
    }, [] )

    /* SORTING FUNCTIONS */

    function compareName(a, b){
        return a.name.localeCompare(b.name);
      }
  
    function sortCharacters(){
        const sorted = [...characters].sort(compareName)
        return sorted
      }

    /* FILTER FUNCTIONS */

    const selectHouse = (event) =>{
        setSortBy(event.target.value);
    }



    return (
        <div className="Characters">
            <form className="Form">
                <input value={filter} onChange={ (event) =>{
                    setFilter(event.target.value);
                }} />
            </form>
            
            <select className="Select" onChange={selectHouse} value={sortBy}> 
            <option value={""}>All</option>
            {houses? houses.map( (h, index) => {
                return(<option key={index} value={h.name}>{h.name}</option>)
            }) : ""}
            </select>

            <div id="grid-container">
            {
            
            characters ? ( //check if fetched

                /* sortby is defined*/
                sortBy !== "" ? (
                /* filter not defined */
                filter === "" ? (
                    sortCharacters().filter(c => c.house.name === sortBy).map( (c,index) => {
                        return(<CharacterCard key={index} name={c.name} id={c.id} born={c.born} house={c.house} image={c.imgUrl}></CharacterCard>)
                        
                    })
                ) : (
                    sortCharacters().filter(c => (c.house.name === sortBy && ( (c.house.name.toLowerCase()).includes(filter) || (c.name.toLowerCase()).includes(filter) ) )).map( (c,index) => {
                        return(<CharacterCard key={index} name={c.name} id={c.id} born={c.born} house={c.house} image={c.imgUrl}></CharacterCard>)
                    })
                )

                ) : ( //sortby is all

                filter === "" ? (
                    sortCharacters().map( (c,index) => {
                        return(<CharacterCard key={index} name={c.name} id={c.id} born={c.born} house={c.house} image={c.imgUrl}></CharacterCard>)
                        
                    })
                ) : (
                    sortCharacters().filter(c => ( ( (c.house.name.toLowerCase()).includes(filter) || (c.name.toLowerCase()).includes(filter) ) )).map( (c,index) => {
                        return(<CharacterCard key={index} name={c.name} id={c.id} born={c.born} house={c.house} image={c.imgUrl}></CharacterCard>)
                    })
                )

                )

            ) : (<p>LOADING</p>)
            

            }
            </div>

        </div>
    )
}
