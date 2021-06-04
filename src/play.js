import './play.css'
import { shuffle } from "./shuffle"


import React, { useState, useEffect } from 'react'
const Play = () => {
    const [mainDeck, setMainDeck] = useState([]);
    const [hand, sethand] = useState([]);
    const [computerHand, setcomputerHand] = useState([]);
    const [playedDeck, setplayedDeck] = useState([]);
    const [cardsDontWork, setcardsDontWork] = useState(false);
    const [whosTurn, setwhosTurn] = useState(1);//1=player, 2=computer
    const [userMessage, setuserMessage] = useState(null);



    let topCard = null;
    if (playedDeck.length > 0) {
        topCard = playedDeck[playedDeck.length - 1];
    }





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

        //shuffle the deck first...
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

    const computerTurn = (tmpTopCard, mainDeck) => {
        setwhosTurn(2)
        //('Computer\'s turn, it has'+ computerHand.length + 'cards')
        //go through all the cards in computer hand
        //first one that works gets played
        let didTurnWork = false

        console.log('top card', tmpTopCard)
        for (let i = 0; i < computerHand.length; i++) {


            const compSelect = [computerHand[i]]
            console.log('check card', compSelect)
            didTurnWork = doTurn(compSelect, tmpTopCard)

            if (didTurnWork === true) {
                //discard played cards
                const tmpComputerHand = computerHand.filter((card, index) => i != index)
                const tmpPlayedCards = [].concat(playedDeck).concat(compSelect)
                setplayedDeck(tmpPlayedCards)
                setcomputerHand(tmpComputerHand)
                setuserMessage('Computer played a card, they have ' + tmpComputerHand.length + ' it is your turn')
                setwhosTurn(1)
                break

            }

        }
        if (didTurnWork === false) {
            compPickUpCard()
            setuserMessage('Computer had to pick up a card,  ' + (computerHand.length + 1) + ' it is your turn')
            setwhosTurn(1)
        }


    }



    const playCards = () => {
        setwhosTurn(1)
        //('Your turn, you have'+ hand.length + 'cards')
        setuserMessage(null)
        const selectedCards = hand.filter(card => card.selected === true)


        const didTurnWork = doTurn(selectedCards, topCard)
        console.log({ didTurnWork })

        if (didTurnWork) {
            //discard played cards
            const tmpHand = hand.filter(card => card.selected != true)
            const tmpPlayedCards = [].concat(playedDeck).concat(selectedCards)
            setplayedDeck(tmpPlayedCards)
            sethand(tmpHand)

            const tmpTopCard = tmpPlayedCards[tmpPlayedCards.length - 1]


            //computer turn
            console.log('its the computers turn')
            setuserMessage('Computer is playing...')
            //pause for half second before calling computer turn
            setTimeout(() => {
                computerTurn(tmpTopCard, mainDeck)
            }, 800);

        } else {
            setuserMessage('Card(s) dont work, pick up a card')

        }


    }


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
                console.log('the card number is different than top card')
            } else {
                canCardsPlay = true
                console.log('card (singular) works')

            }
        }
        //check if multiple selected cards contain the correct suit, or if a singular card has the correct suit
        if (selectedCards.length > 1 || checkSingleCardNum === (false)) {
            selectedCards.forEach(card => {
                if (card.suit === topCard.suit) {
                    sameSuit = true
                    console.log('cards suit works')
                }
            })

            if (sameSuit === false) {
                setcardsDontWork(true)
                console.log('cards dont work')
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
                        console.log('cards dont work')
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
    const compPickUpCard = () => {

        //create copies of arrays
        const tmpCompHand = [].concat(computerHand)
        const tmpDeck = [].concat(mainDeck)


        console.log("B4", tmpDeck)

        //take the card off the deck
        const [newCard] = tmpDeck.splice(0, 1)

        //add the card to the hand
        tmpCompHand.push(newCard)

        //reset the state
        setcomputerHand(tmpCompHand)
        setMainDeck(tmpDeck)

        console.log("AFTER", tmpDeck)

    }

    const pickUpCard = () => {
        console.log('you picked up a new card')

        //create copies of our arrays from state so we can update them
        const tmpHand = [].concat(hand)
        const tmpDeck = [].concat(mainDeck)

        console.log("B4", tmpDeck)


        //take the card off the deck
        const [newCard] = tmpDeck.splice(0, 1)

        //add the card to the hand
        tmpHand.push(newCard)

        //reset the state
        sethand(tmpHand)
        setMainDeck(tmpDeck)

        console.log("AFTER", tmpDeck)

        setuserMessage('It is the computer\'s turn')
        setTimeout(() => {
            computerTurn(topCard, tmpDeck)
        }, 800);

    }


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

        return (
            <div>
                <div>You won, GAME OVER, press restart to play again</div>
                <div className='restartbutton'>
                    <button onClick={() => restartGame()} >Restart</button>
                </div>
            </div>
        )
    } else if (computerHand.length === 0) {

        return (
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
            <div className='setMainDeck'>
                <div className='card' onClick={() => pickUpCard()}>

                    <img src='/cards/back.svg' />

                </div>
            </div>
            <div className='topcard card'>
                {topCard != null &&
                    <img src={'/cards/' + topCard.number + topCard.suit.substring(0, 1).toUpperCase() + '.svg'} />
                }
            </div>

            <div className='hand'>
                <div className='user-message'>{userMessage}</div>
                <div className='show-turn'>{
                    whosTurn === 1
                        ? 'It is your turn, you have ' + hand.length + ' cards'
                        : 'It is the computer\'s turn, it has ' + computerHand.length + ' cards'

                }</div>

                <div className='playbutton'>
                    <button onClick={() => playCards()} >Play</button>
                </div>
                <div className='restartbutton'>
                    <button onClick={() => restartGame()} >Restart</button>
                </div>

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

                <h3>COMPUTER HAND</h3>
                <div className='cards'>
                    {computerHand.map((card, index) => {
                        return (
                            <div className={'computer card'} key={index}>

                                <img src={'/cards/' + card.number + card.suit.substring(0, 1).toUpperCase() + '.svg'} />


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

