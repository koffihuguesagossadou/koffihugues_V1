export function SectionTitle({text, classname}) {


    return(
        <div className={"section-title "+ classname}>
            <h1>{text}</h1>
        </div>
    )
}

// subtitle
export function Subtitle({text, classname}){
    return(
        <div className={"section-subtitle "+ classname}>
            <h2>{text}</h2>
        </div>
    )
}

//skills

export function Skills({kindaSkills, classname}) {



    return(
        <div className={classname+"-skills"}>
            {
                kindaSkills.map((element, index)=>{
                    return(
                        <span key={index}>{element} <span className="separator-line">—</span> </span>
                    )
                })
            }
        </div>
    )
}