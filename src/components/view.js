'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { View as DreiView, OrbitControls, Stats } from '@react-three/drei';

import { Box } from 'styled-system/jsx';
import { Three } from '@/utils/three';

/**
 * Core View component. `children` are passed into a DREI view and
 * sent to the gl Canvas via tunnel-rat. Props not directly defined
 * here are passed through to the HTML div, which is a Panda styled
 * div.
 * 
 * @param {boolean} Orbit - send `OrbitControls` into the Canvas
 */
const View = forwardRef(({ children, orbit, ...props}, ref) => {
    const localRef = useRef(null);
    useImperativeHandle(ref, () => localRef.current);

    return (
        <>
            <Box ref={localRef} {...props} />
            <Three>
                <DreiView track={localRef}>
                    {children}
                    {orbit && <OrbitControls />}
                    <Stats />
                </DreiView>
            </Three>
        </>
    )
})

View.displayName = 'View';

export { View };