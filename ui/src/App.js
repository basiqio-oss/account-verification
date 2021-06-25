import Welcome from './components/Welcome';
import './App.css';
import { getClientToken } from "./clients/authenticationClient"

function App() {
  const refreshToken = async () => {        
    console.log("refreshingToken")
    let token = await getClientToken();
    let parsedToken = JSON.parse(token)
    sessionStorage.setItem("session_token", parsedToken.access_token)
}

// refreshToken()
  window.setInterval(refreshToken, 1800000)

  return (
    <div className="App">
      <p>Account Verification</p>
      <Welcome />
    </div>
  );
}

export default App;
