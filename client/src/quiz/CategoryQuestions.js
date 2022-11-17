import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios';
import Choices from './Choices';
import Answer from './Answer';
import Pagination from './Pagination';

export default function CategoryQuestions(props) {
  const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL})

  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0)
  const [maxQuestionIndex, setMaxQuestionIndex] = useState()

  useEffect(() => {
      getQuestions(id)
    }, [])
  useEffect(() => {
      stageQuestion(questions)
    }, [questions, questionIndex])

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
      setAnswer("");
      setLoading(false);
    }
  }

  const getQuestions = (id) => {
      axiosInstance.get(`/questions/category?id=${id}`)
      .then(response => {
        shuffle(response.data.questions);
        setQuestions(response.data.questions);
        setMaxQuestionIndex(response.data.questions.length-1)
      })
      .catch(error => {
          console.log("Error retrieving questions");
      })
  }

  const answerHandler = (e) => {
    let finalAnswer = {...answer};
    if(e === questions[questionIndex].answer){
      finalAnswer="correct";
    } else {
      finalAnswer="incorrect";
    }
    setAnswer(finalAnswer);
  }
  
  const paginationHandler = (e) => {
    let newScore = score;
    let newQuestion = {...questionIndex}
    if (e === "next" && questionIndex !== maxQuestionIndex) {
      if(answer === "correct"){
        newScore++;
      }
      newQuestion = questionIndex + 1;
      setQuestionIndex(newQuestion);
    } else if (e === "prev" && questionIndex !== 0) {
      if(newScore > 0){
        newScore--;
      }
      newQuestion = questionIndex - 1;
      setQuestionIndex(newQuestion);
    }
    setScore(newScore);
  }

  return (
    <> 
      {loading && !choices[0] ? (
        <div className="row justify-content-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container" id='quiz'>
            <div className="progress mb-3">
              <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-label="Animated striped example" aria-valuenow={questionIndex} aria-valuemin="0" aria-valuemax={maxQuestionIndex} style={{width: (100/(maxQuestionIndex+1))*questionIndex + "%"}}></div>
            </div>
          <div className='row justify-content-center'>
            <div className="col-2 text-nowrap">
              <h5>Your score is: {score}</h5>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className="col-12 text-center text-wrap">
              <h1 className='m-3'>{questions[questionIndex].question}</h1>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className="col-10" >
              <div className="btn-group-vertical m-3" role="group" aria-label="Large button group">
                <Choices choices={choices} answerHandler={answerHandler} questionIndex={questionIndex}/>
              </div>
            </div>
          </div>
          <Pagination paginationHandler={paginationHandler} scoreHandler={props.scoreHandler} id={id} score={score} user={props.user} questionIndex={questionIndex} maxQuestionIndex={maxQuestionIndex}/>
          <Answer answer={answer} question={questions[questionIndex]}/>
        </div>
      )}
    </>
  )
}
