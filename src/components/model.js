'use client';

import dynamic from 'next/dynamic';
import { Suspense, useMemo, useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';

import { Points } from '@/components/points';

const View = dynamic(() => import('src/components/view')
    .then((mod) => mod.View), {
        ssr: false
    }
);

export function Model(props) {
    const meshRef = useRef();
    const rows = 512;
    const columns = 512;
    
    const [
        coordinates,
        direction,
        offsets,
        press,
        speeds,
        vertices
    ] = useMemo(() => {
        const coordinates = [];
        const direction = [];
        const offsets = [];
        const press = [];
        const speeds = [];
        const positions = [];

        function rand(a, b) {
            return a + (b - a) * Math.random();
        }

        for (let x = 0; x < columns; x++ ) {
            // center x
            const posX = x - 256;
            for ( let y = 0; y < rows; y++ ) {
                // center y
                positions.push(posX * 2, (y - 256) * 2, 0);
                coordinates.push( x, y, 0 );

                // somewhere around where we put the camera
                offsets.push(rand(-1000,1000));
                // offsets between 0-1, but ... not 0, or even slow
                speeds.push(rand(0.4,1));
                // direction just positive or negative
                direction.push(Math.random() > 0.5 ? 1 : -1);
                // press?
                press.push(rand(0.4,1));
            }
        }

        return ([
            new Float32Array(coordinates),
            new Float32Array(direction),
            new Float32Array(offsets),
            new Float32Array(press),
            new Float32Array(speeds),
            new Float32Array(positions)
        ]);
    }, [])


    return (
        <View orbit {...props}>
        {/* <View {...props}> */}
            <Suspense fallback={null}>
                <Points
                    coordinates={coordinates}
                    offsets={offsets}
                    speeds={speeds}
                    vertices={vertices}
                    direction={direction}
                    press={press}
                    ref={meshRef}
                />
                <PerspectiveCamera
                    makeDefault
                    near={0.1}
                    far={3000}
                    position={[0, 0, 1000]}
                />
            </Suspense>
        </View>
    )
}