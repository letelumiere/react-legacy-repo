import ProfilePic from './assets/profile.png'


function Card(){
    return(
        <div className="card">
            <img className="card-image" src={ProfilePic} alt="profile picture"></img>
            <h2 className="card-title">Bro Code</h2>
            <p className="card-text">I make Youtube Videos and play Video Games</p>
        </div>
    );
}

export default Card