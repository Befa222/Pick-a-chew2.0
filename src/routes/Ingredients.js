import React, { useState } from 'react';
import '../styles/ingredients.css';
import TypeWriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import { ingredientsList } from '../components/ingredientsList'
import { stock } from '../components/stock'
import useSound from 'use-sound'
import Loading from '../audio/healingCut.mp3'




export default function Ingredients() {


    const [play] = useSound(Loading, { autoplay: false, volume: 0.2 })

    const [getIngredients, setGetIngredients] = useState(true)

    function addIngredients(selectedList, selectedItem) {
        setGetIngredients(stock.push(selectedItem.value))
    }

    function removeIngredients(selectedList, selectedItem) {
        for (let i = 0; i < stock.length; i++) {
            if (stock[i] === selectedItem.value) {
                stock.splice(i, 1)
            }
        }
    }

    return (
        <>
        <div className='ingredients-mobile-landscape'>
        <h1 className='ingredients-landscape'>Please rotate your device</h1>
        </div>
            <div className='ingredients-page'>
                <div className='help-container'>
                    <div className='pikachu-help'></div>
                    <div className='typewriter-help'>
                        <TypeWriter
                            onInit={(typewriter) => {
                                typewriter
                                    .changeDelay(80)
                                    .typeString("Pika Pika! Here you are able to add ingredients for your meal!")
                                    .pauseFor(1000)
                                    .deleteAll(1)
                                    .typeString('Click on the search bar to select ingredients or you can start typing too!')
                                    .pauseFor(1000)
                                    .deleteAll(1)
                                    .typeString('When you are done, click on the NEXT button!')
                                    .start()
                            }}
                        />
                    </div>
                </div>

           
                <div className='ingredients-search'>
                    {getIngredients &&
                        <Multiselect
                            avoidHighlightFirstOption
                            displayValue='value'
                            placeholder='SELECT INGREDIENTS'
                            id="search-bar"
                            onRemove={removeIngredients}
                            onSelect={addIngredients}
                            options={ingredientsList.list}
                            showArrow
                            closeOnSelect={true}

                        />
                    }
              
                </div>
                <Link to='/Receipes'><button onClick={play} className='next-button'>NEXT</button></Link>
            </div>

            {/* ////////////////// DESKTOP VERSION STARTS BELOW //////////////////  */}


            <div className='desktop-help-container'>
                <div className='charmander-help'></div>
                <div className='desktop-typewriter-help'>
                    <TypeWriter
                        onInit={(typewriter) => {
                            typewriter
                                .changeDelay(80)
                                .typeString("Chaaaar! Here you are able to add ingredients for your meal!")
                                .pauseFor(1000)
                                .deleteAll(1)
                                .typeString('Click on the search bar to select ingredients or you can start typing too!')
                                .pauseFor(1000)
                                .deleteAll(1)
                                .typeString('When you are done, click on the NEXT button!')
                                .start()
                        }}
                    />
                </div>
            </div>
            <div className='desktop-ingredients-search'>
                {getIngredients &&
                    <Multiselect
                        avoidHighlightFirstOption
                        displayValue='value'
                        placeholder='SELECT INGREDIENTS'
                        id="desktop-search-bar"
                        onRemove={removeIngredients}
                        onSelect={addIngredients}
                        options={ingredientsList.list}
                        showArrow
                        closeOnSelect={false}

                    />
                }
            </div>
            <Link to='/Receipes'><button onClick={play} className='desktop-next-button'>NEXT</button></Link>
        </>
    )
}
