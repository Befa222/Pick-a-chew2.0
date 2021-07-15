import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { stock } from '../components/stock';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom'
import TypeWriter from 'typewriter-effect';
import runningPika from '../images/runningPika.gif'
import spinningChar from '../images/spinningChar.gif'
import '../styles/receipes.css'



const api = {
  oldKey: "71b0a410e528408b9c88a08d281b4d6f",
  key: "2efe18a364b54adda15bdbdcf82390d3",
  base: "https://api.spoonacular.com/",
}


export default function Receipes() {

  const [receipe, setReceipe] = useState();
  const [receipeSteps, setReceipeSteps] = useState();
  const [ingredientsDetails, setIngredientsDetails] = useState()
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [showDetails, setShowDetails] = useState(false);


  const getReceipe = () => {
    Axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${api.oldKey}&ingredients=${stock}&number=2`)
      .then((response) => {
        setReceipe(response.data);
      })
  }

  const getInstructions = (id) => {
    Axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${api.oldKey}`)
      .then((response2) => {
        let getSteps = response2.data.flatMap(item => item.steps)
        setReceipeSteps(getSteps)
      })
  }

  const getDetails = (id) => {
    Axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api.oldKey}`)
      .then((response3) => {
        let ingredientsList = response3.data.extendedIngredients
        setIngredientsDetails(ingredientsList)
      })
  }

  useEffect(() => {
    const timer2 = setTimeout(() => {
      setLoadingScreen(false)
    }, 3000);
    return () => clearTimeout(timer2)
  }, [])


  useEffect(() => {
    const timer = setTimeout(() => {
      getReceipe()
    }, 1000);
    return () => clearTimeout(timer)
  }, []);


  return (
    <>
      {loadingScreen ?
        <div className='loading-screen'>
          <img className='loading-image' src={runningPika} alt='running-pikachu' />
          <img className='desktop-loading-image' src={spinningChar} alt='spinning-charmander' />
          <div className='loading-typewriter'>
            <TypeWriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(80)
                  .typeString("Now Loading...")
                  .start()
              }}
            />
          </div>
        </div>
        :
        <div className='receipe-page'>
          <h1 className='mobile-landscape'>Please rotate your device</h1>
          <div className='help-container'>
            <div className='pikachu-help'></div>
            <div className='typewriter-help'>
              <TypeWriter
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(80)
                    .typeString("Piiikaaa! These are the receipes you can cook!")
                    .pauseFor(1000)
                    .deleteAll(1)
                    .typeString('Swipe the pictures to browse, and click on them to see the details!')
                    .pauseFor(1000)
                    .deleteAll(1)
                    .typeString('If you want to add some ingredients just click the BACK button! Bon appetit!!')
                    .start()
                }}
              />
            </div>
          </div>
          {receipe ?

            <Carousel
              autoPlay={false}
              showThumbs={false}
              showStatus={true}
              showIndicators={false}
              showArrows={true}
              axis={'horizontal'}
              selectedItem={0}
              interval={20000}

            >
              {receipe.map(item => (
                <div className='receipe-container' key={item.id}>
                  <p className='receipe-name'>{item.title}</p>
                  <img onClick={() => { getInstructions(item.id); setShowDetails(!showDetails); getDetails(item.id) }} className='image-carousel' src={item.image} alt='receipe' />
                </div>
              ))}

            </Carousel>

            :
            <p className='error-message'>Oh no, all the daily points have been used! Please try again tomorrow!</p>
          }
          {showDetails &&
            <div className='receipe-details'>
              <h1 className='details-title'>Ingredients</h1>
              {ingredientsDetails &&
                ingredientsDetails.length ?
                ingredientsDetails.map(item =>
                  <ul className='details-list' key={item.nameClean}>
                    <li >{item.original}</li>
                  </ul>
                ) :

                <p className='api-error'>Sorry there is no ingredients!</p>
              }
              <h1 className='details-title'>Step by step</h1>
              {receipeSteps &&
                receipeSteps.length ?
                receipeSteps.map(item =>
                  <ul className='details-list' key={item.number}>
                    <li>{item.step}</li>
                  </ul>
                )
                :
                <p className='api-error'>Sorry there is no details!</p>
              }
              <button className='details-button' onClick={() => setShowDetails(!showDetails)}>CLOSE</button>
            </div>

          }
          <Link to='/Ingredients'><button className='back-button'>BACK</button></Link>



          <div className='desktop-help-container'>
            <div className='charmander-help'></div>
            <div className='desktop-typewriter-help'>
              <TypeWriter
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(80)
                    .typeString("Charmander! These are the receipes you can cook!")
                    .pauseFor(1000)
                    .deleteAll(1)
                    .typeString('Click on the arrows to browse, and click a picture to see the details!')
                    .pauseFor(1000)
                    .deleteAll(1)
                    .typeString('If you want to add some ingredients just click the BACK button! Bon appetit!!')
                    .start()
                }}
              />
            </div>
          </div>
          <Link to='/Ingredients'><button className='desktop-back-button'>BACK</button></Link>
        </div>

      }
    </>

  )
}
