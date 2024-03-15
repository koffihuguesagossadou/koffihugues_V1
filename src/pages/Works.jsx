import { useState, useEffect, useRef,useCallback,useContext } from "react";
import { useParams } from "react-router-dom";
import { pageAnimation, retrieveData } from "../funcs/app";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ProjectLink } from "../components/Links";
import { PageTransitionContext, PreloaderContext } from "../App";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../Hook/useDocumentTitle";
import { dbConfig, dbFiles } from "../config/defaults";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { nanoid } from 'nanoid'
import { ScrollTrigger } from "gsap/all";
import gsap from 'gsap'
gsap.registerPlugin(ScrollTrigger)


const metaDataTableLenght = 4;
const tableLabelText = ["client", "role", "year", "stacks"]

function ProjectLabel({labelText, data, reference}) {


    return(
        <div className="p-l-d">
            <div ref={reference}>
                <span className="p-l">{ labelText }</span>
                {
                    typeof data === 'object'
                    ? 
                    
                    <div className="m-data">
                        {
                            data.map((el, _i)=>{
                                return (
                                    <div key={nanoid()}>

                                        <span className="p-d"> { el }   </span>
                                        <span> &#160; </span>

                                    </div>
                                )
                            })
                        }
                    </div>
                    
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

    const imgs= [1,2,3,4,5,6,7]
    const timeline = gsap.timeline()
    
    const {showTransition, setShowTransition} = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)
    const navigate = useNavigate()

    // state for data
    const [getProjects, setProjects] = useState({})
    const [getNextProject, setNextProject] = useState({})
    const [imgLoaded, setImageLoaded] = useState(false)
    const [NImgLoaded, setNImgLoad] = useState(false)
    
    


    
    const imgsRef = useRef([])
    const loadImgsRef = useRef([])
    const scrollRef = useRef()
    const pTitleRef = useRef()
    const descsRef = useRef([])
    const labelRef = useRef([])
    const visitLinkRef = useRef()
    const nextProjectRef = useRef([])
    const lineScroll = useRef()

    


    // go to next project
    const handleCLickNext = useCallback((slug)=>{


        setShowTransition(true)

        // when we go to next project scroll to top
        if(window.scrollY > 0){
            setTimeout(()=>{
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
            }, 1000)
        }

        setTimeout(()=>{
            navigate(`/project/${slug}`)
        }, 1500)
        
        
    }, [])


    // const handleLoadImg = useCallback(()=>{
    //     if(!imgLoaded)
    //     {
    //         setImageLoaded(true)
    //     }
    // }, [])




    function scrollLine(e) {
        const y = Math.round(window.scrollY)  
        const pageSize  = document.body.clientHeight - window.innerHeight


        timeline.to(lineScroll.current, {
            height: y * (100/(pageSize)) + '%',
            duration: 0,
        })
    }

    
    
    
    useEffect(()=>{


        // scroll line feature 
        window.addEventListener('scroll', scrollLine)

    
        // get project informations
        if(Object.values(getProjects).length === 0 || projectName !== getProjects.slug){
            
            retrieveData(process.env.JSON_URL+dbConfig.path+dbFiles.projects)
            .then((response) =>  {
                
                
                // Retrieve data where slug is equal to "folio-v2"
                const filteredData = response.filter(item => item.slug === projectName);
                if(!filteredData[0]) return
                const nextData = response.filter(item => item.id === filteredData[0].id + 1)
                
                setProjects({...filteredData[0]})
                setNextProject({...nextData[0]})


            } );
        }


        //  animations targets
        const targets = [pTitleRef.current, descsRef.current, labelRef.current, visitLinkRef.current, nextProjectRef.current, scrollRef.current]
        if(targets === null || !targets) return
        pageAnimation(showTransition, preloaderPerformed, targets)  
        
        

        // load imgs

        if(loadImgsRef.current && imgLoaded)
        {

            loadImgsRef.current.forEach((element, i)=>{
                gsap.to(element,{
                    opacity: 0,
                    duration:.5,
                    ease: "power1.out",
                    scrollTrigger:{
                        trigger: imgsRef.current[i],
                        start: 'center bottom',
                    },
    
                    
                })
            })

        }

        return ()=>{
            removeEventListener('scroll', scrollLine)
        }

        

    },[
        showTransition, 
        preloaderPerformed,
        getProjects, 
        getNextProject, 
        projectName, 
        imgLoaded
    ])


    

    
    return(
        <section className="project-section">
            <div className="p-wrapper">
                <div ref={lineScroll} className="l-scrollable"></div>
                <div className="p-banner">
                    <div className="p-bg">
                        <div className="p-vail"></div>
                        {/* <img loading="lazy" src={ getProjects.src ? "/images"+getProjects.src+'/main.webp' : null} alt={getProjects.name} /> */}
                        <LazyLoadImage
                            src={ getProjects.src ? "/images"+getProjects.src+'/main.webp': null} 
                            alt={getProjects.name}
                            height={'100vh'}
                            width={'100vw'}
                            effect="blur"
                        />
                        <div className="mobile-banner">
                            <h1 className="mb-title">
                                <span>{getProjects.name}</span>
                            </h1>
                            <span className="mb-scroll">
                                <span>(scroll)</span>
                            </span>
                        </div>
                    </div>
                    <div className="p-infos">
                        <div className="p-title"> 
                            <span ref={pTitleRef}> { getProjects ? getProjects.name : null } </span>
                        </div>
                        <div className="p-desc">
                            { 
                                getProjects.description?.map((line, i)=>{
                                    return(
                                        <p key={nanoid()}>
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
                                                key={nanoid()}
                                                data={ getProjects[label] }
                                                labelText={label}
                                            />
                                        ) 
                                    })
                                }
                                
                            </div>
                        </div>
                        <div className="p-v-wrapper">
                            <a target="_blank"  href={getProjects?.link}>
                                <span ref={visitLinkRef}>
                                    <span>visit project</span>
                                    <MdOutlineArrowOutward />
                                </span>
                                
                            </a>
                        </div>

                        <div className="p-scroll">
                            <span ref={scrollRef}> (Scroll) </span>
                        </div>
                    </div>
                </div>
                <div className="p-folio">
                    {
                                
                        imgs?.map((pic, i)=>{
                            return(
                                <div
                                    
                                    key={nanoid()} className="c-pic">
                                    <div ref={el=> loadImgsRef.current[i] = el} className="onload-img"></div>
                                    <img 
                                        onLoad={()=>{setImageLoaded(true)}}
                                        ref={el=> imgsRef.current[i] = el} 
                                        loading="lazy" 
                                        src={ getProjects.src ? '/images'+ getProjects.src+'/'+ (i+1) +'.webp' : null} 
                                        alt={ 'image-'+i+1} />
                                </div>
                            )
                        })
                    }

                    {/* <div className="p-folio-map">
                        <div  style={ {"--index": currentImage}  } className="p-folio-pos"></div>
                        {
                                    
                            imgs?.map((_pic, i)=>{
                                return(
                                    <div
                                        onClick={()=>handleClickImage(i)}
                                        key={nanoid()} className="c-pic-map">
                                        <div style={ carouselImgLoaded ? { opacity: 0 } : {opacity: 1} } className="onload-img"></div>
                                        <img onLoad={handleCarouselImg} loading="lazy" src={ getProjects.src ? '/images'+ getProjects.src+'/'+ (i+1) +'.webp' : null} alt={ 'image-'+i+1} />
                                    </div>
                                )
                            })
                        }
                    </div> */}
                </div>

                {
                    Object.values(getNextProject).length !== 0
                     
                    ?<div className="np-wrapper">
                        <div className="np-bg">
                            
                            <LazyLoadImage
                                src={getNextProject.src ? "/images"+getNextProject.src+'/main.webp' : null} 
                                alt={getNextProject.name}
                                height={'50vh'}
                                width={'15vw'}
                                effect="blur"
                            />
                        </div>
                        {
                                    
                            Object.values(getNextProject).length !== 0
                            ?
                            <div className="np-name">
                            
                                <div className="n-label">
                                    <span ref={el=> nextProjectRef.current[0] = el} >next project</span>
                                </div>
                                <ProjectLink
                                    text={getNextProject ? getNextProject?.name : null}
                                    handleClick={getNextProject ? ()=>handleCLickNext(getNextProject.slug) : null}
                                    reference={el => nextProjectRef.current[1] = el}
                                />
                            </div>

                            : null
                        }
                    </div>

                    : null
                }
            </div>
        </section>
    )
}