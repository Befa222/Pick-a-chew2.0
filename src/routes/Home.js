import React from 'react';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import TypeWriter from 'typewriter-effect';
import useSound from 'use-sound'
import Pika from '../audio/pika.mp3'

export default function Home() {

    const [play] = useSound(Pika)

    return (
        <div className='home-page'>
            <h1 className='mobile-landscape'>Please rotate your device</h1>
            <h1 className='home-title'>Pick a Chew</h1>
            <div className='home-pikachu'></div>
            <div className='home-pokeBubble'>
                <div className='typewriter-container'>
                    <div className='typewriter'>
                        <TypeWriter
                            onInit={(typewriter) => {
                                typewriter
                                    .changeDelay(80)
                                    .typeString('Pika Pika! Welcome to Pick a Chew!')
                                    .pauseFor(500)
                                    .typeString('Your new favorite food app!')
                                    .pauseFor(1000)
                                    .deleteAll(1)
                                    .typeString('What can you cook with the ingredients you have at home?')
                                    .pauseFor(1000)
                                    .deleteAll(1)
                                    .typeString('I am here to help!')
                                    .pauseFor(500)
                                    .typeString(' Press the start button below!')
                                    .start()
                            }}
                        />
                    </div>
                </div>
            </div>
            <Link to='/Ingredients'><button onClick={play} className='home-button'>START</button></Link>
        </div>
    )
}
