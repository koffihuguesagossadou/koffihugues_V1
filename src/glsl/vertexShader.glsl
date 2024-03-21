varying vec2 vUv;
uniform float uTime;
uniform float uIndex;
uniform float uScroll;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
   modelPosition.x = modelPosition.x + ((sin(uv.y * uScroll * -3.1415926535897932384626433832795)  * 2.0) * 0.2);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}