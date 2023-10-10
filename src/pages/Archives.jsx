function Archives(params) {

    return(
        
        <section className="archives-section">
            <div className="archives-container container">

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