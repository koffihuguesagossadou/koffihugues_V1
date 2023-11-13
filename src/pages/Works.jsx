import { useState, useEffect, useRef,useCallback } from "react";
import {  ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/project";
import { SectionTitle } from "../components/Titles";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContext } from "react";
import { CursorContext } from "../App";
gsap.registerPlugin(ScrollTrigger)

export function Works() {

    // cursor context
    const { cursorOnLink, setCursorOnLink} = useContext(CursorContext)


    const tl = gsap.timeline({defaults: {ease: 'expo', duration: .6}})

    const [revealProject, setRevealProject] = useState(null)
    const workTitleRef = useRef()
    const workWrapperRef = useRef()
    const workCarouselRef = useRef()

    const marqueeWrapperRefs = projects.map(() => useRef(null));
    const projectsRefs = projects.map(() => useRef(null));
    


    // find closest side to the mouse when entering/leaving
    
    function isMouseCloserToTopOrBottom(mouseEvent, element) {
        const mouseY = mouseEvent.clientY;
        const elementRect = element.getBoundingClientRect();
        const elementTop = elementRect.top;
        const elementBottom = elementRect.bottom;
      
        const distanceToTopEdge = mouseY - elementTop;
        const distanceToBottomEdge = elementBottom - mouseY;
      
        return distanceToTopEdge < distanceToBottomEdge ? 'top' : 'bottom';
    }
    

    const handleOnclick = useCallback((e, index) => {
        // Your callback logic here

        
        e.preventDefault()
        setRevealProject(index)
    }, []);
    
    
    const handleOnMouseEnter = useCallback((e, index) => {
        // change component state
        setRevealProject(index)
        setCursorOnLink("work")
        
        // find closest side to the mouse
        const edge = isMouseCloserToTopOrBottom(e, projectsRefs[index].current);

        if (marqueeWrapperRefs[index].current) {
            
            tl
            .set(marqueeWrapperRefs[index].current, {y: edge === 'top' ? '-101%' : '101%'}, 0)
            .to(marqueeWrapperRefs[index].current,{ y: '0%'}, 0)
        }

        
    }, [revealProject]);


    const handleOnMouseLeave = useCallback((e, index) => {

        // find closest side to the mouse
        const edge = isMouseCloserToTopOrBottom(e, projectsRefs[index].current);

        if (marqueeWrapperRefs[index].current) {
            
            tl
            .to(marqueeWrapperRefs[index].current, {y: edge === 'top' ? '-101%' : '101%'}, 0)
        }

        setRevealProject(null)
        setCursorOnLink(null)
    }, [revealProject]);


    return(
        <section className="works-section">
                <SectionTitle
                        reference= {workTitleRef}
                        text={'selected works'}
                        classname='works'
                    />
                <div ref={workWrapperRef} className="personal-works-wrapper">
                    
                    <div ref={workCarouselRef} className="personal-projects-carousel" datatype="">
                        {
                            projects.map((value, index)=>{
                                return (<ProjectCard
                                    key={index}
                                    handleOnClick={(e)=> handleOnclick(e,index)}
                                    handleOnMouseEnter = { (e)=>handleOnMouseEnter(e, index) }
                                    handleOnMouseLeave = {(e)=>handleOnMouseLeave(e, index) }
                                    state= {revealProject}
                                    disableCursor = {revealProject=== index ? true : false}
                                    marqueeReference= {marqueeWrapperRefs[index]}
                                    projectReference= {projectsRefs[index]}
                                    projectData={value}
                                />)
                            })
                        }
                    </div>
                </div>
                
            
        </section>
    )
}