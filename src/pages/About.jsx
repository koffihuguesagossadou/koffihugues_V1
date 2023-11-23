import { useEffect,useRef } from 'react'
import {developerExperience, skills} from '../data/experience'
import { splitWord } from '../funcs/app'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap'
gsap.registerPlugin(ScrollTrigger)


export function About() {

    // const passion = "I love building websites and web applications! It's not just my job; it's my passion. I enjoy creating websites that work smoothly and make people's lives easier.  so I can build better websites and bring cool ideas to reality. I'm always learning and looking for new ways to make websites awesome."
    // const aboutTitleRef = useRef(null)
    const timeline = gsap.timeline()

    const workWithRef = {
        title: useRef(),
        wrapper: useRef(),
        separator: useRef()
    }

    const refKeys = [
        'description',
        'workWithTitle',
        'workWithTitleWrapper',
        'workWithSeparator',
        'skillsTitle',
        'skillsWrapper',
        'skillsSeparator',
        // Add more keys as needed
      ];
    
      const refs = refKeys.reduce((acc, key) => {
        acc[key] = useRef(null);
        return acc;
      }, {});

    useEffect(()=>{


        timeline.to('.a-text',{
            y: '0%',
            duration: 3,
            ease: 'power4.out',
            stagger:{
                amount: .2
            }
        })

        // description animations
        if (refs.description.current) {

            gsap.to(refs.description.current, {
                scrollTrigger:{
                    trigger: refs.description.current,
                    start: "20% bottom"
                },
                opacity: 1,
                duration: 3,
                ease: 'power4.out'
            })
        }

        // skills animation        
        if(refs.skillsTitle.current){
            gsap.to(refs.skillsTitle.current, {
                scrollTrigger:{
                    trigger: refs.skillsWrapper.current
                },
                opacity: 1,
                y: '0%',
                duration: 2,
                ease: 'power4.out'
            })
        }

        if(refs.skillsSeparator.current){
            gsap.to(refs.skillsSeparator.current, {
                scrollTrigger:{
                    trigger: refs.skillsWrapper.current,
                },
                width: '100%',
                duration: 3,
                ease: 'power4.out'
            })
        }
        

        // experiences animation
        if(refs.workWithTitle.current){
            gsap.to(refs.workWithTitle.current, {
                scrollTrigger:{
                    trigger: refs.workWithTitleWrapper.current
                },
                opacity: 1,
                y: '0%',
                duration: 1,
                ease: 'power4.out'
            })
        }

        if(refs.workWithSeparator.current){
            gsap.to(refs.workWithSeparator.current, {
                scrollTrigger:{
                    trigger: refs.workWithTitleWrapper.current,
                },
                width: '100%',
                duration: 3,
                ease: 'power4.out'
            })
        }
        console.log(refs.description.current)
    }, [])

    return(
        <div className="a-about-wrapper">
            <div className="container">

                <section className="title-section">
                    <div className="a-big-title">
                        <div className="a-title-text-wrapper">
                            <p data-about-text='MORE' className='a-text'>MORE</p>
                        </div>
                        <div className="a-title-text-wrapper">
                            <p data-about-text='ABOUT ME' className='a-text'>ABOUT ME</p>
                        </div>
                    </div>
                </section>
                <section className="a-description-section">
                    <div className="description-wrapper">
                        <p ref={refs.description} className='description-p'>
                            My name is Agossadou Koffi Hugues <span></span> <em>full stack and creative developer</em> (I just start it).
                            My job is to meet people needs by building interactive and smoothly websites.
                            I'm multi-skilled and stay updated with the newest web trends and tech.
                            Originally from Abidjan (Ivory Coast) I studied at Iua where I got my bachelor on computer science. 
                            I’m able to work alone on projects as well as in a team if it’s needed.
                            When I’m not at the computer, I’m usually reading mangas, watching animes or playing guitar.
                        </p>
                    </div>
                </section>
                <section className='a-skills-section' >
                    <span ref={refs.skillsSeparator} className='separator'></span>
                    <div ref={refs.skillsWrapper} className="a-section-title">
                        <h1  ref={refs.skillsTitle}>Technologies I <i>use</i></h1>
                    </div>
                    <div className="a-skills-wrapper">
                        {
                            skills.map((skill, i)=>{
                                return(
                                    <div key={i} className="a-skill">
                                        <span>{ skill }</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                <section className='a-experience-with' >
                    <span ref={refs.workWithSeparator} className='separator'></span>
                    <div ref={refs.workWithTitleWrapper} className="a-section-title">
                        <h1 ref={refs.workWithTitle} >I worked <em>with</em></h1>
                    </div>
                    <div className="a-experiences-wrapper">
                        {
                            developerExperience.map((experience, i)=>{
                                return(
                                    <div key={i} className="a-experience">
                                        <span className='a-company'>{experience.company} -</span>
                                        <span className='a-role'> {experience.role} - </span>
                                        <span className='a-date'> {experience.startDate} to {experience.endDate==='' ? 'now' : experience.endDate} </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                <section className='a-about-contact'>
                    <div className="a-contact-wrapper">
                        <div className="a-label">
                            <h2>shoot me an email and let's work together</h2>
                        </div>
                        <div className="a-email">
                            <a href="mailto:koffi.agossadou@gmail.fr">koffi.agossadou@gmail.com</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}


export function BriefAbout() {

    const briefLettersRef = useRef([])
    const briefWrapperRef = useRef()

    useEffect(()=>{

        gsap.to(briefLettersRef.current,{
            scrollTrigger:{
                trigger: briefWrapperRef.current,
                start:"10% bottom",
                end: "100%",
                scrub: .03,
            },
            opacity: 1,
            ease: 'power4.out',
            stagger:{
                amount:5,
            }
        })
    }, [])

    const briefContent = `Hello I'm hugo, full stack developer with a taste for creative development. Based in Abidjan, Côte D'Ivoire, I built interactive interfaces from my 2 years of experience.`
    return(
        <section className="brief-about-section">
            <div className="container">
                <div ref={briefWrapperRef} className="brief-about-wrapper">
                    <p>
                        {
                            splitWord(briefContent).map((char, i)=>{
                                return(
                                    <span ref={el => briefLettersRef.current[i] = el} className='brief-about-letter' key={i}>{char}</span>
                                )
                            })
                        }
                    </p>
                </div>
            </div>
        </section>
    )
}