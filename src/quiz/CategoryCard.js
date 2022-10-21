import React from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"

export default function CategoryCard(props) {
  return (
    <div className='col'>
        <div className='card' style={{width: 18 + 'rem'}}>
            <div className='class-body'>
                <h5 className='card-title'>{props.name}</h5>
                <p className="card-text"><small className="text-muted">A description</small></p>
            </div>
            <img src="https://via.placeholder.com/300x150" className="card-img-bottom" alt="..."></img>
        </div>
    </div>
  )
}
