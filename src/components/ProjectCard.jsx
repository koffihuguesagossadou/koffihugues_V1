export function ProjectCard({projectData}) {

    const {name, image, skills} = projectData

    return(
        <a href="" className="card-infos">
            <div className="project-item">
                <div className="project-name">{name}</div>
                <div className="skills-used">
                    {
                        skills.map((value, index) => {
                            return <span key={index}>{value}</span>
                        })
                    }
                </div>
                <img src={image} alt={name} />
            </div>
        </a>
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