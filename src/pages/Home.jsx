import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import gsap from "gsap";
import { useRef } from "react";
import { CustomEase } from "gsap/all";

export function Home() {

    const tl = useRef()
    
    useEffect(()=>{
        let timeLine = gsap.timeline()

        //home texts animations
        timeLine.fromTo(['.hi-texts span', '.textReveal'],{
             y: 200,
             
        },{
         y: 0,
         duration: 3,
         delay: 1,
         ease: "power4.out",

       })



       // Reset the transform property to translateY(0) after the animation
    }, [])

    return(
        <>
            <Navbar/>
            <section className="home-section">
                <div className="home-container container">
                    <div className="banner-texts-wrapper">
                        <div className="job-texts-wrapper" id="banner-text">
                            <div className="texts-lines">
                                <p className="textReveal">FULL STACK</p>
                            </div>
                            <div className="texts-lines">
                                <p className="textReveal">WEB DEVELOPER</p>
                            </div>
                            <div className="end-text">
                                <div className="spinner-text-wrapper">
                                    <div className="spinner-text">
                                        {
                                            ("SROLL * SCROLL * SCROLL * ").split('').map((char, i)=>{
                                                return(
                                                    <span key={i} style={{transform: `rotate(${i * 14}deg)`}} className="spinner-letter">{char}</span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="brief-wrapper">
                                    <p> Based in abidjan, Côte d'Ivoire </p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="resume-download-btn-wrapper">
                            <a href="" className="btn-primary">Check out my resume</a>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}