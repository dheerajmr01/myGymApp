import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";

//pages and components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  const { user } = useAuthContext();
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element= {!user ? <Signup/>: <Navigate to="/" />}
            />
            <Route
              path="/login"
              element= {!user ? <Login/> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
