import React from 'react'

export default function Choices(props) {
    const allChoices = props.choices.map((choice, index) => (
        <>
            <input type="radio" class="btn-check" name="vbtn-radio" id={`vbtn-radio${index}`} autocomplete="off" onClick={() => {props.answerHandler(choice)}}></input>
            <label class="btn btn-outline-dark" for={`vbtn-radio${index}`}>{choice}</label>
        </>
      ))
  return (
    <>
        {allChoices}
    </>
  )
}
