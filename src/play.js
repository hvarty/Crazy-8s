import './play.css'
import { shuffle } from "./shuffle"


import React, { useState, useEffect } from 'react'
const Play = () => {
    //global const for the draw pile array
    const [mainDeck, setMainDeck] = useState([]);

    //global const for the user hand array
    const [hand, sethand] = useState([]);

    //global const for the computer hand array
    const [computerHand, setcomputerHand] = useState([]);

    //global const for the played pile array
    const [playedDeck, setplayedDeck] = useState([]);

    //global const to hold the boolean of whether or not the cards played are able to played
    const [cardsDontWork, setcardsDontWork] = useState(false);

    //global const to hold a value which relates to whos turn it is
    const [whosTurn, setwhosTurn] = useState(1);//1=player, 2=computer

    //global const for sending strings to output on the screen to notify the user of what is happening
    const [userMessage, setuserMessage] = useState(null);

    // global let that's array changes and hold the value of the top card in the played card pile
    let topCard = null;
    //set top card to the card on the top of the played deck array
    if (playedDeck.length > 0) {
        topCard = playedDeck[playedDeck.length - 1];
    }

    //loop to reset values and arrays for a new game
    const restartGame = () => {

        //runs on startup only
        //initialize main deck
        let tempDeck = []

        const suits = ["clubs", "spades", "hearts", "diamonds"]
        suits.forEach((suit) => {
            //initiate the deck
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

        //shuffle the deck
        tempDeck = shuffle(tempDeck)

        //deal hands
        const receiveCards = tempDeck.splice(0, 8)
        const giveCards = tempDeck.splice(0, 8)

        //start played pile
        const startCard = tempDeck.splice(0, 1)
        setplayedDeck(startCard)



        //set hands and setMainDeck
        sethand(receiveCards)

        setcomputerHand(giveCards)

        setMainDeck(tempDeck)
        //initialize hand
        //take the cards in the value of 0-7 from the card array and set those as the value for hand 
        //take the cards in the value of 8-15 from the card array and set those as the value for Computerhand

    }


    //run on startup
    useEffect(() => {
        restartGame()
    }, [])

    //runs every time the user turn ends and this is where the program goes through all the cards in the-
    //computer hand until it finds one that can be played, other wise it picks up a card from the draw pile
    const computerTurn = (tmpTopCard, mainDeck) => {
        setwhosTurn(2)
        //('Computer\'s turn, it has'+ computerHand.length + 'cards')
        //go through all the cards in computer hand
        //first one that works gets played
        let didTurnWork = false

        //loops through each individual card

        for (let i = 0; i < computerHand.length; i++) {

            const compSelect = [computerHand[i]]

            didTurnWork = doTurn(compSelect, tmpTopCard)

            //checks if the card can be played
            if (didTurnWork === true) {
                //discard played cards
                const tmpComputerHand = computerHand.filter((card, index) => i != index)
                const tmpPlayedCards = [].concat(playedDeck).concat(compSelect)
                //reset values
                setplayedDeck(tmpPlayedCards)
                setcomputerHand(tmpComputerHand)
                setuserMessage('Computer played a card, they have ' + tmpComputerHand.length + ' cards, it is your turn')
                setwhosTurn(1)
                break
            }
        }
        //tells program to pick up a card from main deck and put it in the computer hand array
        if (didTurnWork === false) {
            compPickUpCard()
            setuserMessage('Computer had to pick up a card,  ' + ' it is your turn')
            setwhosTurn(1)
        }
    }

    //user turn, checks for every possibility for the cards to be able to play or not play and continues the turn
    const doTurn = (selectedCards, topCard) => {
        //check if the cards can play
        let canCardsPlay = true
        let sameSuit = false
        let checkCardNumber = -1
        let topCardNum = -1
        let checkSingleCardNum = true
        //if only a single card played, checks if the number is the same
        if (selectedCards.length === 1) {
            topCardNum = topCard.number
            if (topCardNum != selectedCards[0].number) {
                checkSingleCardNum = (false)

            } else {
                canCardsPlay = true


            }
        }
        //check if multiple selected cards contain the correct suit, or if a singular card has the correct suit
        if (selectedCards.length > 1 || checkSingleCardNum === (false)) {
            selectedCards.forEach(card => {
                if (card.suit === topCard.suit) {
                    sameSuit = true

                }
            })

            if (sameSuit === false) {
                setcardsDontWork(true)

                canCardsPlay = false
                return false
            }
        }
        //check if multiple selected cards all have the same number
        if (selectedCards.length > 1) {
            for (let index = 0; index < selectedCards.length; index++) {
                const card = selectedCards[index]
                if (index === 0) {
                    checkCardNumber = card.number
                } else {
                    if (checkCardNumber != card.number) {
                        setcardsDontWork(true)

                        canCardsPlay = false

                        return false
                    } else {
                        canCardsPlay = true
                    }
                }

            }
        }
        return true

    }

    // this is where the program checks if the cards in are selected, and these become the played cards
    //if the cards work, it calls computer turn, otherwise waits for user to pick up  card to call comp turn
    const playCards = () => {
        setwhosTurn(1)
        //('Your turn, you have'+ hand.length + 'cards')
        setuserMessage(null)
        const selectedCards = hand.filter(card => card.selected === true)


        const didTurnWork = doTurn(selectedCards, topCard)


        if (didTurnWork) {
            //discard played cards
            const tmpHand = hand.filter(card => card.selected != true)
            const tmpPlayedCards = [].concat(playedDeck).concat(selectedCards)
            setplayedDeck(tmpPlayedCards)
            sethand(tmpHand)

            const tmpTopCard = tmpPlayedCards[tmpPlayedCards.length - 1]


            //computer turn

            setuserMessage('Computer is playing...')
            //pause for half second before calling computer turn
            setTimeout(() => {
                computerTurn(tmpTopCard, mainDeck)
            }, 800);

        } else {
            setuserMessage('Card(s) DO NOT work, pick up a card')

        }


    }


    //this is where the program takes the top card off the main deck and puts it in the computer hand array
    const compPickUpCard = () => {

        //create copies of arrays
        const tmpCompHand = [].concat(computerHand)
        const tmpDeck = [].concat(mainDeck)

        //take the card off the deck
        const [newCard] = tmpDeck.splice(0, 1)

        //add the card to the hand
        tmpCompHand.push(newCard)

        //reset the state
        setcomputerHand(tmpCompHand)
        setMainDeck(tmpDeck)
    }
    //same as comp pick up card, but instead, on click of the main deck, places the 1st card in the hand array
    const pickUpCard = () => {


        //create copies of our arrays from state so we can update them
        const tmpHand = [].concat(hand)
        const tmpDeck = [].concat(mainDeck)




        //take the card off the deck
        const [newCard] = tmpDeck.splice(0, 1)

        //add the card to the hand
        tmpHand.push(newCard)

        //reset the state
        sethand(tmpHand)
        setMainDeck(tmpDeck)



        setuserMessage('It is the computer\'s turn')
        setTimeout(() => {
            computerTurn(topCard, tmpDeck)
        }, 800);

    }

    //if a card is clicked it becomes selected
    const selectCard = (card) => {
        if (card.selected === true) {
            card.selected = false

        } else {
            card.selected = true
        }

        const tmpHand = [].concat(hand)

        sethand(tmpHand)
    }



    //check for winner of game 
    if (hand.length === 0) {

        return ( //user won
            <div>
                <div>You won, GAME OVER, press restart to play again</div>
                <div className='restartbutton'>
                    <button onClick={() => restartGame()} >Restart</button>
                </div>
            </div>
        )
    } else if (computerHand.length === 0) {

        return ( //computer won
            <div>
                <div>You lost, Computer Won, GAME OVER, press restart to play again</div>
                <div className='restartbutton'>
                    <button onClick={() => restartGame()} >Restart</button>
                </div>
            </div>
        )

    }




    return (
        <div>
            {/* //show the computer's hand */}
            <h3>COMPUTER HAND</h3>
            <div className='cards'>
                {computerHand.map((card, index) => {
                    return (
                        <div className={'computer card'} key={index}>

                            <img src={'/cards/' + 'anotherback.svg'} />


                        </div>

                    )
                })

                }
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: "20px" }}>
                    {/* //show the back of the draw pile cards */}
                    <h3>DRAW PILE ⬇️</h3>
                    <div className='setMainDeck'>
                        <div className='card' onClick={() => pickUpCard()}>

                            <img src='/cards/back.svg' />

                        </div>
                    </div>
                </div>
                <div style={{ marginRight: "20px" }}>
                    {/* //show top card of the played pile */}
                    <h3>TOP CARD ⬇️</h3>
                    <div className='topcard card'>
                        {topCard != null &&
                            <img src={'/cards/' + topCard.number + topCard.suit.substring(0, 1).toUpperCase() + '.svg'} />
                        }
                    </div>
                </div>
                <div style={{margin: "auto"}}>
                    <div className='user-message'>{userMessage}</div>
                    <div className='show-turn'>{
                        whosTurn === 1
                            ? 'It is your turn, you have ' + hand.length + ' cards'
                            : 'It is the computer\'s turn, it has ' + computerHand.length + ' cards'

                    }</div>
                    {/* //play cards button */}
                    <div className='playbutton'>
                        <button onClick={() => playCards()} >Play Card(s)</button>
                    </div>
                    {/* //restart game button */}
                    <div className='restartbutton'>
                        <button onClick={() => restartGame()} >Restart</button>
                    </div>
                </div>
            </div>

                {/* show the cards in the user's hand array */}
                <h3>YOUR HAND</h3>
                <div className='cards'>
                    {hand.map((card, index) => {
                        return (
                            <div className={'card ' + (card.selected === true ? 'selected' : '')} onClick={() => selectCard(card)} key={index}>

                                <img src={'/cards/' + card.number + card.suit.substring(0, 1).toUpperCase() + '.svg'} />

                            </div>
                        )
                    })
                    }
                </div>

            </div>

        
    )
}

export default Play

