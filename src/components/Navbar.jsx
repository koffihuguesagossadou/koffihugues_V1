import { useState, useEffect,useCallback, useRef } from "react"
import { MenuLink } from "./Links";
import { useContext } from "react";
import { PageTransitionContext, PreloaderContext } from "../App";
import { useLocation, Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { pageAnimation } from "../funcs/app";


function Navbar() {



    const {showTransition, setShowTransition} = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)

    const [currentHour, setCurrentHour] = useState(0);
    const [currentMinute, setCurrentMinute] = useState(0);
    const [currentSecond, setCurrentSecond] = useState(0)

    const localTimeRef = useRef()

    const routeLocation = useLocation()
    const navigate = useNavigate()



    
    const asyncHandleClickedLink = useCallback((e, location)=>{
        
        e.preventDefault()
        setShowTransition(true)
        setTimeout(()=>{
            navigate(location)
        }, 1500)

    })
      
    useEffect(()=>{

        const target = localTimeRef.current
        pageAnimation(showTransition, preloaderPerformed, target)

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

    }, [routeLocation, showTransition, preloaderPerformed])



    return(
        <nav className='navbar'>
            <div className="menu-wrapper">
                
                {
                    routeLocation.pathname !== '/'
                    ? 
                        <div className="go-back-wrapper">
                            <a
                                href="/"
                                onClick={(e)=>asyncHandleClickedLink(e, '/')} 
                            >
                                <GoArrowLeft />
                            </a>
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
                                <div ref={localTimeRef}>
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
                            handleClick={(e)=>asyncHandleClickedLink(e, '/about')}
                        />

                        <MenuLink
                            name='archives'
                            revealText='archives'
                            link='archives'
                            handleClick={(e)=>asyncHandleClickedLink(e, '/archives')}
                        />
                        
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;