import React, { useState } from 'react'

export default function Form({addComment}) {

    const [comment, setComment] = useState("")

    console.log("comment: " + comment)

    //prevent refreshing of the page
    const handleSubmit = (event) => {
        event.preventDefault()
        addComment(comment)
        setComment("")
    }

  return (
    <div className='Form'>
        <form onSubmit={handleSubmit}> 
          <label>Write a comment...</label>  <input value={comment} onChange={ (event) => {setComment(event.target.value)}} />
        </form>
    </div>
  )
}
