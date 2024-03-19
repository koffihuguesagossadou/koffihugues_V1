import { MdOutlineArrowOutward } from "react-icons/md"
import { LuGithub } from "react-icons/lu";
import { useEffect, useRef, useContext, useState } from "react";
import { pageAnimation } from "../funcs/app";
import { PageTransitionContext, PreloaderContext } from "../App";
import { archives } from "../data/archives";

function ArchiveLine({name, year, client, stacks, links, reference}){

        
    return(
        
        <div  className="ar-dis">
            <div className="a-g" ref={reference}>
                <div className="ar-n">
                    <span className="an">
                        <span>{name}</span>
                    </span>
                </div>
                <div className="ar-y">
                    <span className="ay">
                        <span>{year}</span>
                    </span>
                </div>
                <div className="ar-c">
                    <span className="ac">
                        <span>{client}</span>
                    </span>
                </div>
                <div className="ar-s">
                    <span className="as">
                        {
                            stacks?.map((stack, num)=>{
                                return (
                                    <span key={num} > {stack} </span>
                                )
                            })
                        }
                    </span>
                </div>
                <div className="ar-l">
                    <span className="al">
                        
                        {
                            links?.visit
                            ? <a  target="_blank" href= {links.visit} > <MdOutlineArrowOutward /> </a>
                            : null
                        }
                        {
                            links?.github
                            ? <a target="_blank" href={ links.github  }> <LuGithub /> </a>
                            : null
                        }

                    </span>
                </div>
            </div>

        </div>
    )
}

export function Archives() {

    const archivesRef = useRef([])
    const labelRef = useRef()
    const arcTitleRef = useRef()
    const { showTransition } = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)
    const [getArchives, setArchives] = useState([])

 
    useEffect( ()=>{

        if( Object.values(getArchives).length === 0)
        {

            setArchives({...archives})

        }
        
        pageAnimation(showTransition, preloaderPerformed, [arcTitleRef.current,labelRef.current,...archivesRef.current])
        
    }, [showTransition, preloaderPerformed, getArchives])



    return(
        
        <section className="archives-section">
            <div className="archives-container container">
                <div className="archive-projects-wrapper">
                    <div className="title-wrapper">
                        <div className="ar-t">
                            <span ref={arcTitleRef}>Archives</span>
                        </div>
                    </div>
                    <div className="archives-display-container">
                        <div className="arcs-l">
                            <div ref={labelRef} className="l-g">
                                <div className="l-n">
                                    <span>Name</span>
                                </div>
                                <div className="l-y">
                                    <span>year</span>
                                </div>
                                <div className="l-c">
                                    <span>client</span>
                                </div>
                                <div className="l-s">
                                    <span>stacks</span>
                                </div>
                                <div className="l-l">
                                    <span>links</span>
                                </div>
                            </div>
                        </div>
                        <div className="arcs-d">
                            {
                                Object.values(getArchives).map((archive, id)=>{
                                    return(
                                        <ArchiveLine key={id} reference = {el=> archivesRef.current[id] = el} {...archive} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}