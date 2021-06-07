import './intro.css';
const intro = ({setisIntro}) => {
    return (
        <div className="container">
            <div className='title'>
                <h2>Welcome to Simple 8's!</h2>
            </div>
            {/* show game rules */}
            <div className="rules">
                <h2>Rules:</h2>
                <ul>
                    <li>You can only play cards with either the same suit, or number as the top card</li>
                    <li>You can  play multiple cards per turn, but they must all be the same number, and one card has to have the same suit as the top card</li>
                    <li>There are NO special cards in this version, ex. 2's are not pick up 2, 8's do not change the suit.</li>
                </ul>
            </div>
            <div className="column2">
                {/* show how to play the game */}
                <div className="howtoplay">            <h2>How to play:</h2>
                    <ul>
                        <li>To play a card or multiple cards from your hand, click the card or cards you want to play, then press the Play Cards button</li>
                        <li>If you cannot play a card, press the draw pile to pick up another card, this ends your turn</li>
                        <li>To play another game, or to reset the game at any point, press the Restart buttom</li>
                        <li>Do not press the Play Cards Button without selecting cards</li>
                        
                    </ul>
                </div>
                <div className="startbutton">
                    <button onClick={()=> setisIntro(false)} >Play</button>
                </div>
            </div>

        </div>



    )
}
export default intro
