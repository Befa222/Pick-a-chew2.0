import React from 'react';
import '../styles/ingredients.css';
import TypeWriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import { ingredientsList } from '../components/ingredientsList'

export default function Ingredients() {
    return (
        <div className='ingredients-page'>
            <div className='ingredients-help-container'>
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
                <Multiselect
                avoidHighlightFirstOption
                    displayValue='value'
                    placeholder='SELECT INGREDIENTS'
                    id="search-bar"
                    onRemove={function noRefCheck() { }}
                    onSelect={function noRefCheck() { }}
                    options={ingredientsList.list}
                    showArrow
                />
            </div>
            <Link to='/Receipes'><button className='next-button'>NEXT</button></Link>
        </div>
    )
}
