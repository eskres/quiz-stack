import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import CategoryCard from './CategoryCard.js'

export default function CategoryList() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
      }, [])

    const getCategories = () => {
        Axios.get("categories")
        .then(response => {
            setCategories(response.data.categories)
        })
        .catch(error => {
            console.log("Error retrieving categories");
        })
    }

    const allCategories = categories.map((category, index) => (
        <div key={index}>
            <CategoryCard {...category}/>
        </div>
    ))

  return (
    <div className='container'>
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {allCategories}
        </div>
    </div>
  )
}
