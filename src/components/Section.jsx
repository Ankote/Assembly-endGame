import "../style/Section.css"
import Language from "../language"
import { languages } from "../languages.js"
import { useState, useEffect} from 'react'
import Keyboard from "./Keyboard.jsx"
import { use } from "react"
import clsx from 'clsx';

export default()=>{
    const [currentWord, setCurrentWord] = useState("REACT")
    const [guessedLetters, setguessedLetters] = useState([])

    // Derived values
    const wrongGuessesArray = 
        guessedLetters.filter(letter => !currentWord.includes(letter))
    
    const wrongGuessCount = wrongGuessesArray.length;
    const isGameWon = 
        currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = !isGameWon && languages.length === wrongGuessCount
    
    const isGameOver = isGameLost || isGameWon
    if (isGameOver)
        console.log("game over")
   

    const arr = currentWord.split("")
    const liters = arr.map((letter, index)=>
        <span 
            key={index}
        >
            {guessedLetters.includes(letter) && letter}
        </span>
    )


    const langs=languages.map((lang, index)=>{

        const isLanguageLost = index < wrongGuessCount
        const className = clsx("chip", isLanguageLost && "lost")
        return (<Language
            key= {lang.name}
            className={className}
            backgroundColor={lang.backgroundColor}
            color={lang.color}
            name={lang.name}
        />)
        })



    function getGuessLetters(letter){

        setguessedLetters(prevLetters => {
            const lettersSet = new Set(prevLetters) // set is like an array back it not support duplicates
            lettersSet.add(letter)
            return Array.from(lettersSet)
        })

        // !guessedLetters.includes(letter) && setguessedLetters(prev=>([...prev, letter]))
    }

    const keyboardLiters = "ABCDEFJHIGKLMNOPQRSTUVWXYZ";
    const buttons = keyboardLiters.split("").map((letter, index)=>

        {
            const isGuessed = guessedLetters.includes(letter);
            const isCorrect = isGuessed && currentWord.includes(letter)
            const isWrong = isGuessed && !currentWord.includes(letter)
            const className = clsx({
                correct:isCorrect,
                wrong:isWrong
            } )
            return(
                <button
                className={className}
                key={index}
                onClick={()=>getGuessLetters(letter)}
                value={letter}
            >
                {letter}
            </button>)
        }
    )
    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost
    })




    function renderGameStatus() {
        if (!isGameOver) {
            return null
        }
        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } else {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
    }

    return(
        <>
            <section className={gameStatusClass}>
                {renderGameStatus()}
            </section>
            
            <section className="language-chips">
                {langs}
            </section>

            <section className="word">
                {liters}   
            </section>

            <section className="keyboard">
                {buttons}
            </section>
        </>
    )
}