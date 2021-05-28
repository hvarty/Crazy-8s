import { useState, useEffect } from 'react'
const play = () => {
    const [mainDeck, setmainDeck] = useState([]);
    const [hand, sethand] = useState([]);
    const [computerHand, setcomputerHand] = useState([]);
    const [playedDeck, setcomputerHand] = useState([]);
    useEffect(()=>{
        //runs on startup only
        //initialize main deck
        const tempDeck=[]
        for (let i=0;i<52; i++){
            tempDeck.push(i);
        }
        setmainDeck(tempDeck);

        //initialize hand
        //take the cards in the value of 0-7 from the card array and set those as the value for hand 
        //take the cards in the value of 8-15 from the card array and set those as the value for Computerhand

        
    },[])
    //turn method that checks if the card played is allowed and if there is any special thing that needs to happen
    //such as 2 is pick up 2 and 8 is change the suit

    //create an array for player hand, computer hand, draw pile, and played pile
    //every card has the number value, and suit value, only 52 cards total for the entire duration of the game

    //for the hand layout, use a flex that allows the cards to flow from left to right, and stack if thee is no space left,
    //card size stays the same 

    //if you cannot play, press the draw pile to pickup using the pop method from the draw pile array

    //computer turn selects a random card from the computer hand array and loops the turn method to check 
    //if the card can be played until it reaches the last card and picks up if needed
    
    //in turn method if an 8 is played, a pop-up input appears asking for a choice between 4 suits
    //if the computer plays an 8, it selects a suit randomly

    //turn loop checks if the amount value of the hand/computer hand array is 0, meaning they won the game

    //each card array has a position, card number and suit

    const dealACard = () => {
    }
    return(
        <div>play</div>
    )
}
export default play