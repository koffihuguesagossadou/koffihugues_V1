import { useState, useEffect,useCallback, useRef } from "react"
import gsap from "gsap";
import { MenuLink } from "./Links";
import { useContext } from "react";
import { PageTransitionContext } from "../App";
import { useLocation, Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";



function Navbar() {



    const {showTransition, setShowTransition} = useContext(PageTransitionContext)

    const [currentHour, setCurrentHour] = useState(0);
    const [currentMinute, setCurrentMinute] = useState(0);
    const [currentSecond, setCurrentSecond] = useState(0)
    const timeline = gsap.timeline()
    const routeLocation = useLocation()



    const handleClickedLink = useCallback(()=>{
        
        setShowTransition(true)
    })
      
    useEffect(()=>{

        timeline.to('.al-text',{
            y: '0',
            delay: 2.7,
            duration: 3,
            ease: 'power4.out'
        })


        // Function to update the current time components
        const updateCurrentTime = () => {
            const currentTime = new Date();
            setCurrentHour(currentTime.getUTCHours());
            setCurrentMinute(currentTime.getUTCMinutes());
            setCurrentSecond(currentTime.getUTCSeconds());
            };
    
            // Set up an interval to update the time components every second
            const intervalId = setInterval(updateCurrentTime, 1000);
    
            

        

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [routeLocation])



    return(
        <nav className='navbar'>
            <div className="menu-wrapper">
                
                {
                    routeLocation.pathname !== '/'
                    ? 
                        <div className="go-back-wrapper">
                            <Link
                                to=''
                                onClick={handleClickedLink} 
                            >
                                <GoArrowLeft />
                            </Link>
                        </div>
                    :
                    <>
                    
                        <div className="brand-wrapper">
                            <a href="/"
                                className="typo-brand">
                                AGOSSADOU
                            </a>
                        </div>
                        <div className="availability-wrapper">
                            <div className="local-time-wrapper">
                                <div>
                                    <span className="al-text">abidjan</span>
                                    <span className="al-text">
                                        {currentHour.toString().length === 2 ? currentHour : '0'+currentHour}
                                        :{currentMinute.toString().length === 2 ? currentMinute : '0'+currentMinute}
                                        :{ currentSecond.toString().length === 2? currentSecond : '0'+ currentSecond}
                                    </span>
                                    <span className="al-text">GMT</span>
                                </div>
                            </div>
                        </div>
                    </>
                     
                }
                <div className="menu-links-container">
                    <ul className="menu-lists">
                        <MenuLink
                            name='about'
                            revealText='about'
                            link='about'
                            handleClick={handleClickedLink}
                        />

                        <MenuLink
                            name='archives'
                            revealText='archives'
                            link='archives'
                            handleClick={handleClickedLink}
                        />
                        
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;