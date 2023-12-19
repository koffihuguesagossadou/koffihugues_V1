import { useRef, useEffect, useContext } from "react"
import { pageAnimation, splitWord } from "../funcs/app"
import gsap from "gsap"
import { useLocation } from "react-router-dom"
import { PageTransitionContext, PreloaderContext } from "../App"

export function SocialMedia({name, href}) {

    const {showTransition, } = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)

    const locator = useLocation()
    const noCloneRef = useRef()
    
    useEffect(()=>{

        pageAnimation(showTransition, preloaderPerformed, noCloneRef.current)



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

    const linkWrapperRef = useRef()

    const routeLocation = useLocation()

    useEffect(()=>{

        
        pageAnimation(showTransition, preloaderPerformed, linkWrapperRef.current)


    }, [routeLocation, showTransition, preloaderPerformed])


    return(
        <li className="menu-link">
            <a onClick={handleClick} href={link}>
                <div >
                    <div ref={linkWrapperRef} className="fst-sm">
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

export function ProjectLink({text, link, reference, handleClick}) {


    return(
        <div className="project-links-wrapper">
            <a onClick={handleClick} className="project-link">
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