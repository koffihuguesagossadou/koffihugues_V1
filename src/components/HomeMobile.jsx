import { useContext } from "react"
import { projects } from "../data/projects"
import { PageTransitionContext } from "../App"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"



export function HomeMobile(params) {
    
    const { showTransition, setShowTransition } = useContext(PageTransitionContext)
    const navigate = useNavigate()


    // go to next project
    const handleClick = useCallback((slug)=>{

        setShowTransition(true)


        setTimeout(()=>{
            navigate(`/project/${slug}`)
        }, 1500)
        
        
    }, [])


    function ProjectPresentation({cover, name, slug}) {
        return(
            <div className="projects-discover-w">
                <a onClick={()=>{handleClick(slug)}} >
                    <div className="project-cover-w">
                        <picture className="pc-img-w">
                            <img
                                loading="lazy"
                                src={cover}
                                alt={name + 'image cover'}
                            />
                        </picture>
                    </div>
                    <div className="project-title-w">
                        <h1>{name}</h1>
                    </div>
                    <div className="discover-text-w">
                        <span>Discover</span>
                    </div>
                </a>
            </div>
        )
    }

    return(
        <>
            <div className="home-mobile-w">
                {
                    projects.map((project, i)=>{
                        return <ProjectPresentation {...project}/>
                    })
                }
            </div>
        </>
    )
}