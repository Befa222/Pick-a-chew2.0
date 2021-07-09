import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { stock } from '../components/stock';
import '../styles/receipes.css'


// REACT_APP_API_SPOONACULAR_KEY = 71b0a410e528408b9c88a08d281b4d6f JL

const api = {
  oldKey: "71b0a410e528408b9c88a08d281b4d6f",
  key: "2efe18a364b54adda15bdbdcf82390d3",
  base: "https://api.spoonacular.com/",
}




export default function Receipes() {

  const [receipe, setReceipe] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(true);

  console.log(stock)

const getReceipe = () => {
    Axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${api.oldKey}&ingredients=${stock}&number=1`)
      .then((response) => {
        console.log(response);
        setReceipe(response.data[0]);
        
      })
      
  }
  
 
useEffect(()=>{
const timer2 = setTimeout(()=>{
 setLoadingScreen(false) 
}, 2000);
return ()=>clearTimeout(timer2),
[]})


useEffect(()=>{
const timer = setTimeout(()=>{
  getReceipe()
},2000);
return ()=>clearTimeout(timer),
[]})



  return (
    <>
      {loadingScreen ?
        <div className='loading-screen'>

        </div>
        : 
        <div>
          <button onClick={getReceipe}>test</button>

          <h1>title:{receipe.title}</h1>
          <img src={receipe.image} />

        </div>
        }
    </>

  )
}
