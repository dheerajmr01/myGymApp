import { Link } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    
    
    const handleClick = () => { 
        logout();
    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Tracker</h1>
                </Link>
                <nav>
                    {user && (
                    <div>
                        <span>{ user.email }</span>
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/signup">Signup</Link>
                            <Link to="/login">Login</Link>
                        </div>
                    )}    
                </nav>

            </div>
       </header>
   ) 
}

export default Navbar