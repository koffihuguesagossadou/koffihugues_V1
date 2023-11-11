import { SocialMedia } from "./Links";

export function Footer() {
    return(
        <footer>
            <div className="footer-container">
                <div className="footer-text-wrapper">
                    <p>Copyright © 2023 - All right reserved.</p>
                </div>
                <div className="footer-text-wrapper">
                    <p><span>Designed & built by </span> <a href=""><span className="koffiHugues" data-text='koffiHugues.'>AGOSSADOU.</span></a> </p>
                </div>
                <div className="social-media">
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
        </footer>
    )
}