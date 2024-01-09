import { useState, useEffect, useRef,useCallback,useContext } from "react";
import { useParams } from "react-router-dom";
import { pageAnimation, retrieveData } from "../funcs/app";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ProjectLink } from "../components/Links";
import { PageTransitionContext, PreloaderContext } from "../App";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../Hook/useDocumentTitle";
import { dbConfig } from "../config/defaults";

const metaDataTableLenght = 4;
const tableLabelText = ["client", "role", "year", "stacks"]

function ProjectLabel({labelText, data, reference}) {


    return(
        <div className="p-l-d">
            <div ref={reference}>
                <span className="p-l">{ labelText }</span>
                {
                    typeof data === 'object'
                    ? <span className="p-d"> { data.join(' ') } </span>
                    : <span className="p-d"> { data } </span>
                }
            </div>
        </div>
    )
}



export default function Works() {
    
    // url parameters
    const { projectName } = useParams();

    // page title
    useDocumentTitle(`Koffi Hugues | ${projectName}`) 

    const file = 'projects.json'
    const imgs= [1,2,3,4,5,6,7]
    
    const {showTransition, setShowTransition} = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)
    const navigate = useNavigate()

    // state for data
    const [getProjects, setProjects] = useState({})
    const [getNextProject, setNextProject] = useState({})
    const [imgLoaded, setImageLoaded] = useState(false)
    const [carouselImgLoaded, setCarouselImgLoaded] = useState(false)
    
    

    const [currentImage, setCurrentImage] = useState(0)

    
    const pcActiveRef = useRef()
    const pNumRef = useRef()
    const pTitleRef = useRef()
    const descsRef = useRef([])
    const labelRef = useRef([])
    const visitLinkRef = useRef()
    const nextProjectRef = useRef([])

    const handleClickImage = useCallback((imageId)=>{
        setCurrentImage(imageId)
    })


    const handleCLickNext = useCallback((slug)=>{
        setShowTransition(true)
        

        setTimeout(()=>{
            navigate(`/project/${slug}`)
        }, 1500)
    })


    const handleLoadImg = useCallback(()=>{
        if(!imgLoaded)
        {
            setImageLoaded(true)
        }
    }, [])


    const handleCarouselImg = useCallback(()=>{
        if(!carouselImgLoaded)
        {
            setCarouselImgLoaded(true)
        }
    }, [])
    
    
    useEffect(()=>{


        const url = dbConfig.dns+dbConfig.path+file

    
        if(Object.values(getProjects).length === 0 || projectName !== getProjects.slug){
            
            retrieveData(url)
            .then((response) =>  {
                
                
                // Retrieve data where slug is equal to "folio-v2"
                const filteredData = response.filter(item => item.slug === projectName);
                if(!filteredData[0]) return
                const nextData = response.filter(item => item.id === filteredData[0].id + 1)
                
                setProjects({...filteredData[0]})
                setNextProject({...nextData[0]})


            } );
        }

        // console.log(projectName, getProjects, getNextProject)

        
        const targets = [pNumRef.current, pTitleRef.current, descsRef.current, labelRef.current, visitLinkRef.current, nextProjectRef.current]
        if(targets === null || !targets) return
        pageAnimation(showTransition, preloaderPerformed, targets)    

    },[showTransition, preloaderPerformed,getProjects, getNextProject, projectName])


    

    
    return(
        <section className="project-section">
            <div className="container">
                <div className="p-carousel-wrapper">
                    <div className="p-pics">
                        <div className="main-pic-dis">
                            <picture>
                                <div style={ imgLoaded ? { opacity: 0 } : {display: 1 } } className="onload-img"></div>
                                <img onLoad={handleLoadImg} loading="lazy" src={getProjects.src ? '/images'+ getProjects.src+'/'+ (currentImage + 1) +'.webp' : null} alt={getProjects?.name} srcSet="" />
                            </picture>
                        </div>
                        <div className="carousel-pics"> 
                            <div className="p-name">
                                <div className="p-num">
                                    <span ref={pNumRef}> 
                                        {
                                            getProjects && getProjects.id >= 10 
                                            ? `0${getProjects?.id}`
                                            : `00${getProjects?.id}`
                                        } 
                                    </span>
                                </div>
                                <div className="p-title"> 
                                    <span ref={pTitleRef}> { getProjects ? getProjects.name : null } </span>
                                </div>
                            </div>
                            <div className="c-pics">
                                <div style={{"--index": currentImage}} ref={pcActiveRef} className="p-c-active"></div>
                                {
                                    
                                    imgs?.map((pic, i)=>{
                                        return(
                                            <div
                                                onClick={()=>handleClickImage(i)}
                                                key={i} className="c-pic">
                                                <picture>
                                                    <div style={ carouselImgLoaded ? { opacity: 0 } : {opacity: 1} } className="onload-img"></div>
                                                    <img onLoad={handleCarouselImg} loading="lazy" src={ getProjects.src ? '/images'+ getProjects.src+'/'+ (i+1) +'.webp' : null} alt="" />
                                                </picture>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="p-infos">
                    
                    <div className="p-meta">
                        <div className="p-desc">
                            { 
                                getProjects.description?.map((line, i)=>{
                                    return(
                                        <p key={i}>
                                            <span ref={el=> descsRef.current[i] = el}>{line}</span>
                                        </p>
                                    )
                                })
                            }
                        </div>
                        
                        <div className="p-more-i">
                            <div className="p-label">
                                {
                                    tableLabelText.map((label, i)=>{
                                        return (
                                            <ProjectLabel
                                                reference = {el => labelRef.current[i] = el}
                                                key={i}
                                                data={ getProjects[label] }
                                                labelText={label}
                                            />
                                        ) 
                                    })
                                }
                                
                            </div>
                        </div>
                        <div className="p-visit">
                            <div className="p-v-wrapper">
                                <a  href={getProjects?.link}>
                                    <span ref={visitLinkRef}>
                                        <span>visit site</span>
                                        <MdOutlineArrowOutward />
                                    </span>
                                    
                                </a>
                            </div>
                            <div className="p-next-lgh">
                                <div className="n-label">
                                    <span ref={el=> nextProjectRef.current[0] = el} >next project</span>
                                </div>
                                <ProjectLink
                                    text={getNextProject ? getNextProject?.name : null}
                                    handleClick={getNextProject ? ()=>handleCLickNext(getNextProject.slug) : null}
                                    reference={el => nextProjectRef.current[1] = el}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}