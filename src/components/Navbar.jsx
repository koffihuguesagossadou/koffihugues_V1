import { useState, useEffect,useCallback, useRef } from "react"
import { splitWord } from "../funcs/app";
import gsap from "gsap";
import { MenuLink, SocialMedia } from "./Links";
import { useContext } from "react";
import { PageTransitionContext } from "../App";



export function Navbar() {



    const {showTransition, setShowTransition} = useContext(PageTransitionContext)

    const [menuClicked, setMenuClicked] = useState(false)
    const [isSticky, setIsSticky] = useState(false);
    const [hoverSocialMedia, setHoverSocialMedia] = useState(false)
    const menuRef = useRef()

    const stickyNavbarHandle = useCallback(() => {
        if (window.scrollY > 0) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    }, [isSticky])


      

    useEffect(() => {

        window.addEventListener('scroll', stickyNavbarHandle);

        const tl = gsap.timeline()

        menuClicked

        ? tl.to(menuRef.current, {
            x: '0%',
            delay: .5
        })

        : tl.to(menuRef.current, {
            x: '100%',
            delay: 1,
        })

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', stickyNavbarHandle);
        };

    }, [menuClicked]);


    // useEffect(()=>{

    //     menuClicked === 0 ? setShowTransition(false) : setShowTransition(true)

    // }, [menuClicked])



    return(
        <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
            <div className="menu-wrapper">
                <div className="brand-wrapper">
                    <a href="#" className="typo-brand">
                        AGOSSADOU
                    </a>
                </div>
                <div className="hamburger-menu-wrapper">
                    <div className="lines">
                        <div 
                            onClick={(e)=> { 
                                setMenuClicked(!menuClicked) 
                                setShowTransition(true)
                            }}>
                            <span className={
                                menuClicked ?"closeBarRight"
                                : ''
                            }></span>
                            <span className={
                                menuClicked ? "closeBarLeft"
                                : ''
                            }></span>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={menuRef} className='menu-links-wrapper'>
                <div className="ml-container">
                    <ul className="menu-links">
                        
                        <MenuLink
                            name={'About'}
                            revealText={'About'}
                        />
                        <MenuLink
                            name={'archives'}
                            revealText={'Archives'}
                        />
                        <MenuLink
                            name={'Contact'}
                            revealText={'Contact'}
                        />
                    </ul>
                </div>
                
                <div className="extras">
                    {/* <div className="lang-wrapper">
                        <div className="lang-btn btn-en">
                            <a className="en default-lang" href="">EN</a>
                        </div>
                        <span></span>
                        <div className="lang-btn btn-fr">
                            <a className="fr" href="">FR</a>
                        </div>
                    </div> */}
                    <div className="social-media-menu">
                        <SocialMedia
                            name={'linkedin'}
                        />
                        <SocialMedia
                            name={'instagram'}
                        />
                        <SocialMedia
                            name={'github'}
                        />
                        
                    </div>
                </div>
            </div>
        </nav>

    )
}