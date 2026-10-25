'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Compass,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCw,
  Sun,
  Sunset,
  Sparkles,
  Star,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sliders,
  Layers,
  MapPin,
  Calendar,
  Ruler,
  Award
} from 'lucide-react';

interface Hotspot {
  id: string;
  yaw: number; // in degrees (0 to 360)
  pitch: number; // in degrees (-45 to 45)
  title: string;
  category: string;
  description: string;
  material: string;
  finish: string;
  warranty: string;
}

interface ApartmentStory {
  id: string;
  name: string;
  tagline: string;
  location: string;
  type: string;
  area: string;
  handoverDate: string;
  image360: string;
  homeowner: {
    name: string;
    designation: string;
    photo: string;
    rating: number;
    quote: string;
    verifiedBadge: string;
  };
  palette: string[];
  keyFeatures: string[];
  hotspots: Hotspot[];
}

const APARTMENT_STORIES: ApartmentStory[] = [
  {
    id: 'falcon-crest',
    name: 'Falcon Crest Royal Penthouse',
    tagline: 'Warm Contemporary Luxury with Fluted Walnut & Statuario Marble',
    location: 'Patia, Bhubaneswar, Odisha',
    type: '4 BHK Luxury Penthouse',
    area: '2,950 sq.ft.',
    handoverDate: 'January 2026',
    image360: '/images/kalyan/360/falcon_crest_360.jpg',
    homeowner: {
      name: 'Dr. Soumya Ranjan & Lipsa Mohanty',
      designation: 'Consultant Neurosurgeon & Lead Architect, AIIMS Bhubaneswar',
      photo: '/images/kalyan/testimonials/client1.jpg',
      rating: 5.0,
      quote:
        'Kalyan Design Studio turned our bare-shell 4 BHK penthouse into a true architectural masterpiece. From the Italian Statuario marble with zero-edge polish to the curved acoustic fluted walnut panels, the factory finish exceeded our wildest expectations. Their 3D walkthrough matched the actual handover 100%, and they completed everything in exactly 45 working days with zero cost escalation. Kalyan and his team are the absolute gold standard of luxury turnkey interiors in Odisha.',
      verifiedBadge: 'Verified Turnkey Handover • 45-Day Delivery',
    },
    palette: ['#B68953', '#1A1815', '#F7F3EB', '#FF8526', '#3D342B'],
    keyFeatures: [
      'Book-matched Italian Statuario Marble Flooring',
      'Curved Acoustic Fluted American Walnut Paneling',
      'Circadian 3000K Philips Hue Concealed Cove Lighting',
      'Custom Curved Bouclé Sectional & Bronze Accents',
    ],
    hotspots: [
      {
        id: 'fc-1',
        yaw: 28,
        pitch: -8,
        title: 'Custom Curved Bouclé Sectional',
        category: 'Bespoke Furniture',
        description: 'Engineered high-density ergonomic curved sectional upholstered in imported stain-resistant bouclé textile with brass pedestal base.',
        material: 'High-resilience foam, Hardwood frame, Bouclé',
        finish: 'Off-White Textured Matte',
        warranty: '10 Years Structural Warranty',
      },
      {
        id: 'fc-2',
        yaw: 125,
        pitch: 2,
        title: 'Italian Statuario Marble Flooring',
        category: 'Flooring & Stonework',
        description: 'Book-matched 1200x2400mm imported Italian marble slabs with mirror diamond polish and zero-grout seamless transit lines.',
        material: 'Grade-A Italian Statuario Marble',
        finish: 'Nano-sealed High Gloss Diamond Polish',
        warranty: 'Lifetime Natural Stone Assurance',
      },
      {
        id: 'fc-3',
        yaw: 285,
        pitch: 6,
        title: 'Fluted American Walnut Wall Paneling',
        category: 'Architectural Millwork',
        description: 'Factory-calibrated E1 grade waterproof marine ply wrapped in natural American walnut veneer with recessed champagne gold metal T-profiles.',
        material: 'Century Marine Ply + Natural Walnut Veneer',
        finish: 'Italian Polyurethane (PU) Matte Clear Coat',
        warranty: '10 Years Anti-Termite & Borer Warranty',
      },
      {
        id: 'fc-4',
        yaw: 200,
        pitch: 22,
        title: 'Dual-Tier Floating Cove Ceiling',
        category: 'False Ceiling & Lighting',
        description: 'Saint-Gobain Gyproc false ceiling with acoustic perimeter steps and integrated 3000K warm circadian indirect LED illumination.',
        material: 'Gyproc Gypsum + Aluminium Framing',
        finish: 'Asian Paints Royale Luxury Velvet Touch',
        warranty: '5 Years Lighting & Structure Guarantee',
      },
    ],
  },
  {
    id: 'utkal-kanika',
    name: 'Utkal Kanika Royal Residence',
    tagline: 'Opulent Master Suite with Backlit Honey Onyx & Chevron Oak',
    location: 'Kalpana Square, Bhubaneswar, Odisha',
    type: '3 BHK Royal Residence & Suite',
    area: '2,400 sq.ft.',
    handoverDate: 'November 2025',
    image360: '/images/kalyan/360/utkal_kanika_360.jpg',
    homeowner: {
      name: 'Rajesh & Sneha Pattnaik',
      designation: 'Managing Director, Pattnaik Group of Logistics',
      photo: '/images/kalyan/testimonials/client2.jpg',
      rating: 5.0,
      quote:
        'The backlit honey onyx wall in our master suite is the centerpiece of our entire home—every guest who visits is completely spellbound. What stood out most was Kalyan’s absolute transparency in materials. They gave us physical samples of every European oak plank, veneer sheet, and Hafele fitting before manufacturing began. Living here feels like staying in a 7-star luxury resort right in Bhubaneswar.',
      verifiedBadge: 'Verified Turnkey Handover • Bespoke Luxury',
    },
    palette: ['#FF8526', '#D4AF37', '#2A2521', '#EAE6DF', '#735B42'],
    keyFeatures: [
      'Backlit Translucent Pakistani Honey Onyx Feature Wall',
      'Engineered European White Oak Chevron Parquet Flooring',
      'Slim-Profile Anodized Tinted Glass Walk-In Wardrobe',
      'Acoustic Wave-Fluted Circular Skylight Ceiling',
    ],
    hotspots: [
      {
        id: 'uk-1',
        yaw: 0,
        pitch: 5,
        title: 'Backlit Translucent Honey Onyx Wall',
        category: 'Exotic Feature Stone',
        description: 'Book-matched natural honey onyx stone panels backlit with an intelligent dimmable 3500K-4500K high-CRI LED matrix for evening warmth.',
        material: 'Imported Translucent Honey Onyx',
        finish: 'Honed & Polished Edge Sealed',
        warranty: '10 Years Structural & LED Warranty',
      },
      {
        id: 'uk-2',
        yaw: 160,
        pitch: -15,
        title: 'Chevron European Oak Parquet',
        category: 'Premium Wood Flooring',
        description: 'Precision 45-degree angle chevron engineered European white oak planks with acoustic cork dampening underlayment.',
        material: 'European White Oak with 4mm Wear Layer',
        finish: 'Bona Natural UV Matte Hardwax Oil',
        warranty: '15 Years Surface & Plank Warranty',
      },
      {
        id: 'uk-3',
        yaw: 75,
        pitch: -2,
        title: 'Tinted Glass Walk-In Wardrobe',
        category: 'Modular Wardrobes',
        description: 'Floor-to-ceiling slim black anodized aluminum profile wardrobes with reflective smoked bronze glass and sensor-activated internal illumination.',
        material: 'Toughened Smoked Glass + Hafele Profiles',
        finish: 'Anodized Matte Black & Warm Strip LED',
        warranty: '10 Years Hardware & Alignment Warranty',
      },
      {
        id: 'uk-4',
        yaw: 350,
        pitch: 28,
        title: 'Acoustic Wave Fluted Ceiling Canopy',
        category: 'Architectural Ceiling',
        description: 'Parametric fluted acoustic canopy framing a central circular ambient light dome, creating sound-insulated tranquility.',
        material: 'MDF Acoustic Slats + Gyproc Core',
        finish: 'Warm Pearl White Textured Finish',
        warranty: '5 Years Structural Assurance',
      },
    ],
  },
  {
    id: 'tata-ariana',
    name: 'Tata Ariana Modern Duplex',
    tagline: 'Minimalist Scandinavian Modular Kitchen & Open-Concept Dining',
    location: 'Kalinga Nagar, Bhubaneswar, Odisha',
    type: '3 BHK Scandinavian Duplex',
    area: '2,100 sq.ft.',
    handoverDate: 'February 2026',
    image360: '/images/kalyan/360/tata_ariana_360.jpg',
    homeowner: {
      name: 'Er. Debashis & Dr. Archana Tripathy',
      designation: 'Senior Director at Infosys SEZ & Associate Professor',
      photo: '/images/kalyan/testimonials/client3.jpg',
      rating: 5.0,
      quote:
        'Designing a high-traffic modular kitchen with a grand waterfall island counter requires meticulous engineering. Kalyan Design Studio’s in-house precision factory delivered laser-edge acrylic shutters, Blum soft-close hinges, and zero-stain Calacatta quartz that handles heavy Indian cooking effortlessly. Their tech-driven 3D visualization allowed us to walk through every inch virtually before execution.',
      verifiedBadge: 'Verified Turnkey Handover • Modular Precision',
    },
    palette: ['#2F343B', '#D1A36B', '#F3EFEA', '#1E232A', '#FF8526'],
    keyFeatures: [
      'Calacatta Mitered Waterfall Quartz Kitchen Island',
      'Anti-Fingerprint Charcoal Matte Acrylic Shutters',
      'Illuminated Smoked Glass Wine & Bar Display Cabinet',
      'Polished Terrazzo Flooring with Solid Brass Inlay Strips',
    ],
    hotspots: [
      {
        id: 'ta-1',
        yaw: 180,
        pitch: -12,
        title: 'Waterfall Calacatta Quartz Island',
        category: 'Modular Kitchen Island',
        description: 'Seamless 40mm mitered waterfall quartz counter with built-in flush induction hob, integrated pop-up power towers, and undermount granite sink.',
        material: 'Non-porous Engineered Calacatta Quartz',
        finish: 'Stain-Resistant Polished Silky Touch',
        warranty: '10 Years Stain & Heat Resistance Warranty',
      },
      {
        id: 'ta-2',
        yaw: 265,
        pitch: 4,
        title: 'Anti-Fingerprint Charcoal Cabinetry',
        category: 'Modular Cabinetry',
        description: 'Boiling Water Resistant (BWR) marine plywood core with zero-joint PUR laser-banded Senosan super-matte anti-fingerprint acrylic shutters.',
        material: 'BWR Marine Ply + Austrian Senosan Acrylic',
        finish: 'Nano-Matte Charcoal (Thermal Healable)',
        warranty: '12 Years Waterproof & Delamination Warranty',
      },
      {
        id: 'ta-3',
        yaw: 315,
        pitch: 8,
        title: 'Illuminated Bar & Wine Cabinet',
        category: 'Dining Bar Unit',
        description: 'Fluted glass display cabinet with brushed brass handles, concealed vertical LED micro-profiles, and temperature-stable wine racks.',
        material: 'Tinted Fluted Glass + Marine Core Ply',
        finish: 'Natural Teak Veneer + Brushed Brass Trims',
        warranty: '10 Years Hardware Assurance',
      },
      {
        id: 'ta-4',
        yaw: 70,
        pitch: 16,
        title: 'Brushed Brass Geometric Chandeliers',
        category: 'Architectural Lighting',
        description: 'Sculptural diamond-facet brass pendant chandeliers suspended over the 8-seater solid wood dining table for intimate dinner banquets.',
        material: 'Solid Brass + Cast Optic Glass',
        finish: 'Electroplated Brushed Champagne Brass',
        warranty: '3 Years Electrical & Finish Warranty',
      },
    ],
  },
];

