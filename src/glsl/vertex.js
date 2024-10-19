export const vertex = /* glsl */ `
    uniform float uMove;
    uniform vec2 uMouse; // projected mouse position
    uniform sampler2D uT1;
    uniform sampler2D uT2;
    uniform float uTime;

    varying vec2 vCoordinates;
    varying vec2 vUv;

    // attributes are per-point
    attribute vec3 aCoordinates;
    // randomness: poitive or negative 1
    attribute float aDirection;
    attribute float aOffset;
    attribute float aPress;
    attribute float aSpeed;

    void main() {
        vUv = uv;

        vec3 pos = position;

        // NOT STABLE

        // pos.z = position.z + uMove * aSpeed + aOffset;
        // uMove * aSpeed was for mouse control; we'll drop that
        // and figure out a speed later
        // pos.z = position.z + aOffset;
        // add a modulo, so we can never move past it
        // pos.z = mod(position.z + aOffset, 2000.);
        // we're only seeing 1/2 the particles, because they're past the
        // camera, so subtract 1,000
        pos.z = mod(position.z + aOffset, 2000.) - 1000.;
        // add a little wobble
        pos.x += sin(aSpeed) * 3.;
        pos.y += sin(aSpeed) * 3.;

        // STABLE
        vec3 stable = position;

        // physics change for when mouse is around
        float dist = distance(stable.xy, uMouse);
        float area = 1. - smoothstep(0., 150., dist);

        stable.x += 50. * sin(uTime * aPress ) * aDirection * area;
        stable.y += 50. * sin(uTime * aPress ) * aDirection * area;
        stable.z += 200. * cos(uTime * aPress ) * aDirection * area;

        vec4 mvPosition = modelViewMatrix * vec4( stable, 1. );
        // start with big particles; give them some perspective
        gl_PointSize = 200. * ( 1. / - mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;

        vCoordinates = aCoordinates.xy;
    }
`;