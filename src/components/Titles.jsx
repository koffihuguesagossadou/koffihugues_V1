import gsap from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from "react"
import { splitWord } from "../funcs/app";
gsap.registerPlugin(ScrollTrigger) 

export function SectionTitle({text, classname, reference}) {

    const titleLetterRefs = useRef([])

    useEffect(()=>{
        gsap.to(titleLetterRefs.current, {
            scrollTrigger: {
                trigger: reference.current,
                start: "80% bottom",
            },
            y: '0%',
            duration: 1,
            stagger:{
                amount: .5
            }
          });
    })

    return(
        <div className={"section-title "+ classname}>
            <h1 ref={reference}>{
                splitWord(text).map((char, i)=>{
                    return(
                        <span className="title-letter" ref={el => titleLetterRefs.current[i] = el} key={i}>{char}</span>
                    )
                })
            }</h1>
        </div>
    )
}

// subtitle
export function Subtitle({text, classname}){
    return(
        <div className={"section-subtitle "+ classname}>
            <h2>{text}</h2>
        </div>
    )
}



//skills

export function Skills({kindaSkills, classname}) {



    return(
        <div className={classname+"-skills"}>
            {
                kindaSkills.map((element, index)=>{
                    return(
                        <span key={index}>{element} <span className="separator-line">—</span> </span>
                    )
                })
            }
        </div>
    )
}