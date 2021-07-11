import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { stock } from '../components/stock';
import TypeWriter from 'typewriter-effect';
import runningPika from '../images/runningPika.gif'
import '../styles/receipes.css'
import { Carousel } from 'react-responsive-carousel';
import {Link} from 'react-router-dom'



// REACT_APP_API_SPOONACULAR_KEY = 71b0a410e528408b9c88a08d281b4d6f JL

const api = {
  oldKey: "71b0a410e528408b9c88a08d281b4d6f",
  key: "2efe18a364b54adda15bdbdcf82390d3",
  base: "https://api.spoonacular.com/",
}




export default function Receipes() {



  const [receipe, setReceipe] = useState();
  const [receipeDetails, setReceipeDetails] = useState()
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [showDetails, setShowDetails] = useState(false);


  const getReceipe = () => {
    Axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${api.oldKey}&ingredients=${stock}&number=2`)
      .then((response) => {
        console.log(response);
        setReceipe(response.data);

      })

  }
  
  const getDetails = (id) =>{
    console.log(id)
    Axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${api.oldKey}`)
    .then((response2)=>{
      console.log(response2);
      setReceipeDetails(response2.data.id)

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

  console.log(receipe)

  return (
    <>
      {loadingScreen ?
        <div className='loading-screen'>
          <img className='loading-image' src={runningPika} alt='running-pikachu' />
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
                    .typeString('Swipe the pictures to browse, and click on it to see the details!')
                    .pauseFor(1000)
                    .deleteAll(1)
                    .typeString('If you want to add ingredients just click the BACK button! Bon appetit!!')
                    .start()
                }}
              />
            </div>
          </div>
          <Carousel
            autoPlay={false}
            showThumbs={false}
            showStatus={true}
            showIndicators={false}
            showArrows={true}
            axis={'horizontal'}
            selectedItem={0}
          >
            {receipe.map(item => (
              <div className='receipe-container' key={item.id}>
                <p className='receipe-name'>{item.title}</p>
                <img onClick={getDetails(item.id)} className='image-carousel' src={item.image} alt='receipe'/>
              </div>
            ))}
          </Carousel>
          {showDetails && 
          <div className='receipe-details'>
              <button onClick={()=> setShowDetails(!showDetails)}>close</button>
          </div>

          }
          <Link to='/Ingredients'><button className='back-button'>BACK</button></Link>
        </div>





      }
    </>

  )
}
