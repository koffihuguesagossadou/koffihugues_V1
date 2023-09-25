import { useEffect } from "react";
import { useState } from "react"
import { FaXTwitter,FaLinkedinIn, FaInstagram } from "react-icons/fa6";


export function Navbar(params) {

    const [menuClicked, setMenuClicked] = useState(0)


    useEffect(() => {
        // Disable scrolling on mount
        if (menuClicked === 1) {
            document.body.style.overflow = 'hidden';
        }

        // Re-enable scrolling on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
      }, [menuClicked]);


    return(
        <nav>
            <div className="brand-wrapper">
                <a href="#" className="typo-brand">
                    koffi<span>Hugues</span>
                </a>
            </div>
            <div className="hamburger-menu-wrapper">
                <div className="lines">
                    <div onClick={(e)=> { menuClicked === 0? setMenuClicked(1) : setMenuClicked(0) }}>
                        <span className={
                            menuClicked === 1?"closeBarRight"
                            : ''
                        }></span>
                        <span 
                            style={menuClicked === 0? {display: 'inline'} : {display:'none'}}
                        ></span>
                        <span className={
                            menuClicked === 1?"closeBarLeft"
                            : ''
                        }></span>
                    </div>
                </div>
            </div>
            <div className={
                    menuClicked === 0 ? 'menu-links-wrapper close-menu'
                    : 'menu-links-wrapper show-menu'}>
                <ul className="menu-links">
                    <li className="menu-link"><a href="">Home</a></li>
                    <li className="menu-link"><a href="">About</a></li>
                    <li className="menu-link"><a href="">Works</a></li>
                    <li className="menu-link"><a href="">Contact</a></li>
                </ul>
                <div className="lang-wrapper">
                    <div className="lang-btn btn-en">
                        <a href="">EN</a>
                    </div>
                    <span></span>
                    <div className="lang-btn btn-fr">
                        <a href="">FR</a>
                    </div>
                </div>
                <div className="social-media-menu">
                   <div className="smm insta"><a href=""><FaInstagram/></a></div>
                   <div className="smm linkedin"><a href=""><FaLinkedinIn/></a></div>
                   <div className="smm x"><a href=""><FaXTwitter/></a></div>
                </div>
            </div>
        </nav>
    )
}