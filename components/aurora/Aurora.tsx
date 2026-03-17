"use client";
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

import VERT from "./glsl/aurora/aurora.vs.glsl";
import FRAG from "./glsl/aurora/aurora.fs.glsl";

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  time?: number;
  speed?: number;
}

export default function Aurora(props: AuroraProps) {
  const {
    colorStops = ["#5227FF", "#7cff67", "#5227FF"],
    amplitude = 1.0,
    blend = 0.5,
  } = props;

  const propsRef = useRef<AuroraProps>(props);
  propsRef.current = props;

  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });

    const gl = renderer.gl;

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.canvas.style.backgroundColor = "transparent";

    let program: Program | undefined;

    function resize() {
      if (!ctn) return;

      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;

      renderer.setSize(width, height);

      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }

    window.addEventListener("resize", resize);

    const geometry = new Triangle(gl);

    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: [] },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    ctn.appendChild(gl.canvas);

    // --- Color Transition State ---
    let currentColorOrder = [...colorStops];
    let startColorOrder = [...colorStops];
    let targetColorOrder = [...colorStops];

    let transitionStart = 0;
    let transitionDuration = 4;

    let nextSwapTime = 0;

    function shuffleColors(colors: string[]) {
      const arr = [...colors];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function lerpColor(c1: Color, c2: Color, t: number) {
      return [
        lerp(c1.r, c2.r, t),
        lerp(c1.g, c2.g, t),
        lerp(c1.b, c2.b, t),
      ];
    }

    let animateId = 0;

    const update = (t: number) => {
      animateId = requestAnimationFrame(update);

      const { time = t * 0.01, speed = 1.0 } = propsRef.current;

      if (program) {
        program.uniforms.uTime.value = time * speed * 0.1;

        program.uniforms.uAmplitude.value =
          propsRef.current.amplitude ?? 1.0;

        program.uniforms.uBlend.value =
          propsRef.current.blend ?? blend;

        const now = t * 0.001;

        if (now > nextSwapTime) {
          startColorOrder = [...currentColorOrder];

          targetColorOrder = shuffleColors(
            propsRef.current.colorStops ?? colorStops
          );

          transitionStart = now;

          transitionDuration = 3 + Math.random() * 2;

          nextSwapTime = now + 10 + Math.random() * 10;
        }

        let transitionT = Math.min(
          (now - transitionStart) / transitionDuration,
          1.0
        );

        const blendedColors = startColorOrder.map((hex, i) => {
          const c1 = new Color(hex);
          const c2 = new Color(targetColorOrder[i]);

          return lerpColor(c1, c2, transitionT);
        });

        program.uniforms.uColorStops.value = blendedColors;

        if (transitionT >= 1.0) {
          currentColorOrder = [...targetColorOrder];
        }

        renderer.render({ scene: mesh });
      }
    };

    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);

      window.removeEventListener("resize", resize);

      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }

      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [amplitude]);

  return <div ref={ctnDom} className="w-full h-full" />;
}