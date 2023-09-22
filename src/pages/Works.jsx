import { ArchiveProject, ProjectCard } from "../components/ProjectCard";
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
                    <div className="pw-title">
                        <h2>my projects</h2>
                    </div>
                    <div className="personal-projects-carousel">
                    {
                            projects.map((value, index)=>{
                                return (<ProjectCard
                                    key={index}
                                    name={value.name}
                                    skills={value.skills}
                                />)
                            })
                        }
                    </div>
                </div>
                <div className="archive-projects-wrapper">
                    <div className="ap-title">
                        <h2>archives</h2>
                    </div>
                    <div className="archives-projects-items">
                        {
                            archivesProject.map((value, index) => {
                                return <ArchiveProject
                                    key={index}
                                    name={value.name}
                                    link={value.link}
                                    description={value.description}
                                    skills={value.skills}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}