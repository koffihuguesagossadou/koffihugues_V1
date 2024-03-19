import { useRef, useMemo, useContext, useCallback, useEffect, useState } from "react"
import { useFrame, useThree, useLoader } from "@react-three/fiber"
import {  MathUtils, TextureLoader } from "three"
import { Image, Html, MeshDistortMaterial, useTexture } from '@react-three/drei';
import {  PageTransitionContext } from "../App";
import { easing } from 'maath'
import { useNavigate } from "react-router-dom"; 
import gsap from 'gsap';
import { retrieveData } from "../funcs/app";
import { dbConfig, dbFiles } from "../config/defaults";
import vertexShader from '../glsl/vertexShader.glsl';
import fragmentShader from '../glsl/fragmentShader.glsl';
import vertexWaveShader from '../glsl/vertexWaveShader.glsl';
import fragmentWaveShader from '../glsl/fragmentWaveShader.glsl';

export function ProjectCard({name, src, index,slug}) {
    


    const imageRef = useRef();
    const textRef = useRef();
    const lettersRef = useRef([])
    const imageSrc = import.meta.env.DEV ? 'images/'  : 'https://dlfsookdovlgl.cloudfront.net'


    const texture = useMemo(()=>{
        return useLoader(TextureLoader,  imageSrc+src+'/main.webp')
    })

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
          x: 0 * index ,
          y: 0,
        };
    }, [index]);

    const uniforms = useMemo(()=>({
        
        uTexture: {value:texture},
        uHover: {value: 1.0},
        uIndex: {
            value: parseFloat(index) / 100
        },
        uTime: {
            value: 0.0
        },
        uRes: { value: { x: 1, y: 1 } },
        uImageRes: {
          value: { x: texture.source.data.width, y: texture.source.data.height }
        },
        uScroll : {value:0.0}
        
    }), [index])


    useFrame((state, delta) => {

        gsap.to(lettersRef.current,{
            y: hovered ? 0 : '100%',
            rotateX: 0,
            stagger:{
                amount: 0.2
            }
        })

        
        const { clock } = state;
        imageRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
        // imageRef.current.material.uniforms.uScroll.value = MathUtils.lerp(imageRef.current.material.uniforms.uScroll.value, 1.0, 0.1)

        
        easing.damp(imageRef.current.material.uniforms.uHover, 'value', hovered ? 0 : 1.0, 0.25, delta)
        easing.damp(imageRef.current.material, 'grayscale', hovered ? 0 : 0.8, 0.25, delta)
        easing.damp(imageRef.current.material, 'zoom', hovered ? 1.4 : 1.2, 0.25, delta)
    });


    
    return(
        
        <group>
        


            {/* <Image 
                ref={imageRef}
                zoom={1.4}
                texture={texture}
                scale={[photo.width, photo.height, 1]} 
                onPointerOver={ handleMeshOnPointerEnter }
                onPointerOut={ handleMeshOnPointerLeave }
                onClick={ handleOnCLick }
                
            /> */}

            <mesh
                ref={imageRef}
                position={[0, 0, 0]}
                scale={1.0}
                onPointerOver={ handleMeshOnPointerEnter }
                onPointerOut={ handleMeshOnPointerLeave }
                onClick={ handleOnCLick }
            >
                <planeGeometry  args={[photo.width, photo.height, 128, 128]}/>
                <shaderMaterial 
                    uniforms={uniforms}
                    fragmentShader={fragmentWaveShader}
                    vertexShader={vertexWaveShader}
                />
            </mesh>

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

    const speedWheel = 0.05;
    const speedDrag = -0.1;

    const [$root, setRoot] = useState();
    const [getWorks, setWorks] = useState({});
    const [wheelSatus, setWheelStatus] = useState(false)

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


        if(item.position)
        {

            gsap.to(item.position, {
                x: (index - active) * xW,
                y: 0,
                duration: 3,
                ease: "power3.out",
            });
        }

    };


    const wheelDistortionEffect = ($items, scrollState) => {
        if($items){
            $items.forEach((item, _index)=>{

                gsap.to(item.children[0].material.uniforms.uScroll,{
                    value: scrollState > 0 ? 1.0 : -1.0,
                })


            })
        }
    }


    // on scroll curve items
    // const curveItems = (item, wheelProgress) =>{
    //     if (item.material.) {
            
    //     }
    // }

    //handle on wheel
    const handleWheel = (e)=>{
        const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
         const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX;
         progress.current = progress.current + wheelProgress * speedWheel;
         wheelDistortionEffect($items, wheelProgress)

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
    
    
    // handle on pointerUp
    const handleUp = (e) => {
        isDown.current = false;
    };


    // animation frame
    useFrame(()=>{

        progress.current = Math.max(0, Math.min(progress.current, 100));
        const active = Math.floor((progress.current / 100) * ($items.length - 1));

        const delay = progress.current === 0 ? 1.3 : 0
        $items.forEach((item, index) => displayItems(item, index, active));
        // $items.forEach((item, index)=>{
        //     item.children[0].material.uniforms.uScroll.value = MathUtils.lerp(item.children[0].material.uniforms.uScroll.value, (progress.current * 0.01), 0.1)
        // })
    })


    useEffect(()=>{

        
        if(Object.values(getWorks).length === 0)
        {

            retrieveData(process.env.JSON_URL+dbConfig.path+dbFiles.projects)
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
