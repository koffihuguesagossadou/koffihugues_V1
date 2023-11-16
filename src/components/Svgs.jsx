import { useEffect } from "react";
import gsap from "gsap";

export function Ellipse({reference}) {

    useEffect(()=>{
        gsap.to(reference.current, {
            duration: 3,
            delay: 2.6,
            strokeDashoffset: 0,
        })
    }, [])

    return(
        <svg width="500" viewBox="0 0 500 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: 26+'vw'}}><path ref={reference} d="M499 90C499 102.021 492.236 113.606 479.706 124.271C467.18 134.932 448.996 144.578 426.438 152.699C381.331 168.937 318.951 179 250 179C181.049 179 118.669 168.937 73.562 152.699C51.0045 144.578 32.8203 134.932 20.2944 124.271C7.76449 113.606 1 102.021 1 90C1 77.9788 7.76449 66.3941 20.2944 55.7295C32.8203 45.0682 51.0045 35.422 73.562 27.3013C118.669 11.0629 181.049 1 250 1C318.951 1 381.331 11.0629 426.438 27.3013C448.996 35.422 467.18 45.0682 479.706 55.7295C492.236 66.3941 499 77.9788 499 90Z" stroke="#b0bde3" ></path></svg>
    ) 
}