export const vertex = /* glsl */ `
    uniform float uTime;
    varying vec2 vUv;

    void main() {
        vUv = uv;

        vec4 mvPosition = modelViewMatrix * vec4( position, 1. );
        // start with big particles; give them some perspective
        gl_PointSize = 200. * ( 1. / - mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
    }
`;