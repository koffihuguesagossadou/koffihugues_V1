import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import gsap from "gsap";

export function Home() {

    // useEffect(()=>{
    //     const textReveal = gsap.timeline()

    //    textReveal.from('.hi-texts',{
    //         y: 200
    //    })
       
    // })

    return(
        <>
            <Navbar/>
            <section className="home-section">
                <div className="home-container container">
                    <div className="banner-texts-wrapper">
                        <div className="hi-texts">
                            <span>Hi, </span>
                            <span>I'm Hugo</span>
                        </div>
                        <div className="job-texts-wrapper" id="banner-text">
                            <p className="textReveal">I tranform ideas into</p>
                            <p className="textReveal">captivating web </p>
                            <p className="textReveal">experiences with code.</p>
                             
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