import { useEffect,useRef } from 'react'
import avatar from '../assets/avatar.png'
import { Experience } from '../components/Experience'
import { SectionTitle, Skills, Subtitle } from '../components/Titles'
import {developerExperience, skills} from '../data/experience'
import { splitWord } from '../funcs/app'
import gsap from 'gsap'

export function About() {

    const passion = "I love building websites and web applications! It's not just my job; it's my passion. I enjoy creating websites that work smoothly and make people's lives easier. I stay updated with the newest web trends and tech so I can build better websites and bring cool ideas to reality. I'm always learning and looking for new ways to make websites awesome."

    return(
        <section className="about-section">
            <div className="about-container container">
                <div className="introducing-wrapper">
                    <SectionTitle
                        text={'about'}
                        classname='about'
                    />
                    <div className="presentation-wrapper">
                        <div className="intro-text">
                            <p>
                                {
                                    ("My name is AGOSSADOU Koffi Hugues full stack developer based in Abidjan Côte d'Ivoire, with a proven track record of creating engaging and user-friendly websites.").split(' ').map((element, index)=>{
                                        return (
                                            // word
                                            <span key={index} className='word'> {

                                                // letter
                                                element.split('').map((letter, i)=>{
                                                    return(
                                                        <span key={i} className='letter'>{letter}</span>
                                                    )
                                                })

                                            } </span>
                                        )
                                    })
                                }
                                
                            </p>
                        </div>
                        {/* <div className="my-picture">
                            <img src={avatar} alt="avatar"/>
                        </div> */}
                        <div className="description-text">
                            <p>
                                {
                                    passion.split(' ').map((element, index)=>{
                                        return (
                                            // word
                                            <span key={index} className='word'> {

                                                // letter
                                                element.split('').map((letter, i)=>{
                                                    return(
                                                        <span key={i} className='letter'>{letter}</span>
                                                    )
                                                })

                                            } </span>
                                        )
                                    })
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="my-skills">
                    <div className="skills">
                        <Subtitle
                            text='skills'
                            classname='sub-skills'
                            />
                            
                        {/* Skills */}
                        <div className="locomotive-wrapper">

                            <Skills
                                kindaSkills={skills.front}
                                classname='front'/>
                            <Skills
                                kindaSkills={skills.back}
                                classname='back'/>
                            <Skills
                                kindaSkills={skills.others}
                                classname='others'/>

                        </div>
                    </div>
                </div>
                <div className="my-experiences">
                    <Subtitle
                        text='experiences'
                        classname='sub-experiences'
                        />
                    
                    {
                        developerExperience.map((value, index, array) => {
                            return (
                                <Experience
                                    key={index}
                                    experience = {value}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </section>
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

    const briefContent = `Hello, I'm AGOSSADOU Hugues, full stack developer with a taste for creative development. Based in Abidjan, Côte D'Ivoire, I built interactive interfaces from my 2 years of experience.`
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