import React, {useState, useEffect} from 'react'
import Axios from 'axios'

export default function Profile(props) {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        getScores()
      }, [])

    const getScores = (id) => {
    Axios.get(`/auth/user?id=${props.user.id}`)
        .then(response => {
            setScores(response.data.user.score);
        })
        .catch(error => {
            console.log("Error retrieving user");
        })
    }
    const allScores = scores.map((score, index) => (
        <tr>
            <td>{score.category}</td>
            <td>{score.score}</td>
        </tr>
    ));
  return (
    <div className='container bg-light'>
        <table className='table'>
            <tr>
                <th scope='col'>
                    Category
                </th>
                <th scope='col'>
                    Score
                </th>
            </tr>
            <tbody>
                {allScores}
            </tbody>
        </table>
    </div>
  )
}
