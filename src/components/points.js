'use client';

import { forwardRef, useRef } from 'react';
import { DoubleSide, Vector2 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import { vertex } from '@/glsl/vertex';
import { fragment } from '@/glsl/fragment';
import gsap from 'gsap';

export const Points = forwardRef((props, ref) => {
    const {
        coordinates, 
        direction,
        offsets,
        press,
        speeds,
        vertices
    } = props;
    const shaderRef = useRef();
    const testRef = useRef();
    
    const canTexture = useTexture('/cans.png');
    const imposterTexture = useTexture('/imposter.webp');
    const maskTexture = useTexture('/particle_mask.jpg');
    
    useFrame((state, delta, xrFrame) => {
        /* 
         * Instead of using onPointerMove event, we do our calculations
         * here, because the event is very expensive with points (calculating
         * a new ray to each point).
         * 
         * This also helps because there could be several pointer position
         * changes per frame, and we don't need to do those additional
         * calculations.
         */
        const { raycaster } = state;
        const hovered = raycaster.intersectObjects([testRef.current]);
        // console.log(state);
        // console.log(delta);

        if (hovered.length) {
            // console.log(hovered[0])
            shaderRef.current.uniforms.uTime.value += delta;
            shaderRef.current.uniforms.uMouse.value.x = hovered[0].point.x;
            shaderRef.current.uniforms.uMouse.value.y = hovered[0].point.y;
        }
    })

    function mouseDown() {
        gsap.to(shaderRef.current.uniforms.uMousePressed, {
            duration: 0.5,
            value: 1
        })
    }

    function mouseUp() {
        gsap.to(shaderRef.current.uniforms.uMousePressed, {
            duration: 0.5,
            value: 0
        })
    }

    function wheel(e) {
        shaderRef.current.uniforms.uMove.value += e.deltaY / 4000;
    }
    
    return (
        <>
            <points ref={ref}>
                <bufferGeometry
                    width={1}
                    height={1}
                    widthSegments={1}
                    heightSegments={1}
                    >
                    <bufferAttribute
                        attach={'attributes-position'}
                        args={[vertices, 3]}
                        />
                    <bufferAttribute
                        attach={'attributes-aCoordinates'}
                        args={[coordinates, 3]}
                        />
                    <bufferAttribute
                        attach={'attributes-aSpeed'}
                        args={[speeds, 1]}
                        />
                    <bufferAttribute
                        attach={'attributes-aOffset'}
                        args={[offsets, 1]}
                        />
                    <bufferAttribute
                        attach={'attributes-aDirection'}
                        args={[direction, 1]}
                        />
                    <bufferAttribute
                        attach={'attributes-aPress'}
                        args={[press, 1]}
                        />
                </bufferGeometry>
                <shaderMaterial
                    ref={shaderRef}
                    extensions={{
                        derivatives: "#extension GL_OES_standard_derivatives : enable"
                    }}
                    uniforms={{
                        uMask: { value: maskTexture },
                        uMouse: { value: new Vector2(0,0) },
                        uMousePressed: { value: 0 },
                        uMove: { value: 0 },
                        uT1: { value: canTexture },
                        uT2: { value: imposterTexture },
                        uTime: { value: 0 }
                    }}
                    vertexShader={vertex}
                    fragmentShader={fragment}
                    side={DoubleSide}
                    depthTest={false}
                    depthWrite={false}
                    transparent
                    />
            </points>
            {/* Invisible geometry to catch our raycaster */}
            <mesh ref={testRef} onPointerDown={mouseDown} onPointerUp={mouseUp} onWheel={wheel}>
                <planeGeometry args={[1000, 1000]} />
                <meshBasicMaterial transparent opacity={0.0} depthWrite={false} />
            </mesh>
        </>
    )
})

Points.displayName = 'Points';