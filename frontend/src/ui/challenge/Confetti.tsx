import React, { forwardRef, useImperativeHandle, useRef, Ref, useEffect } from 'react'
import styled from 'styled-components';

export interface ConfettiElement {
  emitParticles: () => void
}

export const Confetti = forwardRef((props, ref: Ref<ConfettiElement>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const emitParticles = useRef(() => {})

  useImperativeHandle(ref, () => ({
    emitParticles: () => emitParticles.current()
  }))

  useEffect(() => {
    const { createParticles, stop } = start(canvasRef.current!)
    emitParticles.current = createParticles
    return stop
  }, [])

  return <ConfettiDisplay ref={canvasRef} />
})

const ConfettiDisplay = styled.canvas`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
`

class ConfettiParticle {
  color = 0
  opacity = 50
  diameter = 0
  tilt = 0
  tiltAngleIncrement = 0
  tiltAngle = 0
  particleSpeed = 1
  waveAngle = 0
  x = 0
  y = 0

  constructor(
    public context: CanvasRenderingContext2D,
    public width: number,
    public height: number,
  ) {
    this.reset()
  }

  reset() {
    this.opacity = 1
    this.color = Math.floor(Math.random() * 360)
    this.x = Math.random() * this.width
    this.y = Math.random() * this.height - this.height
    this.diameter = Math.random() * 6 + 4
    this.tilt = 0
    this.tiltAngleIncrement = Math.random() * 0.1 + 0.04
    this.tiltAngle = 0
  }

  darken() {
    if (this.y < 100 || this.opacity <= 0) return
    this.opacity -= (7 / this.height)
    if (this.opacity <= 0) {
      this.opacity = 0
    }
  }

  update() {
    if (!this.complete()) {
      this.waveAngle += this.tiltAngleIncrement
      this.tiltAngle += this.tiltAngleIncrement
      this.tilt = Math.sin(this.tiltAngle) * 12
      this.x += Math.sin(this.waveAngle)
      this.y += (Math.cos(this.waveAngle) + this.diameter + this.particleSpeed) * 0.4
      this.darken()
    }
  }

  complete() {
    return (this.y > this.height + 20)
  }

  draw() {
    let x = this.x + this.tilt
    this.context.beginPath()
    this.context.lineWidth = this.diameter
    this.context.strokeStyle = "hsla(" + this.color + ", 50%, 50%, " + this.opacity + ")"
    this.context.moveTo(x + this.diameter / 2, this.y)
    this.context.lineTo(x, this.y + this.tilt + this.diameter / 2)
    this.context.stroke()
  }
}

function start (canvas: HTMLCanvasElement) {
  let width = window.innerWidth
  let height = window.innerHeight
  let particles: ConfettiParticle[] = []

  // particle canvas
  const context = canvas.getContext('2d')!
  canvas.width = width
  canvas.height = height

  // update canvas size
  const updateSize = () => {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
  }

  // create confetti particles
  const createParticles = () => {
    particles = []
    let total = 100

    if (width > 1080) { total = 400 }
    else if (width > 760) { total = 300 }
    else if (width > 520) { total = 200 }

    for (let i = 0; i < total; ++i) {
      particles.push(new ConfettiParticle(context, width, height))
    }
  }

  let running = true
  const runAnimation = () => {
    if (!running) {
      return
    }
    requestAnimationFrame(runAnimation)
    context.clearRect(0, 0, width, height)

    for (let p of particles) {
      p.width = width
      p.height = height
      p.update()
      p.draw()
    }
  }

  updateSize()
  window.addEventListener('resize', updateSize)

  runAnimation()

  return {
    createParticles,
    stop() {
      window.removeEventListener('resize', updateSize)
      running = false
    }
  }
}
