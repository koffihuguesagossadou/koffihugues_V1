import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import gsap from "gsap";
import { useRef } from "react";
import { Ellipse } from "../components/Svgs";

export function Home() {

    const drogbaRef = useRef()
    const ellipseRef = useRef()
    const affwRef = useRef()
    const localTimeRef = useRef()
    const [currentHour, setCurrentHour] = useState(0);
    const [currentMinute, setCurrentMinute] = useState(0);
    const [currentSecond, setCurrentSecond] = useState(0);



    useEffect(() => {
        // Function to update the current time components
        const updateCurrentTime = () => {
        const currentTime = new Date();
        setCurrentHour(currentTime.getUTCHours());
        setCurrentMinute(currentTime.getUTCMinutes());
        setCurrentSecond(currentTime.getUTCSeconds());
        };

        // Set up an interval to update the time components every second
        const intervalId = setInterval(updateCurrentTime, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);
    
    
    useEffect(()=>{


        let timeLine = gsap.timeline()

        //home texts animations
            
        timeLine.to('.textReveal',{
            y: 0,
            duration: 3,
            ease: "power4.out",
            stagger :{
            amount: .5
            }

        })
        
        if (drogbaRef.current) {
            timeLine.to(drogbaRef.current,{
                y: 0,
                duration: 3,
                delay: -2.7,
                ease: "power4.out",
            })
        }

        if (affwRef.current && localTimeRef.current) {
            timeLine.to([affwRef.current, localTimeRef.current],{
                y: 0,
                duration: 3,
                delay: -3.3,
                ease: "power4.out",
            })
        }


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
                                <p data-banner-text="FULL STACK" className="textReveal">FULL STACK</p>
                                <div className="and-endpoint">
                                    <Ellipse
                                        reference={ellipseRef}
                                    />
                                    <span>and</span>
                                </div>
                            </div>
                            <div className="texts-lines">
                                <div className="meta-informations">
                                    <div className="affw-wrapper">
                                        <span ref={affwRef} className="affw">available for freelance work</span>
                                    </div>
                                    <div className="local-time-wrapper">
                                        <div ref={localTimeRef}>
                                            <span>abidjan</span>
                                            <span>
                                                {currentHour.toString().length === 2 ? currentHour : '0'+currentHour}
                                                :{currentMinute.toString().length === 2 ? currentMinute : '0'+currentMinute}
                                                :{ currentSecond.toString().length === 2? currentSecond : '0'+ currentSecond} GMT
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p data-banner-text="CREATIVE DEV" className="textReveal">CREATIVE DEV</p>
                            </div>
                            <div className="texts-lines">
                                <div className="banner-gif">
                                    <span>
                                        <img loading="lazy" ref={drogbaRef} src="/gifs/drogba-champions.gif"></img>
                                    </span>
                                </div>
                                <p data-banner-text="FROM ABIDJAN" className="textReveal">FROM ABIDJAN.</p>
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