'use client';

import { forwardRef, useRef } from 'react';
import { DoubleSide, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { Bvh, useTexture } from '@react-three/drei';

import { vertex } from '@/glsl/vertex';
import { fragment } from '@/glsl/fragment';

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
    
    const canTexture = useTexture('/cans.png');
    const imposterTexture = useTexture('/imposter.webp');
    const maskTexture = useTexture('/particle_mask.jpg');
    
    useFrame((state, delta, xrFrame) => {
        // do animation
        shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    })

    const pointerMoveHandler = ((e) => {
        e.stopPropagation();
        shaderRef.current.uniforms.uMouse.value = e.point;
    })
    
    return (
        <Bvh>
            <points ref={ref} onPointerMove={pointerMoveHandler}>
            {/* <points ref={ref} onPointerMove={() => {}}> */}
            {/* <points ref={ref} onClick={() => {}}> */}
            {/* <points ref={ref}> */}
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
                        uMouse: { value: new Vector3(0, 0, 0) },
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
        </Bvh>
    )
})

Points.displayName = 'Points';