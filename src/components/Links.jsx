import { useRef, useEffect } from "react"
import { splitWord } from "../funcs/app"
import gsap from "gsap"
import { Link, useLocation } from "react-router-dom"

export function SocialMedia({name, href}) {

    const timeline = gsap.timeline()
    const locator = useLocation()
    const noCloneRef = useRef()
    
    useEffect(()=>{
        timeline.to('.fst-smm',{
            y: '0%',
            delay: 2.7,
            duration: 3,
            ease: 'power4.out',
            stagger : {
                amount: .3
            }
        })
    },[locator])

    return(
        <div className={`smm ${name}`}>
            <a href={name === 'email' 
                ? `mailto:${href}`
                : href
            }>
                <div>
                    <div ref={noCloneRef} className="fst-smm">

                        {
                            splitWord(name).map((char, i)=>{
                                return (
                                    
                                    <span style={{"--index": i}} key={i} className="sm letter">{char}</span>
                                )
                            })
                        }
                    </div>
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


export function MenuLink({name, revealText, link, handleClick}){

    const timeline = gsap.timeline()
    const routeLocation = useLocation()

    useEffect(()=>{

        timeline.to('.fst-sm',{
            y: '0%',
            delay: 2.7,
            duration: 3,
            ease: 'power4.out',
            stagger:{
                amount:.3
            }
        })

    }, [routeLocation])


    return(
        <li className="menu-link">
            <Link onClick={handleClick} to={link}>
                <div >
                    <div className="fst-sm">
                        {
                            splitWord(name).map((char, i)=>{
                                return (
                                    <span style={{"--index": i}} key={i} className="sm-letter">{char}</span>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="menu-clone">
                    {
                        splitWord(revealText).map((char, i)=>{
                            return (
                                <span style={{"--index": i}} key={i} className="sm letter clone">{char}</span>
                            )
                        })
                    }
                </div>
            </Link>
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