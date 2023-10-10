import { SectionTitle } from "../components/Titles";

export function Contact() {
    return(
        <section className="contact-section">
            <div className="contact-container container">
                {/* <SectionTitle
                        text={'Get in touch'}
                        classname='contact'
                    /> */}
                <div className="contact-text-wrapper">
                    <div>
                        <p>Shoot me an email to</p>
                    </div>
                    <a href="mailto:koffi.agossadou@gmail.com">
                        <span data-text='koffi.agossadou@gmail.com' className="contact-email">koffi.agossadou@gmail.com</span>
                    </a>
                    <div>
                        <p>and let's start an epic creative adventure.</p>
                    </div>
                </div>
            </div>
            <footer>
                <div className="footer-container">
                    <div className="footer-text-wrapper">
                        <p><span>Design and built by </span> <a href=""><span className="koffiHugues" data-text='koffiHugues.'>koffiHugues.</span></a> </p>
                        <p>Copyright© 2023 - All right reserved.</p>
                    </div>
                    <div className="social-media">
                        <a href="" >
                            <span data-text='Linkedin' className="linkedin">Linkedin</span>
                        </a>
                        <a href="">
                            <span data-text='Instagram' className="instagram">
                                Instagram
                            </span>
                        </a>
                        <a href="">
                            <span data-text='Github' className="github">
                                Github
                            </span>
                        </a>
                    </div>
                </div>
            </footer>
        </section>
    )
}