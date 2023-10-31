import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Color, Vector2 } from "three";

import fragmentShader from "./components/fragmentShader";
import vertexShader from "./components/vertexShader";

const graidentsArray = [
  {
    u_bg: '#F02D3A',
    u_colorA: '#B118C8',
    u_colorB: '#1A1B41'
  },
  {
    u_bg: '#201E50',
    u_colorA: '#525B76',
    u_colorB: '#ED217C'
  },
  {
    u_bg: '#545863',
    u_colorA: '#00E8FC',
    u_colorB: '#F96E46'
  },
  {
    u_bg: '#3F88C5',
    u_colorA: '#2D1E2F',
    u_colorB: '#136F63'
  },
  {
    u_bg: '#131200',
    u_colorA: '#E9806E',
    u_colorB: '#EF3054'
  },
]

const getRandomGradient = () => {
  return graidentsArray[Math.floor(Math.random() * 4)]
}

const Gradient = () => {
  const mesh = useRef()
  const mousePos = useRef({
    x: 0,
    y: 0,
  })
  const hover = useRef(false)

  const [gradient, setGradient] = useState(graidentsArray[Math.floor(Math.random() * 4)])

  const updateMousePos = useCallback((e) => {
    mousePos.current = {
      x: e.clientX,
      y: e.clientY,
    }
  }, [])

  const uniforms = useMemo(() => (
    {
      u_time: {
        value: 0.0,
      },
      u_mouse: {
        value: new Vector2(0, 0),
      },
      u_bg: {
        value: new Color(gradient.u_bg)
      },
      u_colorA: { value: new Color(gradient.u_colorA) },
      u_colorB: { value: new Color(gradient.u_colorB) },
      u_intensity: {
        value: 0.3,
      }
    }
  ), [])

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePos, false)

    return () => {
      window.removeEventListener('mousemove', updateMousePos, false)
    }
  }, [updateMousePos, getRandomGradient])

  useFrame((state) => {
    const { clock } = state

    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime()
    mesh.current.material.uniforms.u_mouse.value = new Vector2(
      (mousePos.current.x / window.innerWidth) * 2 - 1,
      (mousePos.current.y / window.innerHeight) * 2 + 1,
    )
  })

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1.0}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <planeGeometry args={[4, 1.6, 1, 1]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  )
}


const CanvasContainer = () => {

  const canvasRef = useRef()

  const resizeCanvas = () => {

    console.log('resizing')
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')

    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
  }

  // useEffect(() => {
  //   window.addEventListener('resize', resizeCanvas, false)

  // }, [])

  return (
    <div id="canvas-container">
      <Canvas
        camera={{ position: [0.0, 0.0, 1.0] }}
        ref={canvasRef}
        resize={{
          scroll: true,
          debounce: {
            scroll: 50,
            resize: 0
          }
        }}
      >
        <Gradient />
      </Canvas>
    </div>
  );
}

export default CanvasContainer
