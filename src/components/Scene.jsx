import {Canvas} from '@react-three/fiber'
import { ProjectsCards } from './ProjectCard';
import { Preload } from '@react-three/drei';
import { Suspense } from 'react';


 function Scene() {

    // const { width } = useThree((state) => state.viewport)


    // useEffect(()=>{
    //     console.log(width)
    // },[])

    return(
        
        <Canvas 
            className='card-container' 
            style={{position:'fixed', width: "100%", height: `100vh`}}
        >
            <ambientLight intensity={Math.PI} />
            <Suspense>
                <ProjectsCards />
            </Suspense>
            <Preload all/>
        </Canvas>
        
        
    )
}

export default Scene