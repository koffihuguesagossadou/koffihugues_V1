import { useState, useEffect, useRef,useCallback,useContext } from "react";
import gsap from "gsap";
import { useParams } from "react-router-dom";
import { projects } from "../data/project";
import { findObject, pageAnimation } from "../funcs/app";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ProjectLink } from "../components/Links";
import { gsapConfig } from "../config/defaults";
import { PageTransitionContext, PreloaderContext } from "../App";

const metaDataTableLenght = 4;
const tableLabelText = ["client", "role", "year", "skills"]

function ProjectLabel({labelText, data, reference}) {
    return(
        <div className="p-l-d">
            <div ref={reference}>
                <span className="p-l">{ labelText }</span>
                <span className="p-d"> { data } </span>
            </div>
        </div>
    )
}



export default function Works() {

    const {showTransition} = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)
    

    const { projectName } = useParams();
    let projectData = findObject(projects, 'slug', projectName);
    const nextProjectData = findObject(projects, 'id', projectData.id + 1)
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

    useEffect(()=>{

        pageAnimation(showTransition, preloaderPerformed, 
            [pNumRef.current, pTitleRef.current, descsRef.current, labelRef.current, visitLinkRef.current, nextProjectRef.current]
        )

        // if ((!showTransition && showTransition !== null) || preloaderPerformed) {
            
        //     timeline.to([pNumRef.current, pTitleRef.current, descsRef.current, labelRef.current, visitLinkRef.current, nextProjectRef.current],{
        //         y: '0%',
        //         duration: gsapConfig.duration,
        //         ease: gsapConfig.ease,
        //         stagger:{
        //             amount: gsapConfig.staggerAmount
        //         }
        //     })
        // }

    },[showTransition, preloaderPerformed])

    return(
        <section className="project-section">
            <div className="container">
                <div className="p-carousel-wrapper">
                    <div className="p-pics">
                        <div className="main-pic-dis">
                            <picture>
                                <source src="" type="image/webp" />
                                <img loading="lazy" src={projectData.imgs[currentImage]} alt={projectData.name} srcSet="" />
                            </picture>
                        </div>
                        <div className="carousel-pics"> 
                            <div className="p-name">
                                <div className="p-num">
                                    <span ref={pNumRef}> 
                                        {
                                            projectData.id >= 10 
                                            ? `0${projectData.id}`
                                            : `00${projectData.id}`
                                        } 
                                    </span>
                                </div>
                                <div className="p-title"> 
                                    <span ref={pTitleRef}> { projectData.name } </span>
                                </div>
                            </div>
                            <div className="c-pics">
                                <div style={{"--index": currentImage}} ref={pcActiveRef} className="p-c-active"></div>
                                {
                                    projectData.imgs.map((pic, i)=>{
                                        return(
                                            <div
                                                onClick={()=>handleClickImage(i)}
                                                key={i} className="c-pic">
                                                <picture>
                                                    <source src="" type="image/webp" />
                                                    <img loading="lazy" src={pic} alt="" srcSet="" />
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
                                projectData.description.map((line, i)=>{
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
                                                data={ projectData[label] }
                                                labelText={label}
                                            />
                                        ) 
                                    })
                                }
                                
                            </div>
                        </div>
                        <div className="p-visit">
                            <div className="p-v-wrapper">
                                <a  href={projectData.link}>
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
                                    text={nextProjectData.name}
                                    link={nextProjectData.link}
                                    reference={el => nextProjectRef.current[1] = el}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="p-next-xlh">
                    <div className="n-label">
                        <span>next project</span>
                    </div>
                    <ProjectLink
                        text='next one'
                        link=''
                    />
                </div> */}
            </div>
        </section>
    )
}