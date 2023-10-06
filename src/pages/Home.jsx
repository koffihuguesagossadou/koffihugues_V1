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
         duration: 1,
         delay: 0.5,
         ease: CustomEase.create("custom", "M0,0 C0,0 0.06766,0.20556 0.1156,0.3378 0.14528,0.41966 0.16191,0.46497 0.19694,0.54329 0.22828,0.61335 0.24767,0.6555 0.28639,0.7196 0.31731,0.77078 0.3403,0.80482 0.38016,0.84659 0.41539,0.8835 0.44588,0.90743 0.48986,0.93276 0.5346,0.95853 0.57099,0.97182 0.62155,0.98561 0.66805,0.99829 0.7012,1.00202 0.75076,1.0039 0.84544,1.0075 1,1 1,1 "),
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