import { useEffect, useRef } from 'react'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4'
const SENSITIVITY = 0.8

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTime = useRef(0)
  const seeking = useRef(false)

  const seekTo = (video: HTMLVideoElement, time: number) => {
    seeking.current = true
    video.currentTime = time
  }

  useEffect(() => {
    let prevX: number | null = null

    const onMouseMove = (e: MouseEvent) => {
      const video = videoRef.current
      if (!video || !video.duration || Number.isNaN(video.duration)) {
        prevX = e.clientX
        return
      }
      if (prevX === null) {
        prevX = e.clientX
        return
      }

      const delta = e.clientX - prevX
      prevX = e.clientX

      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration
      targetTime.current = Math.min(Math.max(targetTime.current + offset, 0), video.duration)

      if (!seeking.current) seekTo(video, targetTime.current)
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const onSeeked = () => {
    const video = videoRef.current
    seeking.current = false
    if (video && Math.abs(video.currentTime - targetTime.current) > 0.001) {
      seekTo(video, targetTime.current)
    }
  }

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      onSeeked={onSeeked}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: '70% center',
      }}
    />
  )
}
