import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import Axios from 'axios';
import Choices from './Choices';
import Answer from './Answer';

export default function CategoryQuestions(props) {

  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0)
  const [maxQuestionIndex, setMaxQuestionIndex] = useState()

  useEffect(() => {
      getQuestions(id)
    }, [])
  useEffect(() => {
      stageQuestion(questions)
    }, [questions])

  function shuffle(array){
    for(let i = array.length-1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  function stageQuestion(q) {
    if(q[questionIndex]){
      let newChoices = {...choices}
      shuffle(q[questionIndex].choices)
      newChoices = q[questionIndex].choices
      setChoices(newChoices);
      setLoading(false);
    }
  }

  const getQuestions = (id) => {
      Axios.get(`/questions/category?id=${id}`)
      .then(response => {
        shuffle(response.data.questions);
        setQuestions(response.data.questions);
        setMaxQuestionIndex(response.data.questions.length)
      })
      .catch(error => {
          console.log("Error retrieving questions");
      })
  }

  const answerHandler = (e) => {
    let finalAnswer = {...answer};
    e === questions[questionIndex].answer ?  finalAnswer="correct" : finalAnswer="incorrect";
    setAnswer(finalAnswer);
  }

  const paginationHandler = (e) => {
    let newQuestion = {...questionIndex}
    if (e === "next" && questionIndex !== (maxQuestionIndex-1)) {
      newQuestion = questionIndex + 1;
      setQuestionIndex(newQuestion);
    } else if (questionIndex !== 0) {
      newQuestion = questionIndex - 1;
      setQuestionIndex(newQuestion);
    }
  }

  return (
    <> 
      {loading && !choices[0] ? (
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className='row justify-content-center'>
            <div class="col-2">
              <h1 className='m-3'>{questions[questionIndex].question}</h1>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className="col-8">
              <div className="btn-group-vertical" role="group" aria-label="Large button group">
                <Choices choices={choices} answerHandler={answerHandler}/>
              </div>
            </div>
          </div>
          <div className="row justify-content-evenly">
            <div className='col-2'>
              <button class="btn btn-outline-dark px-5 m-3" type="button" onClick={() => {paginationHandler("prev")}}>Previous</button>
            </div>
            <div className='col-2'>
              <button class="btn btn-outline-dark px-5 m-3" type="button" onClick={() => {paginationHandler("next")}}>Next</button>
            </div>
          </div>
          <Answer answer={answer} question={questions[questionIndex]}/>
        </div>
      )}
    </>
  )
}
