import React from 'react'

export default function Answer(props) {
  return (

    <div>
      { props.answer === "correct" ? (
        <>
          <h1>CORRECT!!!</h1>
        </>
      ) : (
        <>
          {props.answer !== "" && <h1>Better luck next time!</h1>}
        </>
      )}
    </div>

  )
}
