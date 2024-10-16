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
    
    const vertices = useMemo(() => {
        const positions = [];
        for (let x = 0; x < columns; x++ ) {
            // center x
            const posX = x - 256;
            for ( let y = 0; y < rows; y++ ) {
                // center y
                positions.push(posX * 2, (y - 256) * 2, 0);
            }
        }

        return new Float32Array(positions);
    }, [])


    return (
        <View orbit {...props}>
            <Suspense fallback={null}>
                <Points vertices={vertices} ref={meshRef} />
                <PerspectiveCamera makeDefault near={0.1} far={3000} position={[0, 0, 1000]} />
            </Suspense>
        </View>
    )
}