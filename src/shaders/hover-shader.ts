import { ShaderMaterial, Color } from "three";

export const createHoverMaterial = (color = "#FF6410") => {
  return new ShaderMaterial({
    uniforms: {
      uColor: { value: new Color(color) },
      uPower: { value: 1 },
    },
    vertexShader: `
      varying float vDot;
      void main() {
        vec3 vNormal = normalize(normalMatrix * normal);
        vec3 vView = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
        vDot = 1.0 - max(dot(vNormal, -vView), 0.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uPower;
      varying float vDot;

      void main() {
        float f = pow(vDot, uPower);
        gl_FragColor = vec4(uColor * f, f);
      }
    `,
    transparent: true,
  });
};
