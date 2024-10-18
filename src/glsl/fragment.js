export const fragment = /* glsl */ `
    uniform sampler2D uMask;
    uniform sampler2D uT1;
    uniform sampler2D uT2;

    varying vec2 vCoordinates;

    void main() {
        vec4 maskTexture = texture2D(uMask, gl_PointCoord);
        vec2 myUv = vec2(vCoordinates.x / 512., vCoordinates.y / 512.);
        vec4 image = texture2D(uT2, myUv);

        // gl_FragColor = vec4(vCoordinates.x / 512. , vCoordinates.y / 512. , 0., 1.);
        gl_FragColor = image;
        gl_FragColor.a *= maskTexture.r;
    }
`;