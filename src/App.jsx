import { createContext, useState, useContext, useRef, useEffect,Suspense  } from "react";
import { About, BriefAbout } from "./pages/About"
import { Contact } from "./pages/Contact"
import { Home } from "./pages/Home"
import { Works } from "./pages/Works"
import Lenis from '@studio-freight/lenis';
import gsap from "gsap";
import {HiOutlineArrowUpRight} from "react-icons/hi2"




export const PageTransitionContext = createContext();
export const CursorContext = createContext();


function Cursor() {

  const cursorRef = useRef(null)
  const { cursorOnLink, setCursorOnLink } = useContext(CursorContext);

  console.log(cursorOnLink)
  useEffect(()=>{
      function updateMousePosition(eX, eY) {


        gsap.to(cursorRef.current,{
          x: eX,
          y: eY,
        })
        
      }

      window.addEventListener("mousemove", e => {
        updateMousePosition(e.clientX, e.clientY);
    });


    // Clean up the event listener on unmount
    return ()=>{
      window.removeEventListener("mousemove", e => {
        updateMousePosition(e.clientX, e.clientY);
    })
    }

  })


  return(

      <div ref={ cursorRef } data-text='View' className={`cursor cursor-active ${cursorOnLink === "work"
        ? 'cursor-active-link' 
        : cursorOnLink === "email" ? 'cursor-email-link'
        : ''} `}>
        <HiOutlineArrowUpRight/>
      </div>
  )
}


function App() {

  const [cursorOnLink, setCursorOnLink] = useState(null)
  const [showTransition, setShowTransition] = useState(false)
  const barRefs = useRef([])
  const mainRef = useRef()

  const styleFirstAnimation = {
    animationName: 'page-transition-1',
    transform: 'translate3d(100%, 0, 0)',
    animationPlayState: 'running'
  }

  // create array for bars transition
  const barArray = Array.from({ length: 8 }, (_, index) => index);

  // useEffect(()=>{


  //   if (showTransition) {
  //     barRefs.current.forEach((value, index)=>{
  //       value.style.animationPlayState = 'running'
  //     })


  //     // Find the last .strip element
  //     const lastBarRef = barRefs.current[barRefs.current.length - 1];

  //     // Listen for the animationend event on the last element
  //     lastBarRef.addEventListener('animationend', handleAnimationEnd);
  //   }


  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     const lastBarRef = barRefs.current[barRefs.current.length - 1];
  //     if (lastBarRef) {
  //       lastBarRef.removeEventListener('animationend', handleAnimationEnd);
  //     }
  //   };

    
  // },[showTransition])


  const handleAnimationEnd = () => {
    // Animation on the last .strip element has finished
    // Set animationPlayState to 'paused' for all elements
    setShowTransition(!showTransition)
  };

  useEffect(()=>{

    const lenis = new Lenis({
      duration: 3,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
  });
  
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

  })


  return (

    <PageTransitionContext.Provider value={{showTransition, setShowTransition}}>
      <CursorContext.Provider value={{ cursorOnLink, setCursorOnLink}}>
        <main ref={mainRef} className="main-content">
          <div id='main-app'>

            <div className="pages-transition">
              {
                barArray.map((_, index)=>{


                  return (
                    <div 
                      style={showTransition === true ? styleFirstAnimation : null}
                      ref={ el => barRefs.current[index] = el} 
                      key={index} 
                      className="strip"
                      onAnimationEnd={ index === (barArray.length - 1) ? handleAnimationEnd : null}
                      ></div>
                  )


                })
              }
            </div>
            <Home/>
            <BriefAbout/>
            <Works/>
            <Contact/>
          </div>
        </main>
        <Cursor/>
      </CursorContext.Provider>
    </PageTransitionContext.Provider>
  )
}



export default App
