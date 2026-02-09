import { useState } from 'react';
import Login from './components/Login'
import Home from './components/Home'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            {isLoggedIn ? (
                <Home onLogout={() => setIsLoggedIn(false)} />
            ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
            )}
        </>
    )
}

export default App
