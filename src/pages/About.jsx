import { useEffect,useRef,useContext } from 'react'
import {developerExperience, skills} from '../data/experience'
import { gsapConfig } from '../config/defaults'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap'
import { PageTransitionContext, PreloaderContext } from '../App';
gsap.registerPlugin(ScrollTrigger)


export function About() {

    // const passion = "I love building websites and web applications! It's not just my job; it's my passion. I enjoy creating websites that work smoothly and make people's lives easier.  so I can build better websites and bring cool ideas to reality. I'm always learning and looking for new ways to make websites awesome."
    // const aboutTitleRef = useRef(null)
    const {showTransition} = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)

    const timeline = gsap.timeline()

    const workWithRef = {
        title: useRef(),
        wrapper: useRef(),
        separator: useRef()
    }

    const expsRef = useRef([])
    const skillsRef = useRef([])


    useEffect(()=>{

        if((!showTransition && showTransition !== null) || preloaderPerformed){

            timeline.to(['.fn-letter', 'p>span','div>h3' ,expsRef.current, skillsRef.current], {
                y: '0%',
                duration: gsapConfig.duration,
                ease: gsapConfig.ease,
                stagger:{
                    amount: gsapConfig.staggerAmount
                }
            })
        }

        
    }, [showTransition, preloaderPerformed])

    return(
                

        <section className="a-section">
            <div className="container">
                <div className="name-title">
                    <div className="first-name">
                        {
                            'KOFFI HUGUES'.split('').map((char, i)=>{
                                return (
                                    <span key={i} className='fn-letter'>{char}</span>
                                )
                            })
                        }
                    </div>
                    <div className="last-name">
                        {
                            'AGOSSADOU'.split('').map((char, i)=>{
                                return (
                                    <span key={i} className='fn-letter'>{char}</span>
                                )
                            })
                        }      
                    </div>
                </div>
                <div className="infos-wrapper">
                    <div className="description-wrapper">
                        <div className='description-p'>
                            <p className='job-role'>
                                <span><em>full stack and creative developer</em> from Abidjan (Ivory Coast).</span>
                            </p>
                            <p>
                                <span>
                                    I meet people needs by building interactive and smoothly websites.
                                </span>
                            </p>
                            <p>
                                <span>
                                    I'm multi-skilled and stay updated with the newest web trends.
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="clients-wrapper">
                        <div className="a-block-title">
                            <h3 >I worked with</h3>
                        </div>
                        <div className="a-experiences-wrapper">
                            {
                                developerExperience.map((experience, i)=>{
                                    return(
                                        <div key={i} className="a-experience">
                                            <div className='ae' ref={el => expsRef.current[i] = el}>
                                                <span className='a-company'>{experience.company} -</span>
                                                <span className='a-date'> {experience.startDate} </span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="skills-wrapper">
                        <div className="a-block-title">
                            <h3>Technologies</h3>
                        </div>
                        <div className="a-skills-wrapper">
                            {
                                skills.map((skill, i)=>{
                                    return(
                                        <div  key={i} className="a-skill">
                                            <div ref={el => skillsRef.current[i] = el}>
                                                <span>{ skill }</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
                    
                
    )
}
