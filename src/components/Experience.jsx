import { useState, useRef } from "react"
import { FiExternalLink, FiLink2 } from 'react-icons/fi'
import { Expo } from "gsap"
import gsap from "gsap"

export function Experience({experience}) {

    const {startDate, place, endDate, role, company, responsibilities, projects, technologyStack} = experience
    const [seeMoreInfo, setSeeMoreInfo] = useState(false)
    const [imgReveal, setImgReveal] = useState(null);

    // img refs array
    const cpiRefs = useRef([]);

    
    if (imgReveal !== null ) {

        
        gsap.to(cpiRefs.current[imgReveal],{
            scale: 1 
            
        })
    } 

    // if mouse leave hide div
    function mouseLeaveHandler() {

        gsap.to(cpiRefs.current[imgReveal],{
            scale: 0,
            duration: .5,
        })

        setImgReveal(null)
    }

    function onMouseMoveHandler(e){


        let posX = e.clientX/5
        let posY = e.clientY/15

        let tl = gsap.timeline();

        tl.to(cpiRefs.current[imgReveal],{
            x:posX,
            y: posY,
            duration: 1,
        })
    }

    return(
        <div className="experience-infos">
            <div className="main-info">
                <div className="dates">
                    {startDate} - {endDate ==='' ? 'Now': endDate}
                </div>
                <div className="role-company-contain">
                    <div className="role-wrapper">
                        {role.toUpperCase()}
                    </div>
                    <div className="company-wrapper">
                        <a href="http://" target="_blank" rel="noopener noreferrer">{company}<FiExternalLink/></a>
                    </div>
                    <div className="place-wrapper">
                        {place}
                    </div>
                </div>
                <div className="more-btn" onClick={(e)=>{ setSeeMoreInfo(!seeMoreInfo) }}>
                    <span className="horizontal-line"></span>
                    <span className={ seeMoreInfo 
                        ? "vertical-line reveal" 
                        : "vertical-line"}></span>
                </div>
            </div>
            <div className={ seeMoreInfo
                            ?  "secondary-info show-more"
                            : 'secondary-info'}>

                <div className="responsabilities-wrapper">
                    {
                        responsibilities.map((value, index) => {
                            return <div key={index} >{value}</div>
                        })
                    }
                </div>

                <div className="company-project-wrapper">
                    {
                        projects.map((value, index) => {
                            return(
                                <div key={index} className="cp-contents">
                                    <a href="" className="project-name"
                                        onMouseEnter={(e)=> {setImgReveal(index)}}
                                        onMouseLeave={mouseLeaveHandler}
                                        onMouseMove={onMouseMoveHandler}>
                                        <FiLink2/>
                                        {value.name}
                                    </a>
                                    <div className="cpi-img-wrapper" ref={ el => cpiRefs.current[index] = el }>
                                        <img className='company-project-img' src={value.imgURL} alt="company project" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="stacks-wrapper">
                    {
                        technologyStack.map((value, index, array) => {
                            return (
                                <span key={index}>{value}</span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}