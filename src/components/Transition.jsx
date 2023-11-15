import React from 'react'
import { useContext, useRef, useCallback, useEffect } from 'react';
import { PageTransitionContext } from '../App';
import gsap from 'gsap'

export default function Transition() {

    const {showTransition, setShowTransition } = useContext(PageTransitionContext)
    const barRefs = useRef([])
    
    // create array for bars transition
    const barArray = Array.from({ length: 8 }, (_, index) => index);

    
      
    const handleAnimationEnd = useCallback(() => {
    // Animation on the last .strip element has finished
    // Set animationPlayState to 'paused' for all elements
    setShowTransition(!showTransition)
    }, [showTransition]);


    useEffect (()=>{
        if (showTransition) {
            // Create a timeline
            const tl = gsap.timeline();

            // Add the animation to the timeline
            tl.to(barRefs.current, { x: '0%', stagger:{amount: .5} })  // Move to x: '0%'
                .to(barRefs.current, { 
                    x: '-100%', 
                    delay: .3,
                    onInterrupt:  ()=>{
                        setShowTransition(false)
                        tl.set(barRefs.current, {
                            x: '100%',
                        }, 0)
                    },
                    onComplete: ()=>{
                        setShowTransition(false)
                        tl.set(barRefs.current, {
                            x: '100%',
                        }, 0)
                    },
                    stagger:{
                        amount: .5
                    }
                }); // Move back to x: '-100%'
        }

        console.log(showTransition)
    }, [showTransition])

    return (
        <div className="pages-transition">
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
