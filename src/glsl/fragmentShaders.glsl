precision mediump float;

uniform sampler2D uTexture;
uniform vec3 uColor;
varying float vWave;
varying vec2 vUv;

void main(){

    float ambientStrength = .3; // Adjust the ambient strength

    float wave = vWave * 0.2;
    vec3 texture = texture2D(uTexture, vUv + wave).rgb;

    // Apply ambient lighting
    vec3 finalColor = texture + uColor * ambientStrength;
    gl_FragColor = vec4(finalColor, 1.0);
}