export default function ApartmentTestimonials360() {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const currentStory = APARTMENT_STORIES[selectedStoryIndex];

  // 360 Viewer State
  const [yaw, setYaw] = useState(0); // in degrees: 0 to 360
  const [pitch, setPitch] = useState(0); // in degrees: -45 to 45
  const [fov, setFov] = useState(70); // in degrees: 50 to 90
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);

  // Speed presets: 0.5x (super slow), 1.0x (luxurious calm drift), 1.5x (brisk)
  const SPEED_PRESETS = [
    { label: '0.5x', speed: 0.02 },
    { label: '1.0x', speed: 0.04 },
    { label: '1.5x', speed: 0.08 },
  ];
  const [speedIndex, setSpeedIndex] = useState(1); // default 1.0x (0.04 deg/frame)
  const [orbitSpeed, setOrbitSpeed] = useState(0.04); // smooth, slow luxury rotation
  const [atmosphere, setAtmosphere] = useState<'day' | 'sunset'>('day');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDistRef = useRef<number | null>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);
  const glRef = useRef<WebGLRenderingContext | WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const frameCountRef = useRef<number>(0);

  // Keep mutable animation refs to prevent 60fps React re-renders
  const yawRef = useRef<number>(0);
  const pitchRef = useRef<number>(0);
  const fovRef = useRef<number>(70);
  const isAutoOrbitRef = useRef<boolean>(true);
  const orbitSpeedRef = useRef<number>(0.04);
  const atmosphereRef = useRef<'day' | 'sunset'>('day');
  const isDraggingRef = useRef<boolean>(false);

  useEffect(() => {
    yawRef.current = yaw;
  }, [yaw]);

  useEffect(() => {
    pitchRef.current = pitch;
  }, [pitch]);

  useEffect(() => {
    fovRef.current = fov;
  }, [fov]);

  useEffect(() => {
    isAutoOrbitRef.current = isAutoOrbit;
  }, [isAutoOrbit]);

  useEffect(() => {
    orbitSpeedRef.current = orbitSpeed;
  }, [orbitSpeed]);

  useEffect(() => {
    atmosphereRef.current = atmosphere;
  }, [atmosphere]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Robust texture uploader: resamples image to 2048x1024 power-of-two canvas
  const uploadTexture = useCallback((gl: WebGLRenderingContext | WebGL2RenderingContext, img: HTMLImageElement) => {
    try {
      let texture = textureRef.current;
      if (!texture) {
        texture = gl.createTexture();
        textureRef.current = texture;
      }
      if (!texture) return;

      // Resample into standard 2048 x 1024 power-of-two canvas for full GPU compatibility in WebGL 1 & 2
      const potCanvas = document.createElement('canvas');
      potCanvas.width = 2048;
      potCanvas.height = 1024;
      const ctx = potCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, 2048, 1024);
      }

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        potCanvas
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.bindTexture(gl.TEXTURE_2D, null);
    } catch (e) {
      console.warn('WebGL texture upload note:', e);
    }
  }, []);

  // Initialize and load image
  useEffect(() => {
    setImageLoaded(false);
    setActiveHotspot(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentStory.image360;
    img.onload = () => {
      imageElementRef.current = img;
      setImageLoaded(true);
      if (glRef.current && programRef.current) {
        uploadTexture(glRef.current, img);
      }
    };
  }, [selectedStoryIndex, currentStory.image360, uploadTexture]);

  // WebGL Shader setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl2', { alpha: false, antialias: true, preserveDrawingBuffer: false }) ||
      canvas.getContext('webgl', { alpha: false, antialias: true, preserveDrawingBuffer: false }) ||
      canvas.getContext('experimental-webgl', { alpha: false, antialias: true, preserveDrawingBuffer: false })) as WebGLRenderingContext | WebGL2RenderingContext | null;

    if (!gl) return;
    glRef.current = gl;

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform sampler2D u_texture;
      uniform vec2 u_resolution;
      uniform float u_yaw;
      uniform float u_pitch;
      uniform float u_fov;
      uniform float u_sunset;

      #define PI 3.14159265358979323846

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
        float fovRad = radians(u_fov);
        vec3 ray = normalize(vec3(uv.x, uv.y, 0.5 / tan(fovRad * 0.5)));

        // Pitch rotation (X axis): tilts view up/down properly
        float cp = cos(u_pitch);
        float sp = sin(u_pitch);
        ray = vec3(ray.x, ray.y * cp + ray.z * sp, -ray.y * sp + ray.z * cp);

        // Yaw rotation (Y axis): pans around room
        float cy = cos(u_yaw);
        float sy = sin(u_yaw);
        ray = vec3(ray.x * cy + ray.z * sy, ray.y, -ray.x * sy + ray.z * cy);

        // Spherical UV mapping
        float phi = atan(ray.x, ray.z); // -PI to PI
        float theta = asin(clamp(ray.y, -0.9999, 0.9999)); // -PI/2 to PI/2

        // fract guarantees continuous 360 wrap around with CLAMP_TO_EDGE
        float u = fract(phi / (2.0 * PI) + 0.5);
        // Correct right-side up mapping: ceiling at theta=+PI/2 -> v=1.0, floor at theta=-PI/2 -> v=0.0
        float v = clamp(theta / PI + 0.5, 0.001, 0.999);

        vec4 color = texture2D(u_texture, vec2(u, v));

        // Sunset Warmth Grade
        if (u_sunset > 0.01) {
          vec3 sunsetTint = vec3(1.12, 0.96, 0.84);
          color.rgb = mix(color.rgb, color.rgb * sunsetTint, u_sunset);
          color.r += 0.04 * u_sunset;
        }

        gl_FragColor = color;
      }
    `;

    const createShader = (ctx: WebGLRenderingContext | WebGL2RenderingContext, type: number, source: string) => {
      const shader = ctx.createShader(type);
      if (!shader) return null;
      ctx.shaderSource(shader, source);
      ctx.compileShader(shader);
      if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
        console.error(ctx.getShaderInfoLog(shader));
        ctx.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);
    programRef.current = program;

    // Fullscreen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLocation);
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);

    // Initial placeholder texture to guarantee texture binding is never empty
    const placeholder = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, placeholder);
    const pixel = new Uint8Array([28, 25, 23, 255]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    textureRef.current = placeholder;

    // If image was already loaded, upload immediately
    if (imageElementRef.current && imageElementRef.current.complete) {
      uploadTexture(gl, imageElementRef.current);
    }

    return () => {
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, [uploadTexture]);

  // Main 60fps WebGL Render Loop
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const gl = glRef.current;
      const program = programRef.current;

      if (canvas && gl && program) {
        // Adjust canvas resolution dynamically
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        if (displayWidth > 0 && displayHeight > 0) {
          if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
          }
        }

        // Auto-orbit motion
        if (isAutoOrbitRef.current && !isDraggingRef.current) {
          yawRef.current = (yawRef.current + orbitSpeedRef.current) % 360;
          frameCountRef.current++;
          // Periodically sync React state for compass without killing 60fps performance
          if (frameCountRef.current % 10 === 0) {
            setYaw(Math.round(yawRef.current));
          }
        }

        gl.useProgram(program);

        // Explicitly bind active texture unit 0 on EVERY frame
        if (textureRef.current) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
          const uTexture = gl.getUniformLocation(program, 'u_texture');
          gl.uniform1i(uTexture, 0);
        }

        const uRes = gl.getUniformLocation(program, 'u_resolution');
        const uYaw = gl.getUniformLocation(program, 'u_yaw');
        const uPitch = gl.getUniformLocation(program, 'u_pitch');
        const uFov = gl.getUniformLocation(program, 'u_fov');
        const uSunset = gl.getUniformLocation(program, 'u_sunset');

        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uYaw, (yawRef.current * Math.PI) / 180);
        gl.uniform1f(uPitch, (pitchRef.current * Math.PI) / 180);
        gl.uniform1f(uFov, fovRef.current);
        gl.uniform1f(uSunset, atmosphereRef.current === 'sunset' ? 0.45 : 0.0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Mouse & Touch Interaction handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !lastMousePosRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    yawRef.current = (yawRef.current - deltaX * 0.25 + 360) % 360;
    pitchRef.current = Math.max(-45, Math.min(45, pitchRef.current - deltaY * 0.2));
    setYaw(Math.round(yawRef.current));
    setPitch(Math.round(pitchRef.current));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    lastMousePosRef.current = null;
  };

  // Multi-touch handlers: 1 finger pans 360°, 2 fingers pinch to zoom FOV
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastPinchDistRef.current = null;
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      lastMousePosRef.current = null;
      lastPinchDistRef.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1 && lastMousePosRef.current) {
      const deltaX = e.touches[0].clientX - lastMousePosRef.current.x;
      const deltaY = e.touches[0].clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      yawRef.current = (yawRef.current - deltaX * 0.3 + 360) % 360;
      pitchRef.current = Math.max(-45, Math.min(45, pitchRef.current - deltaY * 0.22));
      setYaw(Math.round(yawRef.current));
      setPitch(Math.round(pitchRef.current));
    } else if (e.touches.length === 2 && lastPinchDistRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = dist - lastPinchDistRef.current;
      lastPinchDistRef.current = dist;
      // Pinch apart (delta > 0) zooms in (lower fov), pinch together zooms out
      setFov((prev) => {
        const next = Math.max(50, Math.min(88, prev - delta * 0.15));
        fovRef.current = next;
        return next;
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastMousePosRef.current = null;
    lastPinchDistRef.current = null;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setFov((prev) => {
      const next = Math.max(50, Math.min(88, prev + (e.deltaY > 0 ? 3 : -3)));
      fovRef.current = next;
      return next;
    });
  };

  // Convert 3D Hotspot spherical coords to 2D screen coords
  const getHotspotScreenPos = (hYaw: number, hPitch: number) => {
    if (!canvasRef.current) return null;
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    // Relative angles in radians
    const yawDiff = (((hYaw - yaw + 540) % 360) - 180) * (Math.PI / 180);
    const pitchDiff = (hPitch - pitch) * (Math.PI / 180);

    // If point is behind the camera (outside visible 160 deg cone)
    if (Math.abs(yawDiff) > Math.PI / 2.2) return null;

    const fovRad = (fov * Math.PI) / 180;
    const focalLength = 0.5 / Math.tan(fovRad * 0.5);

    const x = Math.tan(yawDiff) * focalLength;
    const y = -Math.tan(pitchDiff) * focalLength;

    const screenX = (x * height) + width * 0.5;
    const screenY = (y * height) + height * 0.5;

    // Check bounds
    if (screenX < 40 || screenX > width - 40 || screenY < 40 || screenY > height - 40) {
      return null;
    }

    return { x: screenX, y: screenY };
  };

  // Cardinal direction from yaw
  const getCardinal = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const idx = Math.round(deg / 45) % 8;
    return directions[idx];
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <section
      id="testimonials-360"
      className="py-20 sm:py-28 px-3 sm:px-6 lg:px-8 bg-[#141210] text-[#F7F3EB] relative overflow-hidden select-none"
    >
      {/* Background Architectural Mesh & Ambience */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF8526_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#FF8526]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#B68953]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8526]/15 border border-[#FF8526]/30 text-[#FF8526] text-xs uppercase tracking-[0.2em] font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Interactive 360° Virtual Tour &amp; Homeowner Stories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-bounce tracking-tight text-white mb-4">
            Step Inside Handed-Over <span className="text-[#FF8526]">Odisha Homes</span>
          </h2>
          <p className="text-sm sm:text-base text-[#D4CDC3] font-century leading-relaxed">
            Drag to pan 360°, inspect factory-finish millwork, and hear firsthand from verified homeowners in Bhubaneswar who trusted Kalyan Design Studio for turnkey transformation.
          </p>
        </div>

        {/* Apartment Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {APARTMENT_STORIES.map((story, idx) => {
            const isSelected = selectedStoryIndex === idx;
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => setSelectedStoryIndex(idx)}
                className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#FF8526] text-white border-[#FF8526] shadow-[0_8px_24px_rgba(255,133,38,0.4)] scale-102 font-semibold'
                    : 'bg-[#1F1B18]/90 text-[#A8A196] border-[#3D352E] hover:border-[#FF8526]/50 hover:text-white'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-white animate-pulse' : 'bg-[#FF8526]'
                  }`}
                />
                <span className="whitespace-nowrap">{story.name.split(' ')[0]} {story.name.split(' ')[1]}</span>
                <span className="hidden md:inline-block text-[11px] opacity-75 font-normal">
                  ({story.area})
                </span>
              </button>
            );
          })}
        </div>

        {/* 360° Interactive Canvas Card */}
        <div
          ref={containerRef}
          className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#3D352E] bg-black shadow-2xl transition-all duration-300 ${
            isFullscreen
              ? 'fixed inset-0 z-50 rounded-none border-none'
              : 'w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] min-h-[340px] max-h-[660px]'
          }`}
        >
          {/* Main WebGL Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            className="w-full h-full cursor-grab active:cursor-grabbing block touch-none"
          />

          {/* Loading Indicator */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 z-30">
              <div className="w-12 h-12 border-3 border-[#FF8526] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-century text-[#D4CDC3]">Loading 360° Photorealistic Environment...</span>
            </div>
          )}

          {/* Hotspot Markers Overlay */}
          {showHotspots && imageLoaded && (
            <div className="absolute inset-0 pointer-events-none z-20">
              {currentStory.hotspots.map((hs) => {
                const pos = getHotspotScreenPos(hs.yaw, hs.pitch);
                if (!pos) return null;
                const isActive = activeHotspot?.id === hs.id;

                return (
                  <div
                    key={hs.id}
                    style={{
                      left: `${pos.x}px`,
                      top: `${pos.y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute pointer-events-auto"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(hs)}
                      className="group relative flex items-center justify-center cursor-pointer focus:outline-none"
                      aria-label={`View details for ${hs.title}`}
                    >
                      {/* Radar Pulse Ring */}
                      <span className="absolute w-10 h-10 rounded-full bg-[#FF8526]/30 animate-ping" />
                      <span className="absolute w-8 h-8 rounded-full bg-[#FF8526]/40" />

                      {/* Center Beacon */}
                      <span
                        className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                          isActive
                            ? 'bg-white text-[#FF8526] scale-110'
                            : 'bg-[#FF8526] text-white hover:scale-115'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </span>

                      {/* Hotspot Hover Tag */}
                      <div className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap bg-black/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#FF8526]/40 shadow-xl backdrop-blur-sm z-30">
                        {hs.title}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Top HUD: Info Bar & Compass */}
          <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between pointer-events-none z-20 gap-2">
            {/* Apartment Title Badge */}
            <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5 bg-black/80 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-white/10 shadow-lg max-w-[65%] sm:max-w-none">
              <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-white leading-tight truncate">
                  {currentStory.name}
                </p>
                <p className="text-[10px] text-[#A8A196] flex items-center gap-1 font-century truncate">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FF8526] shrink-0" /> {currentStory.location}
                </p>
              </div>
            </div>

            {/* Live Compass Heading */}
            <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 bg-black/80 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-xl border border-white/10 text-[11px] sm:text-xs font-mono text-[#E79F30] shadow-lg shrink-0">
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF8526] animate-spin-slow" />
              <span>{Math.round(yaw)}° {getCardinal(yaw)}</span>
            </div>
          </div>

          {/* Floating Interaction Prompt (fades out once user drags) */}
          {!isDragging && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white/90 animate-pulse">
              <RotateCw className="w-3.5 h-3.5 text-[#FF8526]" />
              <span>Drag to look 360° &bull; Click hotspots for finish specs</span>
            </div>
          )}

          {/* Bottom HUD: Orbit, Hotspot & Atmosphere Controls */}
          <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-20">
            {/* Left Controls: Auto Orbit & Speed */}
            <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 bg-black/80 backdrop-blur-md p-1 sm:p-1.5 rounded-2xl border border-white/10 shadow-xl">
              <button
                type="button"
                onClick={() => setIsAutoOrbit(!isAutoOrbit)}
                className={`p-1.5 sm:p-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isAutoOrbit
                    ? 'bg-[#FF8526] text-white shadow-md'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
                title={isAutoOrbit ? 'Pause Orbit' : 'Play Orbit'}
              >
                {isAutoOrbit ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                <span className="hidden sm:inline text-xs">{isAutoOrbit ? 'Orbit On' : 'Orbit'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const nextIdx = (speedIndex + 1) % SPEED_PRESETS.length;
                  setSpeedIndex(nextIdx);
                  setOrbitSpeed(SPEED_PRESETS[nextIdx].speed);
                }}
                className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-[11px] font-mono text-white/80 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                title="Adjust Orbit Speed (0.5x, 1.0x, 1.5x)"
              >
                {SPEED_PRESETS[speedIndex].label}
              </button>

              <div className="h-4 w-px bg-white/20 mx-0.5" />

              {/* Hotspot Toggle */}
              <button
                type="button"
                onClick={() => setShowHotspots(!showHotspots)}
                className={`p-1.5 sm:p-2 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  showHotspots
                    ? 'bg-white/15 text-[#FF8526] font-semibold'
                    : 'bg-white/5 text-white/50 hover:text-white'
                }`}
                title="Toggle Material Hotspots"
              >
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden md:inline text-xs">Hotspots</span>
              </button>
            </div>

            {/* Right Controls: Atmosphere, Zoom, Fullscreen */}
            <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 bg-black/80 backdrop-blur-md p-1 sm:p-1.5 rounded-2xl border border-white/10 shadow-xl">
              {/* Day / Sunset Mode */}
              <button
                type="button"
                onClick={() => setAtmosphere(atmosphere === 'day' ? 'sunset' : 'day')}
                className={`p-1.5 sm:p-2 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  atmosphere === 'sunset'
                    ? 'bg-[#E79F30] text-black font-semibold'
                    : 'bg-white/5 text-white/80 hover:bg-white/10'
                }`}
                title={`Switch to ${atmosphere === 'day' ? 'Sunset Glow' : 'Daylight'}`}
              >
                {atmosphere === 'sunset' ? <Sunset className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                <span className="hidden sm:inline text-xs capitalize">{atmosphere}</span>
              </button>

              <div className="h-4 w-px bg-white/20 mx-0.5" />

              {/* FOV Zoom Controls */}
              <button
                type="button"
                onClick={() => setFov((prev) => Math.max(50, prev - 8))}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold text-xs sm:text-sm cursor-pointer transition-colors"
                title="Zoom In"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setFov((prev) => Math.min(88, prev + 8))}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold text-xs sm:text-sm cursor-pointer transition-colors"
                title="Zoom Out"
              >
                &minus;
              </button>

              <div className="h-4 w-px bg-white/20 mx-0.5" />

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>
            </div>
          </div>

          {/* Interactive Hotspot Modal Drawer */}
          {activeHotspot && (
            <div className="absolute bottom-16 sm:bottom-20 left-3 sm:left-6 right-3 sm:right-auto sm:max-w-md bg-[#1C1815]/95 backdrop-blur-xl border border-[#FF8526]/40 p-4 sm:p-5 rounded-2xl shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#FF8526] font-semibold bg-[#FF8526]/10 px-2 py-0.5 rounded-sm">
                    {activeHotspot.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                    {activeHotspot.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveHotspot(null)}
                  className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#D4CDC3] leading-relaxed mb-3">
                {activeHotspot.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[11px] bg-black/40 p-2.5 rounded-xl border border-white/5 mb-3">
                <div>
                  <span className="text-white/50 block">Material Grade:</span>
                  <span className="text-white font-medium">{activeHotspot.material}</span>
                </div>
                <div>
                  <span className="text-white/50 block">Surface Finish:</span>
                  <span className="text-white font-medium">{activeHotspot.finish}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-white/5 flex items-center justify-between text-[#FF8526]">
                  <span>{activeHotspot.warranty}</span>
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <a
                href="#packages"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#FF8526] hover:bg-[#e87417] text-white font-courgette text-sm rounded-lg transition-all shadow-md active:scale-98"
              >
                <span>Get Quote on this Finish</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Integrated Homeowner Testimonial & Project Monograph */}
        <div className="mt-10 sm:mt-14 bg-gradient-to-br from-[#1C1815] to-[#25201C] rounded-3xl p-6 sm:p-10 border border-[#3D352E] shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background Watermark */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#FF8526]/5 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Homeowner Portrait & Identity Card (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center sm:text-left sm:flex-row lg:flex-col lg:items-start gap-5">
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#FF8526] shadow-[0_4px_24px_rgba(255,133,38,0.35)] relative">
                  <img
                    src={currentStory.homeowner.photo}
                    alt={currentStory.homeowner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#FF8526] text-white p-1.5 rounded-full shadow-lg" title="Verified Homeowner">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 text-xs text-[#E79F30] font-semibold mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>{currentStory.homeowner.verifiedBadge}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-bounce text-white">
                  {currentStory.homeowner.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#A8A196] font-century mt-0.5">
                  {currentStory.homeowner.designation}
                </p>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mt-2 justify-center sm:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF8526] text-[#FF8526]" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1.5">5.0 / 5.0</span>
                </div>
              </div>
            </div>

            {/* Right Column: In-Depth Testimonial & Turnkey Specs (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              {/* Quote narrative */}
              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#FF8526]/50 mb-6 sm:mb-8">
                <span className="absolute -left-3 top-0 text-3xl font-serif text-[#FF8526] leading-none">
                  &ldquo;
                </span>
                <p className="text-base sm:text-lg text-[#F7F3EB] font-courgette leading-relaxed italic">
                  {currentStory.homeowner.quote}
                </p>
              </div>

              {/* Turnkey Project Specification Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-t border-b border-white/10 mb-6">
                <div>
                  <span className="text-[11px] text-[#A8A196] uppercase tracking-wider block font-century">
                    Project Scope
                  </span>
                  <span className="text-sm font-semibold text-white">{currentStory.type}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#A8A196] uppercase tracking-wider block font-century">
                    Carpet Area
                  </span>
                  <span className="text-sm font-semibold text-white flex items-center gap-1">
                    <Ruler className="w-3 h-3 text-[#FF8526]" /> {currentStory.area}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#A8A196] uppercase tracking-wider block font-century">
                    Handover Date
                  </span>
                  <span className="text-sm font-semibold text-white flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#FF8526]" /> {currentStory.handoverDate}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#A8A196] uppercase tracking-wider block font-century">
                    Studio Assurance
                  </span>
                  <span className="text-sm font-semibold text-[#FF8526] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 10-Yr Warranty
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#A8A196]">Color Palette:</span>
                  <div className="flex items-center -space-x-1.5">
                    {currentStory.palette.map((color, cIdx) => (
                      <span
                        key={cIdx}
                        style={{ backgroundColor: color }}
                        className="w-5 h-5 rounded-full border border-black/40 shadow-sm"
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="#packages"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF8526] hover:bg-[#e87417] text-white font-courgette text-base transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Get Similar Quote</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
