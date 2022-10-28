import React from 'react'

export default function Pagination(props) {

  return (
    <>
    {props.questionIndex === props.maxQuestionIndex ? (
    <div className="row justify-content-between">
        <div className='col-2'>
            <button className="btn btn-outline-light px-5 m-3" type="button" onClick={() => {props.paginationHandler("prev")}}>Prev</button>
        </div>
        <div className='col-2'>
            <button className="btn btn-outline-light px-5 m-3" type="button" onClick={() => {props.scoreHandler(props.user.id, props.score, props.id)}}>Save</button>
        </div>
    </div>
  ) : (
    <div className="row justify-content-between">
        <div className='col-2'>
            <button className="btn btn-outline-light px-5 m-3" type="button" onClick={() => {props.paginationHandler("prev")}}>Prev</button>
        </div>
        <div className='col-2'>
            <button className="btn btn-outline-light px-5 m-3" type="button" onClick={() => {props.paginationHandler("next")}}>Next</button>
        </div>
    </div>
  ) }
  </>
)}
