import { ArchiveProject, ProjectCard } from "../components/ProjectCard";
import { Subtitle } from "../components/Titles";
import { projects, archivesProject } from "../data/project";

export function Works() {

    const limitedData = archivesProject.slice(0, 3);

    return(
        <section className="works-section">
            <div className="works-container container">
                <div className="section-title">
                    <h1>Works</h1>
                </div>
                <div className="personal-works-wrapper">
                    <Subtitle
                        text='my projects'
                        classname='sub-projects'
                        />
                    <div className="personal-projects-carousel" datatype="">
                    {
                            projects.map((value, index)=>{
                                return (<ProjectCard
                                    key={index}
                                    projectData={value}
                                />)
                            })
                        }
                    </div>
                </div>
                
            </div>
        </section>
    )
}