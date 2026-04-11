import ph from "../../../img/ph.png";
import union from "../../../img/union.png";
import { NavLink } from "react-router-dom";

export const Complete = () => {
  const isAuth = !!localStorage.getItem("token");

  return (
    <div>
        <h2 className="complete_main_text">5 minute set-up process</h2>
          <p className='small_text'>
            Just take 5 minutes to fill in some info, choose a killer template, and bam! 
            Your personalized portfolio website is ready.
          </p>
        <div className="complete_container">
            <img src={ph} className="complete_main_img" alt="Portfolio preview"/>
            <div className="complete_container_text">
              <p className='main_text'><img src={union} alt=""/>How It Work</p>
              <h2 className="complete_text">Complete Your Profile</h2>
              <p className='small_text'>
                Just share your details and see your personal portfolio magically appear. 
                Confirm or make any changes you like, and  Grab a special link to share your portfolio with everyone. 
                Boost your online presence the easy way!
              </p>
              <NavLink to={isAuth ? "/portfolio" : "/sign-up"} className="btn">
                {isAuth ? "My Portfolio" : "Complete portfolio"}
              </NavLink>
            </div>
        </div>
    </div>
  )
}
