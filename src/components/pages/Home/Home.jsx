import './Home.css';
import header from "../../../img/header.png";
import union from "../../../img/union.png";
import { NavLink } from "react-router-dom";
import { Complete } from './Complete';

export const Home = () => {
  return (
    <div className='header'>
      <div>
        <p className='main_text'><img src={union} alt=''/> Welcome to Creatium</p>
        <h1>
          Your Story, Your Way <br />
          Build Your Personal Portfolio
        </h1>
        <p className='small_text'>Showcase your journey by crafting a personal portfolio in minutes</p>
        <NavLink to="/sign-up" className="btn">Get Started</NavLink>
      </div>
      <img src={header} className='header_img' alt='Portfolio builder preview'/>
      <Complete/>
    </div>
  )
}
