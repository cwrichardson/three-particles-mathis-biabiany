export const fragment = /* glsl */ `
    uniform sampler2D uMask;
    uniform float uMove;
    uniform sampler2D uT1;
    uniform sampler2D uT2;

    varying vec2 vCoordinates;

    void main() {
        vec4 maskTexture = texture2D(uMask, gl_PointCoord);
        vec2 myUv = vec2(vCoordinates.x / 512., vCoordinates.y / 512.);
        // vec4 image = texture2D(uT2, myUv);
        vec4 tt1 = texture2D(uT1, myUv);
        vec4 tt2 = texture2D(uT2, myUv);

        vec4 final = mix(tt1, tt2, fract(uMove));

        // gl_FragColor = vec4(vCoordinates.x / 512. , vCoordinates.y / 512. , 0., 1.);
        gl_FragColor = final;
        gl_FragColor.a *= maskTexture.r;
    }
`;