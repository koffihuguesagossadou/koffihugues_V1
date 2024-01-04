import { useEffect,useRef,useContext, useState } from 'react'
import { dbConfig } from '../config/defaults';
import { PageTransitionContext, PreloaderContext } from '../App';
import { pageAnimation, retrieveData } from '../funcs/app';


export function About() {

    // const passion = "I love building websites and web applications! It's not just my job; it's my passion. I enjoy creating websites that work smoothly and make people's lives easier.  so I can build better websites and bring cool ideas to reality. I'm always learning and looking for new ways to make websites awesome."
    // const aboutTitleRef = useRef(null)
    const {showTransition} = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)
    const [getInfos, setInfos] = useState({})


    const expsRef = useRef([])
    const skillsRef = useRef([])

    const file = 'me.json'

    


    useEffect( ()=>{
        
        const url = dbConfig.dns+dbConfig.path+file


        if(Object.keys(getInfos).length === 0){

            retrieveData(url)
            .then( response => {
    
                if(!response) return
    
                setInfos({...response})
            })
        }


        const targets = ['.fn-letter', 'p>span','div>h3' ,expsRef.current, skillsRef.current]
        pageAnimation(showTransition, preloaderPerformed, targets)

        
    }, [showTransition, preloaderPerformed, getInfos])

    return(
                

        <section className="a-section">
            <div className="container">
                <div className="name-title">
                    <div className="first-name">
                        {

                            getInfos.firstname
                            ?
                            getInfos.firstname.split('').map((char, i)=>{
                                return (
                                    
                                    char === " "?  <span key={i}>&nbsp;</span> :<span key={i} className='fn-letter'>{char}</span>
                                )
                            })
                            :null
                        }
                    </div>
                    <div className="last-name">
                        {
                            getInfos.lastname?.split('').map((char, i)=>{
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
                                <span><em>{getInfos.job}</em> from {getInfos.location}.</span>
                            </p>
                            {
                                getInfos.biography
                                ? 
                                getInfos.biography.map((line, i)=>{
                                    return(
                                        <p key={i}>
                                            <span>
                                                {line}
                                            </span>
                                        </p>
                                    )
                                })
                                : null
                            }
                        </div>
                    </div>

                    <div className="clients-wrapper">
                        <div className="a-block-title">
                            <h3 >I worked with</h3>
                        </div>
                        <div className="a-experiences-wrapper">
                            {
                                getInfos.experience?.map((experience, i)=>{
                                    return(
                                        <div key={i} className="a-experience">
                                            <div className='ae' ref={el => expsRef.current[i] = el}>
                                                <span className='a-company'>{experience.name} -- &#160; </span>
                                                <span className='a-date'> {experience.year} </span>
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
                                getInfos.skills?.map((skill, i)=>{
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
