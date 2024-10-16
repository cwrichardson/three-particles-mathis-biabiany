'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';

import { css } from 'styled-system/css';
import { splitCssProps } from 'styled-system/jsx';
import { r3f } from '@/utils/r3f';

const fallbackRenderer = ({ error }) => {
    console.error('Error rendering animation canvas', error.message);
    console.debug(error);

    return null;
}

/**
 * Panda version of r3f Canvas.
 * Style and ClassName are passed to a `div` container it creates. Other
 * properties and general documenation is best found here:
 * @see https://gracious-keller-98ef35.netlify.app/docs/api/canvas/
 *
 * @param {*} props 
 * @returns 
 */
export function Scene(props) {
    const [ cssProps, canvasProps ] = splitCssProps(props);
    const { css: containerCssProps, ...containerStyleProps } = cssProps;

    const classes = css(containerStyleProps, containerCssProps);

    /**
     * R3F annoying sets some inline style attributes on the containing `div`
     * that are not documented anywhere. We handle the equivalent with panda,
     * so we need to unset them.
     */

    const styleReset = {
        position: undefined,
        width: undefined,
        height: undefined,
        overflow: undefined,
        pointerEvents: undefined,
        ...canvasProps?.style
    };

    return (
        <ErrorBoundary fallbackRender={fallbackRenderer}>
            <Canvas
              className={classes}
              style={styleReset}
              {...canvasProps}
              >
                <r3f.Out />
                <Preload all />
              </Canvas>
        </ErrorBoundary>
    )
}