import gsap from "gsap";
import { gsapConfig } from "../config/defaults";


export function splitWord(word){
    return word?.split('');
}

//Detect Closest Edge
// from https://codepen.io/johnstew/pen/zxYJZP?editors=0010
export const closestEdge = (x,y,w,h) => {
    const topEdgeDist = distMetric(x,y,w/2,0);
    const bottomEdgeDist = distMetric(x,y,w/2,h);
    console.log(topEdgeDist, bottomEdgeDist)
    const min = Math.min(topEdgeDist,bottomEdgeDist);
    return min === topEdgeDist ? 'top' : 'bottom';
}

//Distance Formula
function distMetric(x,y,x2,y2) {
    var xDiff = x - x2;
    var yDiff = y - y2;
    return (xDiff * xDiff) + (yDiff * yDiff);
}

function findClosestEdge(ev,el) {
    const x = ev.pageX - el.offsetLeft;
    console.log(ev.pageX, ev.pageY)
    const y = ev.pageY - el.offsetTop;

    return closestEdge(x,y, el.clientWidth, el.clientHeight);
}

export function map (num, min1, max1, min2, max2, round = false) {
    const num1 = (num - min1) / (max1 - min1)
    const num2 = (num1 * (max2 - min2)) + min2
   
    if (round) return Math.round(num2)
   
    return num2
  }


// Function to find an object by a specific property value
export const findObject = async (array, propertyName, propertyValue) => {

    if(!propertyName) return console.log(true)

    return await array.find(obj => obj[propertyName] === propertyValue);
};




// // wait before navigate to
export const NavigateAsync = (reachRoute,time)=>{

    
        setTimeout(()=>{
            reachRoute
        }, time)
    
}


export function pageAnimation(isTransitionPage, isPreloader, ...elements){

    const timeline = gsap.timeline()


    if( (!isTransitionPage && isTransitionPage !== null ) || isPreloader )
    {
        timeline.to(...elements,{
            y: '0%',
            ease: gsapConfig.ease,
            duration: gsapConfig.duration,
            stagger:{
                amount: gsapConfig.staggerAmount
            }
        })
    }


}


// fetch data

export async function retrieveData(url) {

    if (typeof url !== "string") return

    let jsonData = await fetch(url)
    
    let dataFiltered = await jsonData.json()

    return dataFiltered
}