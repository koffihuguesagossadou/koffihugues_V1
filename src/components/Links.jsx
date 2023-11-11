import { useRef } from "react"
import { splitWord } from "../funcs/app"
import gsap from "gsap"

export function SocialMedia({name}) {



    return(
        <div className={`smm ${name}`}>
            <a href="">
                <div>
                    
                    {
                        splitWord(name).map((char, i)=>{
                            return (
                                <span style={{"--index": i}} key={i} className="sm letter">{char}</span>
                            )
                        })
                    }
                </div>

                <div className="sm-clone">
                    {
                        splitWord(name).map((char, i)=>{
                            return (
                                <span style={{"--index": i}} key={i} className="sm letter">{char}</span>
                            )
                        })
                    }
                </div>
            </a>
        </div>
    )
}


export function MenuLink({name, revealText}){



    return(
        <li className="menu-link">
            <a href="">
                <div>
                    
                    {
                        splitWord(name).map((char, i)=>{
                            return (
                                <span style={{"--index": i}} key={i} className="sm letter">{char}</span>
                            )
                        })
                    }
                </div>

                <div className="menu-clone">
                    {
                        splitWord(revealText).map((char, i)=>{
                            return (
                                <span style={{"--index": i}} key={i} className="sm letter">{char}</span>
                            )
                        })
                    }
                </div>
            </a>
        </li>
    )
}

export function DefaultLink({text, url}) {
    
    return(
        <a className="defaul-link" href={url}>
            <div>
                
                {
                    splitWord(text).map((char, i)=>{
                        return (
                            <span style={{"--index": i}} key={i} className="sm letter">{char}</span>
                        )
                    })
                }
            </div>

            <div className="default-link-clone">
                {
                    splitWord(text).map((char, i)=>{
                        return (
                            <span style={{"--index": i}} key={i} className="sm letter">{char}</span>
                        )
                    })
                }
            </div>
        </a>
    )
}

export function ProjectLink({text, url}) {


    return(
        <div className="project-links-wrapper">
            <a className="project-link" href={url}>
                <div>
                    
                    {
                        splitWord(text).map((char, i)=>{
                            return (
                                <span style={{"--index": i}} key={i} className="sm letter">{char === " " ? <pre> </pre> : char}</span>
                            )
                        })
                    }
                </div>

                <div className="project-link-clone">
                    {
                        splitWord(text).map((char, i)=>{
                            return (
                                <span style={{"--index": i}} key={i} className="sm letter">{char === " " ? <pre> </pre> : char}</span>
                            )
                        })
                    }
                </div>
            </a>
        </div>
    )
}