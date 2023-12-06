import { SocialMedia } from "./Links";
import { useEffect } from "react";
import gsap from 'gsap'
import { useLocation } from "react-router-dom";

export default function Footer() {

    const timeline = gsap.timeline()
    const locator = useLocation()

    useEffect(()=>{
        timeline.to('.f-cp>span',{
            y: '0%',
            ease: 'power4.out',
            duration: 3,
            delay: 2.7,
            stagger:{
                amount: .3
            }
        })
    }, [])
    
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