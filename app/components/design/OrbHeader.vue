<template>
  <div class="hero-canvas-container" ref="containerRef">
    <canvas ref="canvasRef" :style="{ opacity: props.opacity }"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as THREE from "three";

const props = defineProps({
  opacity: {
    type: Number,
    default: 1.0,
    validator: (value) => value >= 0 && value <= 1,
  },
  lineIntensity: {
    type: Number,
    default: 1.5,
  },
});

const containerRef = ref(null);
const canvasRef = ref(null);

let renderer, scene, camera, material, mesh;
let animationId = null;
let resizeObserver = null;
let observer = null; // Pindahkan deklarasi observer ke sini agar cleanup termonitor

const mouse = { x: 0, y: 0 };
const targetMouse = { x: 0, y: 0 };

// Helper: Ambil warna dari CSS Variables
const getColorFromCSS = (varName, fallback) => {
  if (typeof window === "undefined") return new THREE.Color(fallback);
  const colorStr =
    getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim() || fallback;

  // Handle format rgb() / rgba() agar aman untuk THREE.Color
  const rgbMatch = colorStr.match(/\(([^)]+)\)/);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch[1].split(",").map(parseFloat);
    return new THREE.Color(r / 255, g / 255, b / 255);
  }

  return new THREE.Color(colorStr);
};

// Sekarang cuma urus warna line, background udah gak dipegang shader lagi
const updateColors = () => {
  if (!material) return;
  material.uniforms.u_lineColor1.value = getColorFromCSS(
    "--hero-line-color-1",
    "#e5ddf5",
  );
  material.uniforms.u_lineColor2.value = getColorFromCSS(
    "--hero-line-color-2",
    "#f5ddd1",
  );
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform vec3 u_lineColor1;
  uniform vec3 u_lineColor2;
  uniform float u_lineIntensity;
  
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 mouse = u_mouse * 2.0 - 1.0;
    mouse.x *= u_resolution.x / u_resolution.y;

    // 1. Mouse Distortion
    float distToMouse = distance(uv, mouse);
    float mStr = exp(-distToMouse * 2.0) * 0.3;
    vec2 dir = normalize(uv - mouse + 0.001);
    vec2 p = uv - dir * mStr;

    // 2. Structured Curvature
    float t = u_time * 0.4;
    float field = sin(p.x * 2.0 + t * 0.8) * cos(p.y * 2.5 - t * 0.6);
    field += 0.5 * sin((p.x + p.y) * 1.5 + t);
    float r = length(p);
    field += sin(r * 4.0 - t * 0.5) * 0.4;

    // 3. Contour Lines
    float freq = 5.0;
    float bands = abs(fract(field * freq) - 0.5) * 2.0; 
    float lineWidth = 0.025;
    float lines = smoothstep(lineWidth, 0.0, bands);

    // 4. Patchiness
    float fade = sin(u_time * 0.8 + p.y * 2.0) * 0.5 + 0.5;
    fade = smoothstep(0.3, 0.8, fade);

    float fade2 = sin(u_time * 0.4 + p.x * 1.5) * 0.5 + 0.5;
    fade2 = smoothstep(0.4, 0.9, fade2);

    lines *= mix(0.6, 1.0, fade2);

    // 5. Vignette
    float vignette = smoothstep(1.6, 0.4, length(uv));
    lines *= vignette;

    // 6. Warna dari CSS Variables
    vec3 lineColor = mix(u_lineColor1, u_lineColor2, uv.y * 0.5 + 0.5);
    
    // 7. Output: background transparan total, cuma line yang punya alpha
    float alpha = lines * u_lineIntensity;
    gl_FragColor = vec4(lineColor, alpha);
  }
`;

const initThree = () => {
  const container = containerRef.value;
  const canvas = canvasRef.value;
  const width = container.clientWidth;
  const height = container.clientHeight;

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0); // fully transparent clear

  const geometry = new THREE.PlaneGeometry(2, 2);

  material = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0.0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_lineColor1: { value: new THREE.Color("#e5ddf5") },
      u_lineColor2: { value: new THREE.Color("#f5ddd1") },
      u_lineIntensity: { value: props.lineIntensity },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
  });

  updateColors();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  window.addEventListener("mousemove", onMouseMove);
  resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(container);
};

const onMouseMove = (event) => {
  targetMouse.x = event.clientX / window.innerWidth;
  targetMouse.y = 1.0 - event.clientY / window.innerHeight;
};

const onResize = () => {
  if (!containerRef.value || !renderer) return;
  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;
  renderer.setSize(width, height);
  material.uniforms.u_resolution.value.set(width, height);
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  mouse.x += (targetMouse.x - mouse.x) * 0.05;
  mouse.y += (targetMouse.y - mouse.y) * 0.05;
  material.uniforms.u_time.value = performance.now() * 0.001;
  material.uniforms.u_mouse.value.set(mouse.x, mouse.y);
  renderer.render(scene, camera);
};

const cleanup = () => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener("mousemove", onMouseMove);
  if (resizeObserver) resizeObserver.disconnect();
  if (observer) observer.disconnect(); // Cleanup observer tema
  if (mesh) {
    mesh.geometry.dispose();
    mesh.material.dispose();
  }
  if (renderer) renderer.dispose();
};

// Update intensity jika diubah dinamis
watch(
  () => props.lineIntensity,
  (newVal) => {
    if (material) {
      material.uniforms.u_lineIntensity.value = newVal;
    }
  },
);

onMounted(() => {
  initThree();
  animate();

  // Observer untuk memantau perubahan kelas di <body> (Dark Mode toggle)
  // sekarang cuma buat update warna line, background udah otomatis ikut body
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mu) => {
      if (mu.attributeName === "class") {
        updateColors();
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

onBeforeUnmount(() => {
  cleanup();
});
</script>

<style scoped>
.hero-canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
  transition: opacity 0.4s ease;
}
</style>
