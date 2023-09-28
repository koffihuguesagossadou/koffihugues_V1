import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import gsap from "gsap";
import { useRef } from "react";

export function Home() {

    const tl = useRef()
    
    useEffect(()=>{
        let timeLine = gsap.timeline()

        //hi gsap animated
        timeLine.fromTo(['.hi-texts span', '.textReveal'],{
             y: 100,
             
        },{
         y: 0,
         duration: 1.8,
         delay: 0.5,
         ease: 'power4.out',
        stagger:{
            amount: 1
        }
       })



       // Reset the transform property to translateY(0) after the animation
    }, [])

    return(
        <>
            <Navbar/>
            <section className="home-section">
                <div className="home-container container">
                    <div className="banner-texts-wrapper">
                        <div className="hi-texts" ref={tl}>
                            <span>Hi, </span>
                            <span>I'm Hugo</span>
                        </div>
                        <div className="job-texts-wrapper" id="banner-text">
                            <div className="texts-lines">
                                <p className="textReveal">I tranform ideas into</p>
                            </div>
                            <div className="texts-lines">
                                <p className="textReveal">captivating web </p>
                            </div>
                            <div className="texts-lines">
                                <p className="textReveal">experiences with code.</p>
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