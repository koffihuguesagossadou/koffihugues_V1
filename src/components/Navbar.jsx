

export function Navbar(params) {
    return(
        <nav>
            <div className="brand-wrapper">
                <p>
                    koffi<span>hugues</span>
                </p>
            </div>
            <div className="hamburger-menu-wrapper">
                <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
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