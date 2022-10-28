import React from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"

export default function CategoryCard(props) {
  return (
    <div className='col-2'>
            <Link className='card-body' to={`/quiz/${props._id}`} >
      <button className="btn btn-transparent">
      <div className='card text-center border-white bg-transparent p-4' style={{width: 18 + 'rem'}}>
        <i className={`${props.icon} card-image-top`}></i>
          <div className='card-body'>
              <h5 className='card-title'>{props.name}</h5>
              <p className="card-text"><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small></p>
          </div>
      </div>
      </button>
            </Link>
    </div>
  )
}
