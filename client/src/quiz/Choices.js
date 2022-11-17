import React from 'react'

export default function Choices(props) {
    const allChoices = props.choices.map((choice, index) => (
        <>
            <input type="radio" className="btn-check" name="vbtn-radio" id={`vbtn-radio${index}`} autocomplete="off" onClick={() => {props.answerHandler(choice)}} key={props.questionIndex}></input>
            <label id="choices" className="btn btn-outline-light p-3" for={`vbtn-radio${index}`}>{choice}</label>
        </>
      ))
  return (
    <>
        {allChoices}
    </>
  )
}
