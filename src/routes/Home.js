import React from 'react';
import { Link } from 'react-router-dom';
import TypeWriter from 'typewriter-effect';
import useSound from 'use-sound'
import PikaHome from '../images/pikachu-home.gif'
import Pika from '../audio/pika.mp3'
import Char from '../audio/charmander.mp3'
import Intro from '../video/home.mp4'
import '../styles/home.css';

export default function Home() {

    const [play] = useSound(Pika, { autoPlay: false, volume: 0.2 })
    const [play2] = useSound(Char, { autoPlay: false, volume: 0.2 })

    return (
        <>
            <div className='home-page'>

                <h1 className='home-title'>Pick a Chew</h1>
                <img src={PikaHome} className='home-pikachu' alt='pikachu'/>
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

            {/* ////////////////// DESKTOP VERSION STARTS BELOW ///////////////////// */}

            <div className='desktop-home-page'>
                <h1 className='mobile-landscape'>Please rotate your device!!</h1>
                <h1 className='desktop-home-title'>Pick a Chew</h1>
                <h2 className='desktop-title2'>Charmander desktop version</h2>
                <video autoPlay={true} muted={true} loop={true}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: '-1',
                    }}>
                    <source src={Intro} type='video/mp4' />
                </video>
                <Link to='/Ingredients'><button onClick={play2} className='desktop-home-button'>START</button></Link>
            </div>
        </>
    )
}
