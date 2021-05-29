import './play.css'
import { shuffle } from "./shuffle"


import { useState, useEffect } from 'react'
const Play = () => {
    const [mainDeck, drawPile] = useState([]);
    const [hand, sethand] = useState([]);
    const [computerHand, setcomputerHand] = useState([]);
    const [playedDeck, setplayedDeck] = useState([]);

    useEffect(() => {
        //runs on startup only
        //initialize main deck
        let tempDeck = []

        const suits = ["clubs", "spades", "hearts", "diamonds"]
        suits.forEach((suit) => {
            //init the deck
            //Ace = 1
            // 2->10
            //11 = Jack, 12 = Queen, 13 = King 
            for (let i = 1; i < 14; i++) {
                tempDeck.push({
                    suit: suit,
                    number: i
                });
            }
        })


        //shuffle the deck first...
        tempDeck = shuffle(tempDeck)
        console.log(tempDeck)



        //deal hands
        const receiveCards = tempDeck.splice(0, 8)
        const giveCards = tempDeck.splice(0, 8)

        //set hands and drawpile
        sethand(receiveCards)

        setcomputerHand(giveCards)

        drawPile(tempDeck)

        //initialize hand
        //take the cards in the value of 0-7 from the card array and set those as the value for hand 
        //take the cards in the value of 8-15 from the card array and set those as the value for Computerhand
    }, [])

    const playCard=(card)=>{
        console.log('play card', card)
    }

    



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
    return (
        <div>
            <div className='hand'> 
                <div>hand</div>

                <div className='cards'>
                    {hand.map((card,index) => {
                        return (
                            <div className='card' onClick={()=>playCard(card)} key={index}>
                            
                                <img src={'/cards/' + card.number + card.suit.substring(0,1).toUpperCase() + '.svg'}/>
                                
                             
                            </div>

                        )
                    })

                    }
                </div>

            </div>


        </div>
    )
}

export default Play

//GAME LOOP- everything is inside this and it is activated from the play button on the intro screen,
        //at the end if this loop before it repeats, it checks if the active player has 0 cards left, 
        //if they do, they win

//TURN- when the user clicks a card, turn checks if it can be played by comparing it to the top card's value
        //if the card cannot be played, text pop-up saying, you cannot play that card, appears, this
        //will disappear if another card is played that works, or stay if another wrong card is played
        //each turn ends when either correctcard played is true or the draw pile is clicked
        //if the draw pile is clicked, the pop method is used from the cards in the draw pile array and it is
        //added to the hand

        //turn only ends when play cards button is clicked, allowing for mutliple cards to be checked
        //in one turn

        //if computer's turn is true, the program selects a random card from the computer hand array 
        //and loops the check method to check if the card can be played until it reaches the last card 
        //and picks up if needed

        //need a check function that compares card to the topcard
        //need an if statement that checks a turn boolean the determines which player is currently playing
        //need play card button

        //if Check is true after the play card button is clicked, these selected card(s) are moved to 
        //played pile's array

//SPECIAL (within TURN right after CHECK is true)- if a 2 with the matching suit of the top card is played
        //the oposing player gains the top 2 cards, if multiple 2's are played and check is true, multiply
        //2 by the number of 2's played and add that amount of cards from the top of the draw pile to the
        //oposition's hand

        //if an 8 is played (or multiple) the pop-up occurs and gives a choice of suit, this changes the
        //'top card' variable which is normally taking the value from the card, and making the suit take
        //the value from the suit input


//SHUFFLE - if the draw pile runs out, the played card pile leaves the top card and shuffles the rest
        //then it puts this array of cards into the draw pile, a 'shuffling cards' pop up occurs

