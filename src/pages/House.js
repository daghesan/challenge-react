/*
API endpoint: [ https://hp-assessment-api.herokuapp.com/hp/house/:id ]

- Clicking on the house of a character (house name or houseId) in the Homepage takes you to a details page
- A house is displayed with all it's values (founder, animal, imgUrl, etc)
- There's also a list of students belonging to that house (ideally you use the separate component created for the Homepage)
- Params are used to get the house id
*/

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Title from "../components/Title";

const House = () => {
    const params = useParams()

    const [ house, setHouse ] = useState(null)
    const [ characters, setCharacters] = useState(null)

    const getHouse = async () => {
        const response = await axios.get(`https://hp-assessment-api.herokuapp.com/hp/house/${params.id}`);
        setHouse(response.data);
    }
    
    const getCharacters = async () => {
        const response = await axios.get("https://hp-assessment-api.herokuapp.com/hp/characters");
        setCharacters(response.data);
    }

    useEffect( () => {
        getHouse();
        getCharacters();
    }, [] )


    
    return house ? (
        <div className="House">
            <Title></Title>
            <Navbar></Navbar>
            <h2>House: {house.name}</h2>
            <p>Animal: {house.animal}</p>
            <p>Colors: {house.colors}</p>
            <p>Founder: {house.founder}</p>
            <p>Ghost: {house.ghost}</p>
            <img src={house.imgUrl}></img>
            <h3>Notable students</h3>
            
            { characters? (
                characters.filter( c => c.house.id === house.id).map((c, index) => {
                    return(<p key={index}>- {c.name}</p>)
                })
            ):(
            <p>Loading</p>
            )}

        </div>
    ) : (<p>Loading ...</p>)

}

export default House;