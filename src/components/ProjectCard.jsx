import { useRef, useMemo, useContext, useCallback, useEffect, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import {  MathUtils } from "three"
import { Image, Html, MeshDistortMaterial, useTexture } from '@react-three/drei';
import {  PageTransitionContext } from "../App";
import { easing } from 'maath'
import { useNavigate } from "react-router-dom"; 
import gsap from 'gsap';
import { retrieveData } from "../funcs/app";
import { dbConfig } from "../config/defaults";



export function ProjectCard({name, src, index,slug}) {
    


    const imageRef = useRef();
    const textRef = useRef();
    const lettersRef = useRef([])


    // const texture = useTexture('https://dlfsookdovlgl.cloudfront.net'+src+'/main.webp')

    const { showTransition, setShowTransition } = useContext(PageTransitionContext)
    const [hovered, setHovered] = useState(false)
    const navigate = useNavigate()


    // mesh functions
    const handleMeshOnPointerEnter = useCallback(() => {
        setHovered(true)
    })

    const handleMeshOnPointerLeave = useCallback(() => {
        setHovered(false)
    })

    const handleOnCLick = useCallback(()=>{
        setShowTransition(true)
        
        setTimeout(()=>{
            navigate(`/project/${slug}`)
        }, 1500)
    })

    
    
    const photo = useMemo(() => {
        return {
          width: 2.5,
          height: 3,
          gap: 0.3,
          x: (2.5 + 0.3) * index ,
          y: 0,
        };
    }, [index]);


    useFrame((state, delta) => {

        gsap.to(lettersRef.current,{
            y: hovered ? 0 : '100%',
            rotateX: 0,
            stagger:{
                amount: 0.2
            }
        })
        easing.damp(imageRef.current.material, 'distort', hovered ?0.2: 0, 0.25, delta)
        easing.damp(imageRef.current.material, 'speed', hovered ? 4 : 0, 0.25, delta)
        easing.damp(imageRef.current.material, 'grayscale', hovered ? 0 : 0.8, 0.25, delta)
        easing.damp(imageRef.current.material, 'zoom', hovered ? 1.4 : 1.2, 0.25, delta)
    
    });


    
    return(
        
        <group>
        


            <Image 
                ref={imageRef}
                zoom={1.4}
                url={'images'+src+'/main.webp'}
                scale={[photo.width, photo.height, 1]} 
                onPointerOver={ handleMeshOnPointerEnter }
                onPointerOut={ handleMeshOnPointerLeave }
                onClick={ handleOnCLick }
                
            />

            <Html
                ref={textRef}
                position={[index * 0.01, -2, 0]}
                center
                
            >
                <div 
                    className="work-label"
                    
                >
                    {
                        name.split('').map((char, i)=>{
                            return (
                                
                                char === " "?  <span ref={el=>lettersRef.current[i] = el} key={i}>&nbsp;</span> :<span ref={el=>lettersRef.current[i] = el} key={i} className='letter'>{char}</span>
                            )
                        })
                    }
                </div>
            </Html>
            
        </group>

    )
}


export function ProjectsCards({gap = 0.3, imageW = 2.5 }) {

    const speedWheel = 0.03;
    const speedDrag = -0.1;
    const file = 'projects.json'

    const [$root, setRoot] = useState();
    const [getWorks, setWorks] = useState({});

    const { viewport } = useThree();
    const xW = imageW + gap


    const progress = useRef(0);
    const startX = useRef(0);
    const isDown = useRef(false)
    const $items = useMemo(() => {
        if ($root) return $root.children;
    }, [$root]);


    // display idem on scroll
    const displayItems = (item, index, active) => {


        gsap.to(item.position, {
            x: (index - active) * xW,
            y: 0,
            duration: 3,
            ease: "power3.out",
        });
    };

    //handle on wheel
    const handleWheel = (e)=>{
        const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
         const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX;
         progress.current = progress.current + wheelProgress * speedWheel;
    }

    /*--------------------
    Handle Move
    --------------------*/
    const handleMove = (e) => {
        if (!isDown.current) return;
        const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const mouseProgress = (x - startX.current) * speedDrag;
        progress.current = progress.current + mouseProgress;
        startX.current = x;
    }

    // handle on pointerDown
    const handleDown = (e) => {
        isDown.current = true;
        startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    };
    
    
    // handle on pointerDown
    const handleUp = (e) => {
        isDown.current = false;
    };


    // animation frame
    useFrame(()=>{

        progress.current = Math.max(0, Math.min(progress.current, 100));
        const active = Math.floor((progress.current / 100) * ($items.length - 1));

        const delay = progress.current === 0 ? 1.3 : 0
        $items.forEach((item, index) => displayItems(item, index, active));
    })


    useEffect(()=>{
        const url = dbConfig.dns+dbConfig.path+file

        if(Object.values(getWorks).length === 0)
        {

            retrieveData(url)
            .then(response=>{
                setWorks({...response})
            })
        }



    }, [getWorks])
    

    return(        
        <>
        
        
            <mesh
                onWheel={ handleWheel }
                onPointerMove={ handleMove }
                onPointerDown={ handleDown }
                onPointerLeave={ handleUp }
                onPointerCancel={ handleUp }
                onPointerUp={ handleUp }
            >
                <planeGeometry args={[viewport.width, viewport.height]} />
                <meshBasicMaterial transparent={true} opacity={0} />
            </mesh>
            <group
                ref={setRoot}
            >
                {
                    Object.values(getWorks).map((project, i)=>{
                        return(
                            
                            <ProjectCard
                                key={i}
                                index = {i}
                                src = {project.src}
                                name = { project.name}
                                slug = { project.slug }
                            />
                        )
                    })
                }
            </group>
        </>
    )
}
