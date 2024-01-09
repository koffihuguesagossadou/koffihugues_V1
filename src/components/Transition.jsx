import React from 'react'
import { useContext, useRef, useCallback, useEffect } from 'react';
import { PageTransitionContext, PreloaderContext } from '../App';
import gsap from 'gsap'
import { gsapConfig } from '../config/defaults';

export default function Transition() {

    const {showTransition, setShowTransition } = useContext(PageTransitionContext)
    const { setPreloaderPerformed } = useContext(PreloaderContext)
    const barRefs = useRef([])
    const pageTransitionWrapperRef = useRef()
    
    // create array for bars transition
    const barArray = Array.from({ length: 8 }, (_, index) => index);

    

    useEffect (()=>{
        if (showTransition) {
            // Create a timeline
            const tl = gsap.timeline();

            // Add the animation to the timeline
            tl.to([pageTransitionWrapperRef.current,barRefs.current], { x: '0%', stagger:{amount: .5} })  // Move to x: '0%'
                .to(barRefs.current, { 
                    x: '-100%', 
                    delay: 1,
                    onStart:()=>{

                        //set preloader animation to false so page animation can perform after transition animation
                        setPreloaderPerformed(false)
                    },
                    onComplete: ()=>{
                        tl.set([barRefs.current, pageTransitionWrapperRef.current], {
                            x: '100%',
                        }, 0)
                        setShowTransition(false)
                    },
                    stagger:{
                        amount: gsapConfig.staggerAmount
                    }
                }); // Move back to x: '-100%'
        }

    }, [showTransition])

    return (
        <div ref={pageTransitionWrapperRef} className="pages-transition">
            {
                barArray.map((_, index)=>{


                return (
                    <div 
                    ref={ el => barRefs.current[index] = el} 
                    key={index} 
                    className="strip"
                    ></div>
                )


                })
            }
        </div>
    )
}
