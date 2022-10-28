import React from 'react'

export default function Answer(props) {
  return (

    <div>
      { props.answer === "correct" ? (
      <div className='container justify-content-center'>
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Well done!</h4>
          <hr></hr>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      ) : (
        <div className='container justify-content-center'>
          {props.answer !== "" &&
          <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Good try! The correct answer was "{props.question.answer}"</h4>
            <hr></hr>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          }
        </div>
      )}
      
    </div>

  )
}
