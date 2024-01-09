import {Canvas} from '@react-three/fiber'
import { ProjectsCards } from './ProjectCard';
import { Preload } from '@react-three/drei';

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
            <ProjectsCards />
            <Preload />
        </Canvas>
        
        
    )
}

export default Scene