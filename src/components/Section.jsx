import "../style/Section.css"
import Language from "../language"
import { languages } from "../languages.js"
import { useState, useEffect} from 'react'
import Keyboard from "./Keyboard.jsx"
import { use } from "react"
import clsx from 'clsx';
import {getFarewellText, getRandomWord} from "../utils"
import Confetti from 'react-confetti'

export default()=>{
    const [currentWord, setCurrentWord] = useState(getRandomWord())
    const [guessedLetters, setguessedLetters] = useState([])
    console.log("currentWord")
    // Derived values
    const wrongGuessesArray = 
        guessedLetters.filter(letter => !currentWord.includes(letter))
    
    const wrongGuessCount = wrongGuessesArray.length;
    const isGameWon = 
        currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = !isGameWon && languages.length === wrongGuessCount
    const lastGuessedLetter = guessedLetters.length ? guessedLetters[guessedLetters.length - 1]: null
    const isLastGuessIncorrect = guessedLetters.length && !currentWord.includes(lastGuessedLetter)
    const isGameOver = isGameLost || isGameWon

    const arr = currentWord.split("")


    const letterElements = currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })

    // const liters = arr.map((letter, index)=>{
    //     if (!isGameOver)
    //         return(
    //             <span 
    //                 key={index}
    //             >
    //                 {guessedLetters.includes(letter) && letter}
    //             </span>
    //         )
    //     else if(isGameLost){
    //             return(
    //                 <span className={!guessedLetters.includes(letter)?"incorrect":null}
    //                     key={index}
    //                 >
    //                     {letter}
    //                 </span>
    //             )
    //         }
    //     else{
    //         return(
    //             <span 
    //                 key={index}
    //             >
    //                 {letter}
    //             </span>
    //         )
    //     }
    // }
        
    // )


    const langs=languages.map((lang, index)=>{

        const isLanguageLost = index < wrongGuessCount
        const className = clsx("chip", isLanguageLost && "lost")
        return (<Language
            key= {index}
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
                disabled={isGameOver || guessedLetters.includes(letter)}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
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
        lost: isGameLost,
        firewell:!isGameOver && isLastGuessIncorrect
    })

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p>
                    {getFarewellText(languages[wrongGuessCount - 1].name)} 
                </p>
            )
        }
        if (isGameWon) {
            return (
                <>
                    <Confetti
                        recycle={false}
                        numberOfPieces={1000}
                    />
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } else if(isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
    }

    function resetGame(){
        setCurrentWord(getRandomWord())
        setguessedLetters([])
    }

    return(
        <>
            <section 
                className={gameStatusClass}
                aria-live="polite" 
                role="status" 
            >
                {renderGameStatus()}
            </section>
            
            <section className="language-chips">
                {langs}
            </section>

            <section className="word">
                {letterElements}   
            </section>

            <section className="keyboard">
                {buttons}
            </section>
            {isGameOver &&
                <section className="new-game" onClick={resetGame}> 
                    <button>New Game</button>
                </section>
            }
            
        </>
    )
}