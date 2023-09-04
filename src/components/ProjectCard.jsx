export function ProjectCard({name,skills}) {
    return(
        <div className="card-infos">
            <div className="project-item">
                <div className="project-name"></div>
                <div className="skills-used">
                    {
                        skills.map((value, index) => {
                            return <span key={index}>{value}</span>
                        })
                    }
                </div>
                <div className="project-img">
                    <img src="https://picsum.photos/seed/picsum/300/400" alt={name} />
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
                            skills.map((value, index, array) => {
                                return <span index={index}>
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