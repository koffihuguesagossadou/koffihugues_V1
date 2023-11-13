import { useRef } from "react"
import { useState } from "react"
import { ProjectLink } from "./Links"

export function ProjectCard({projectData, projectReference, handleOnMouseEnter, handleOnMouseLeave,marqueeReference, disableCursor}) {

    const {name, image} = projectData
    

    return(
        <div ref={projectReference} href="" className={`card-infos ${disableCursor? 'disable-cursor' : ''}` }>
            <div className="project-item">
                <a href="" className="project-name"
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                >
                    {name}
                </a>
                <div ref={marqueeReference} className="projects-infos-wrapper">
                    <div className="marquee-items">
                        <span>{name}</span>
                        <div className="project-img" style={{backgroundImage: `url(${image})`}}></div>
                        <span>{name}</span>
                        <div className="project-img" style={{backgroundImage: `url(${image})`}}></div>
                        <span>{name}</span>
                        <div className="project-img" style={{backgroundImage: `url(${image})`}}></div>
                        <span>{name}</span>
                        <div className="project-img" style={{backgroundImage: `url(${image})`}}></div>
                        <span>{name}</span>
                        <div className="project-img" style={{backgroundImage: `url(${image})`}}></div>
                        <span>{name}</span>
                        <div className="project-img" style={{backgroundImage: `url(${image})`}}></div>
                        <span>{name}</span>
                        <div className="project-img" style={{backgroundImage: `url(${image})`}}></div>
                        <span>{name}</span>
                        <div className="project-img" style={{backgroundImage: `url(${image})`}}></div>
                    </div>
                    {/* <div className="project-texts">
                        <div className="project-name">
                            <h1>{name}</h1>
                        </div>
                        <ProjectLink
                            text='View project'
                            url= ""
                        />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export function ArchiveProject({name, description, skills, link}) {
    return(
        <div className="ap-card-infos">
            <div className="archive-project-item">
                <div className="archive-project-header">
                   <div className="archive-project-name">{name}</div>
                    <div className="archive-project-link">{link}</div> 
                </div>
                <div className="archive-project-body">                    
                    <div className="archive-project-description">{description}</div>
                </div>
                <div className="archive-project-footer">
                    <div className="archive-project-skills">
                        {
                            skills.map((value, index) => {
                                return <span key={index}>
                                    {value}
                                </span>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}