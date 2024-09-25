import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Customers from "./components/Customers";

const Home = () => (
  <div>
  <h1 className='header'>Welcome to DogCare!</h1>
  <Link to="/customers" className='customer-link' >
    Check out our Customers
   </Link>
   </div>
);

function main() {
  

  return (
    <div>
    <h1 className='header'>Welcome to DogCare!</h1>
    <Link to="/Customers">Go to customers</Link>
    </div>
    // <>
      
    //   <Router>
    //     <Routes>
    //       <Route exact path="/" element={<Home />} />
    //       <Route 
    //         exact path="/customers" element={<Customers />} />
    //     </Routes>
    //   </Router>
    // </>
  );
}

export default main
