import Footer from "../../components/footer/Footer";
import {Link} from "react-router-dom";
import BannerImage from '../homepage/pizzaBackground.jpeg';
import './Homepage.css';

/**
 *Komponens a Pizza Váltó weboldal főoldalának megjelenítéséhez.
 *@function
 *@returns {JSX.Element} A megjelenített komponens.
 */
export default function Homepage() {
  return (
      <>
    <div className="home" style={{backgroundImage: `url(${BannerImage})`}}>
      <div className="headerContainer" >
       <h1>Pizza Váltó</h1>
          <p>BEST PIZZA IN THE CITY</p>
          <Link to="menu"><button className="Button">Rendelj most!</button>
          </Link>
      </div>
    </div>
          <Footer /> {/*Lábléc meghívása*/}
      </>
  );
}
