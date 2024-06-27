import PropTypes from 'prop-types';

function UserGreeting(props){
    
const WelcomeMessage = <h2 className="welcome-message">Welcome {props.username}</h2> 
const loginPrompt = <h2 className="login-prompt">Please login to continue</h2>

    return(props.isLoggedIn ? WelcomeMessage : loginPrompt);
}

UserGreeting.proptypes = {
    isLoggedIn : PropTypes.bool,
    username : PropTypes.string,
}

UserGreeting.defaultProps ={
    isLoggedIn : false,
    username : "Guest",
}
export default UserGreeting