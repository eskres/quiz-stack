import React from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import CategoryQuestions from './CategoryQuestions'

export default function CategoryCard(props) {
  return (
    <div className='col'>
          <div className='card' style={{width: 18 + 'rem'}}>
              <div className='card-body'>
                <Link className='card-body' to={`/quiz/${props._id}`} >
                  <h5 className='card-title'>{props.name}</h5>
                </Link>
                {/* <Routes>
                  <Route path="/MERN" element={<CategoryQuestions questions={props.questions}/>}></Route>
                </Routes> */}
                  <p className="card-text"><small className="text-muted">A description</small></p>
              </div>
              <img src="https://via.placeholder.com/300x150" className="card-img-bottom" alt="..."></img>
          </div>
    </div>
  )
}
