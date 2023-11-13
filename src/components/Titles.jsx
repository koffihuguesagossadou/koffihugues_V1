import gsap from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from "react"
import { splitWord } from "../funcs/app";
gsap.registerPlugin(ScrollTrigger) 

export function SectionTitle({text, classname, reference}) {

    const titleLetterRefs = useRef([])
    const paragraphRefs = useRef([])
    let iRef = 0;

    useEffect(()=>{

        console.log(titleLetterRefs.current)

        if(titleLetterRefs.current){
        gsap.to(titleLetterRefs.current, {
            scrollTrigger: {
                trigger: reference.current,
                start: "80% bottom",
            },
            y: '0%',
            duration: 1,
            stagger:{
                amount: 1
            }
        });
        }

    })

    return(
        <div className={"section-title "+ classname}>
            <h1 ref={reference}>{
                
                text.split(' ').length > 1 
                
                ? text.split(" ").map((word,i)=>{
                    return (
                        <p ref={ el => paragraphRefs.current[i] = el } key={i} className="title-word">
                            
                            {
                                
                                splitWord(word).map((char, id)=>{
                                    
                                    return(
                                        <span ref={ el => titleLetterRefs.current[i * 1000 + id] = el} className="title-letter" key={id}>{char}</span>
                                    )
                                })
                                
                            }
                        </p>
                    )
                })
                : splitWord(text).map((char, index)=>{
                    return(
                        <p className="title-word">
                            <span className="title-letter" ref={el => titleLetterRefs.current[index] = el} key={i}>{char}</span>
                        </p>
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