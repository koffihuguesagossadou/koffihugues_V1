import { SocialMedia } from "./Links";
import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageTransitionContext, PreloaderContext } from "../App";
import { pageAnimation } from "../funcs/app";
import { me } from "../data/me";

export default function Footer() {

    const {showTransition} = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)

    const [getContacts, setContacts] = useState({})

    const locator = useLocation()

    useEffect(()=>{
        

        if(Object.values(getContacts).length === 0)
        {
            
            

                setContacts({...me.contact})
        }


        
        pageAnimation(showTransition, preloaderPerformed, '.f-cp>span')

    }, [showTransition, preloaderPerformed, getContacts])
    
    return(
        <footer>
            <div className="footer-container">
                <div className="footer-text-wrapper">
                    <p className="f-cp">
                        <span>© 2023 - All right reserved.</span>
                    </p>
                    <p className="f-cp">
                        <span>
                            <span>Designed & built by </span> <a href="/" className="koffiHugues">koffihugues.</a> 
                        </span>
                    </p>
                </div>
                <div className="footer-text-wrapper">
                    
                </div>
                <div className="social-media">
                    <SocialMedia
                        name={'email'}
                        href={getContacts.email}
                    />
                    <SocialMedia
                        name={'github'}
                        href={getContacts.github}
                    />
                    <SocialMedia
                        name={'linkedin'}
                        href={getContacts.linkedin}
                    />
                    <SocialMedia
                        name={'instagram'}
                        href={getContacts.instagram}
                    />
                        
                </div>
            </div>
        </footer>
    )
}