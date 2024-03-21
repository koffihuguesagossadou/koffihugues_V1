import { useState, useEffect,useCallback, useRef } from "react"
import { MenuLink } from "./Links";
import { useContext } from "react";
import { PageTransitionContext, PreloaderContext } from "../App";
import { useLocation, Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import BrandSvg from "../svgs/Brand";
import { gsapConfig } from "../config/defaults";


function Navbar() {



    const {showTransition, setShowTransition} = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)

    const [currentHour, setCurrentHour] = useState(0);
    const [currentMinute, setCurrentMinute] = useState(0);
    const [currentSecond, setCurrentSecond] = useState(0)

    const localTimeRef = useRef()
    const localAddressRef = useRef()

    const routeLocation = useLocation()
    const navigate = useNavigate()



    
    const asyncHandleClickedLink = useCallback((e, location)=>{
        
        e.preventDefault()
        setShowTransition(true)
        setTimeout(()=>{
            navigate(location)
        }, 1000)

    })
      
    useEffect(()=>{

        const target = [localAddressRef.current, localTimeRef.current]

        if( ((!showTransition && showTransition !== null ) || preloaderPerformed) && (localAddressRef.current && localTimeRef.current)) {

            gsap.to(target,{
                y: '0%',
                ease: gsapConfig.ease,
                duration: gsapConfig.duration
                
            })
        }



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
                                <span>Back</span>
                            </a>
                        </div>

                    :<>
                    
                        <div className="brand-wrapper">
                            <a href="/" className="typo-brand">
                                <BrandSvg />
                            </a>
                        </div>

                        <div className="address-wrapper"> 
                            <div className="local-address-wrapper">
                                <div ref={localAddressRef}>
                                    <span className="al-text">
                                        5° 23′ 40″ 
                                    </span>
                                    <span className="al-text">
                                        4° 03′ 07″
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="availability-wrapper">
                            
                            <div className="local-time-wrapper">
                                <div ref={localTimeRef}>
                                    <span className="al-text">
                                        {currentHour.toString().length === 2 ? currentHour : '0'+currentHour}
                                        :{currentMinute.toString().length === 2 ? currentMinute : '0'+currentMinute}
                                    </span>
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