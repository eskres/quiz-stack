import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CategoryCard from './CategoryCard.js'

export default function CategoryList() {
    const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL})

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
      }, [])

    const getCategories = () => {
        axiosInstance.get("categories")
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
        <div class="row justify-content-center">
            <div className="col-10">
                <div className="row row-cols-1 row-cols-md-3 g-5">
                    {allCategories}
                </div>
            </div>
        </div>
  )
}
