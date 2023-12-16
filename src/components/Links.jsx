import { useRef, useEffect, useContext } from "react"
import { splitWord } from "../funcs/app"
import gsap from "gsap"
import { Link, useLocation } from "react-router-dom"
import { gsapConfig } from "../config/defaults"
import { PageTransitionContext, PreloaderContext } from "../App"

export function SocialMedia({name, href}) {

    const {showTransition, } = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)

    const timeline = gsap.timeline()
    const locator = useLocation()
    const noCloneRef = useRef()
    
    useEffect(()=>{

        if((!showTransition && showTransition !== null) || preloaderPerformed){

            timeline.to('.fst-smm',{
                y: '0%',
                duration: gsapConfig.duration,
                ease: gsapConfig.ease,
                stagger : {
                    amount: gsapConfig.staggerAmount - .2
                }
            })
        }



    },[locator, showTransition, preloaderPerformed])

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


export function MenuLink({name, revealText, link, handleClick, children}){

    const {showTransition, } = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)

    const timeline = gsap.timeline()
    const routeLocation = useLocation()

    useEffect(()=>{

        if((!showTransition && showTransition !== null) || preloaderPerformed){

            timeline.to('.fst-sm',{
                y: '0%',
                duration: gsapConfig.duration,
                ease: gsapConfig.ease,
                stagger:{
                    amount: gsapConfig.staggerAmount - .2
                }
            })
        }


    }, [routeLocation, showTransition, preloaderPerformed])


    return(
        <li className="menu-link">
            <a onClick={handleClick} href={link}>
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

export function ProjectLink({text, url, reference}) {


    return(
        <div className="project-links-wrapper">
            <a className="project-link" href={url}>
                <div>
                    <div ref={reference} className="a-p">
                        {
                            splitWord(text).map((char, i)=>{
                                return (
                                    <span style={{"--index": i}} key={i} className="sm letter">{char === " " ? <pre> </pre> : char}</span>
                                )
                            })
                        }
                    </div>
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