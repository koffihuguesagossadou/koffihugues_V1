
export function Experience({experience}) {

    const {startDate, endDate, role, company, responsibilities, projects, technologyStack} = experience

    return(
        <div className="experience-infos">
            <div className="main-info">
                <div className="dates">
                    {startDate} - {endDate ?? 'Now'}
                </div>
                <div className="role-company-contain">
                    <div className="role-wrapper">
                        {role}
                    </div>
                    <div className="company-wrapper">
                        {company}
                    </div>
                </div>
            </div>
            <div className="secondary-info">
                <div className="responsabilities-wrapper">
                    {
                        responsibilities.map((value, index, array) => {
                            return <div key={index} >{value}</div>
                        })
                    }
                </div>
                <div className="company-project-wrapper">
                    {
                        projects.map((value, index, array) => {
                            return(
                                <div key={index} className="cp-contents">
                                    <div className="project-name">
                                        {value.name}
                                    </div>
                                    <img src={value.imgURL} alt="" />
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