export function splitWord(word){
    return word.split('');
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
