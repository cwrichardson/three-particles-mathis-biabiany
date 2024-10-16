'use client';

import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide } from 'three';

import { vertex } from '@/glsl/vertex';
import { fragment } from '@/glsl/fragment';

export const Points = forwardRef((props, ref) => {
    const { vertices } = props;
    const shaderRef = useRef();

    useFrame((state, delta, xrFrame) => {
        // do animation
        // shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    })

    return (
        <points ref={ref}>
            <bufferGeometry
              width={1}
              height={1}
              widthSegments={1}
              heightSegments={1}
            >
                <bufferAttribute attach={'attributes-position'} args={[vertices, 3]} />
            </bufferGeometry>
            <shaderMaterial
              ref={shaderRef}
              extensions={{ derivatives: "#extension GL_OES_standard_derivatives : enable"}}
              uniforms={{
                  uTime: { value: 0 }
              }}
              vertexShader={vertex}
              fragmentShader={fragment}
              side={DoubleSide}
              depthTest={false}
              transparent
            />
        </points>
    )
})

Points.displayName = 'Points';