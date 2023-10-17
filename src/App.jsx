import { createContext, useState, useRef, useEffect } from "react";
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { Home } from "./pages/Home"
import { Works } from "./pages/Works"

export const PageTransitionContext = createContext();

function App() {

  const [showTransition, setShowTransition] = useState(false)
  const barRefs = useRef([])
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


  return (

    <PageTransitionContext.Provider value={{showTransition, setShowTransition}}>
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
        <About/>
        <Works/>
        <Contact/>
      </div>
    </PageTransitionContext.Provider>
  )
}

export default App
