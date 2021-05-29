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

