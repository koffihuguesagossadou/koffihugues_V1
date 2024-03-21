precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uRes;
uniform vec2 uImageRes;
uniform float uHover;

uniform vec3 uColor;
varying float vWave;
varying vec2 vUv;


/*------------------------------
  Background Cover UV
  --------------------------------
  u = basic UV
  s = screensize
  i = image size
  ------------------------------*/
vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
  float rs = s.x / s.y; // Aspect screen size
  float ri = i.x / i.y; // Aspect image size
  vec2 st = rs < ri ? vec2(i.x * s.y / i.y , s.y) : vec2(s.x, i.y * s.x / i.x); // New st
  vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
  return u * s / st + o;
}




void main(){

    float ambientStrength = 0.3; // Adjust the ambient strength

    float wave = vWave * 0.2;
    vec2 uv = CoverUV(vUv, uRes, uImageRes);

    // Calculate centered uv coordinates for scaling
    vec2 centeredUV = uv - 0.5;
    // Apply the scale and re-center the UV coordinates
    vec2 scaledUV = centeredUV * vec2(0.8, 0.8) + 0.5;

    vec3 texture = texture2D(uTexture, scaledUV+ wave).rgb;

    // Convert to grayscale
    float grayscale = (texture.r + texture.g + texture.b) / 3.3;
    vec3 grayscaleColor = vec3(grayscale);

// Calculate final color with transition effect
    vec3 finalColor = mix(grayscaleColor, texture, smoothstep(1.0, 0.0, uHover));
    // Apply ambient lighting
    finalColor += uColor * ambientStrength;
    gl_FragColor = vec4(finalColor, 1.0);
}
