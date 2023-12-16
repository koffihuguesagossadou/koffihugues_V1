import { SocialMedia } from "./Links";
import { useEffect, useContext } from "react";
import gsap from 'gsap'
import { useLocation } from "react-router-dom";
import { gsapConfig } from "../config/defaults";
import { PageTransitionContext, PreloaderContext } from "../App";

export default function Footer() {

    const {showTransition} = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)

    const timeline = gsap.timeline()
    const locator = useLocation()

    useEffect(()=>{
        if((!showTransition && showTransition !== null) || preloaderPerformed)
        {
            timeline.to('.f-cp>span',{
                y: '0%',
                ease: gsapConfig.ease,
                duration: gsapConfig.duration,
                stagger:{
                    amount: gsapConfig.staggerAmount
                }
            })

        }
    }, [showTransition, preloaderPerformed])
    
    return(
        <footer>
            <div className="footer-container">
                <div className="footer-text-wrapper">
                    <p className="f-cp">
                        <span>© 2023 - All right reserved.</span>
                    </p>
                    <p className="f-cp">
                        <span>
                            <span>Designed & built by </span> <a href="/" className="koffiHugues">AGOSSADOU.</a> 
                        </span>
                    </p>
                </div>
                <div className="footer-text-wrapper">
                    
                </div>
                <div className="social-media">
                    <SocialMedia
                        name={'email'}
                        href='koffi.agossadou@gmail.com'
                    />
                    <SocialMedia
                        name={'github'}
                        href='https://github.com/koffihuguesagossadou'
                    />
                    <SocialMedia
                        name={'linkedin'}
                        href='www.linkedin.com/in/koffi-hugues-agossadou-2220051b7'
                    />
                    <SocialMedia
                        name={'instagram'}
                        href='https://www.instagram.com/_thisishugo/'
                    />
                        
                </div>
            </div>
        </footer>
    )
}