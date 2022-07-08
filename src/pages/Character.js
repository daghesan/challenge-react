/*
Note: This is stored only in local state, when the page is refreshed everything should disappear.

Note: It's up to you to have the form in the same or in a different component

- There's a form with inputs for name and comment
- Submitting the form displays the name and comment on the screen
- Submitting a second comment also works
*/

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Title from "../components/Title";
import Form from "../components/Form";

const Character = () => {
    const params = useParams()

    const [ character, setCharacter ] = useState(null)
    const [ comments, setComments ] = useState([])

    const getCharacter = async () => {
        const response = await axios.get(`https://hp-assessment-api.herokuapp.com/hp/character/${params.id}`);
       
        setCharacter(response.data);
    }

    useEffect( () => {
        getCharacter();
    }, [] )

    /* COMMENTS FUNCTIONS */

    function addComment(comment){
        setComments([...comments, {comment:comment} ])
      }

    
    return character ? (
        <div className="Character">
            <Title></Title>
            <Navbar></Navbar>
            <p>Name: {character.name}</p>
            <p>Blood: {character.blood}</p>
            <p>Born: {character.born}</p>
            <p>House: {character.house.name}</p>
            <img src={character.imgUrl}></img>
            <p>Patronus: {character.patronus}</p>
            <p>Quote: "{character.quote}"</p>
            <p>Species: {character.species}</p>

            <Form addComment={addComment}></Form>

            <h3>Users' comments:</h3>
            <ul>
                {comments.map( (c, index) => {
                    return( <li key={index}>{c.comment}</li>)
                })}
            </ul>

        </div>
    ) : (<p>Loading ...</p>)

}

export default Character;