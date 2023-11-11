import { useContext } from "react";
import { Footer } from "../components/Footer";
import { SocialMedia } from "../components/Links";
import { SectionTitle } from "../components/Titles";
import { splitWord } from "../funcs/app";
import { CursorContext } from "../App";

export function Contact() {

    const {cursorOnLink, setCursorOnLink} = useContext(CursorContext)


    return(
        <>
            <section className="contact-section">
                <div className="contact-container container">
                    {/* <SectionTitle
                            text={'Get in touch'}
                            classname='contact'
                        /> */}
                    <div className="contact-text-wrapper">
                        <div>
                            <p>Shoot me an email and</p>
                            <p>let's start an epic creative adventure.</p>
                        </div>
                        <a
                            className={`${cursorOnLink === "email" ? 'cursor-none' : ''}`}
                            onMouseEnter={ ()=>{ setCursorOnLink('email') }}
                            onMouseLeave={ ()=> setCursorOnLink(null) }
                            href="mailto:koffi.agossadou@gmail.com">
                            <div>
                    
                                {
                                    splitWord('koffi.agossadou@gmail.com').map((char, i)=>{
                                        return (
                                            <span style={{"--index": i}} key={i} className="sm letter">{char}</span>
                                        )
                                    })
                                }
                            </div>

                        </a>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}