import { useState, useEffect, useRef,useCallback,useContext } from "react";
import gsap from "gsap";
import { useParams } from "react-router-dom";
import { projects } from "../data/project";
import { findObject } from "../funcs/app";

export function Works() {

    const { projectName } = useParams();
    let projectData = findObject(projects, 'slug', projectName);
    

    return(
        <section className="project-section">
            <div className="container">
                <div className="p-carousel-wrapper">
                    <div className="p-pics">
                        <div className="main-pic-dis">
                            <picture>
                                <source src="" type="image/webp" />
                                <img loading="lazy" width="460" height="240px" src={projectData.image} alt={projectData.name} srcSet="" />
                            </picture>
                        </div>
                        <div className="carousel-pics">
                            <div className="c-pic">
                                <picture>
                                    <source src="" type="image/webp" />
                                    <img loading="lazy" src="" alt="" srcSet="" />
                                </picture>
                            </div>
                            <div className="c-pic">
                                <picture>
                                    <source src="" type="image/webp" />
                                    <img loading="lazy" src="" alt="" srcSet="" />
                                </picture>
                            </div>
                            <div className="c-pic">
                                <picture>
                                    <source src="" type="image/webp" />
                                    <img loading="lazy" src="" alt="" srcSet="" />
                                </picture>
                            </div>
                            <div className="c-pic">
                                <picture>
                                    <source src="" type="image/webp" />
                                    <img loading="lazy" src="" alt="" srcSet="" />
                                </picture>
                            </div>
                            <div className="c-pic">
                                <picture>
                                    <source src="" type="image/webp" />
                                    <img loading="lazy" src="" alt="" srcSet="" />
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-infos">
                    <div className="p-name">
                        <h3> { projectData.name } </h3>
                    </div>
                    <div className="p-meta">
                        <div className="p-desc">
                            { 
                                // projectData.description.map((line, i)=>{
                                //     return(
                                //         <p key={i}>
                                //             <span>{line}</span>
                                //         </p>
                                //     )
                                // })
                            }
                        </div>
                        <div className="p-more-i">
                            <div className="p-role">
                                <span>
                                    
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}