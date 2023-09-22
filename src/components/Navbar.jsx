

export function Navbar(params) {
    return(
        <nav>
            <div className="brand-wrapper">
                <a href="#" className="typo-brand">
                    koffi<span>Hugues</span>
                </a>
            </div>
            <div className="hamburger-menu-wrapper">
                <div className="lines">
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    
                </div>
                <div className="menu-links-wrapper">
                    <ul className="menu-links">
                        <li className="menu-link"><a href="">Home</a></li>
                        <li className="menu-link"><a href="">About</a></li>
                        <li className="menu-link"><a href="">Works</a></li>
                        <li className="menu-link"><a href="">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}