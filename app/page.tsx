'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const cardImages = [
    "/gambar1.png",
    "/gambar2.png",
    "/gambar3.png",
    "/gambar4.png",
    "/gambar5.png",
    "/gambar6.png"
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set('.fx3-camera', { xPercent: -25, yPercent: -50 });
      // ----------------------------------------------------
      // SECTION 1: The Recording Starts (Hero)
      // ----------------------------------------------------
      const tlHero = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        },
      });

      tlHero
        .to('.hero-text-left', { xPercent: -150, ease: 'none' }, 0)
        .to('.hero-text-right', { xPercent: 150, ease: 'none' }, 0)
        .fromTo('.fx3-camera',
          { scale: 1, x: 0, rotation: 0, opacity: 1 },
          { scale: 1.3, x: 0, rotation: 0, ease: 'none', immediateRender: false }, 0);

      // Pulsing tally light
      gsap.to('.tally-light', {
        opacity: 0.2,
        scale: 0.8,
        yoyo: true,
        repeat: -1,
        duration: 0.8,
        ease: 'power1.inOut',
      });

      // ----------------------------------------------------
      // SECTION 2: The Vertical Revolution
      // ----------------------------------------------------
      const tlSec2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-2',
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
      });

      tlSec2
        .fromTo('.fx3-camera',
          { x: 0, rotation: 0, scale: 1.3 },
          { x: 200, rotation: 90, scale: 1.3, ease: 'power1.inOut', immediateRender: false }, 0)
        .from('.sec-2-text', { opacity: 0, y: 50, stagger: 0.1, ease: 'power1.out' }, 0);

      // ----------------------------------------------------
      // SECTION 3: The Timeline (Burst)
      // ----------------------------------------------------
      // First, bring the camera back to center as the section enters
      gsap.fromTo('.fx3-camera',
        { x: 200, rotation: 90, scale: 1.3 },
        {
          x: -100,
          rotation: 0,
          scale: 1,
          ease: 'power1.inOut',
          immediateRender: false,
          scrollTrigger: {
            trigger: '.section-3',
            start: 'top bottom',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );

      // Then, frames burst out from the center behind the camera
      gsap.fromTo(
        '.timeline-frame',
        {
          x: 0,
          y: 0,
          scale: 0.5,
          opacity: 0,
          rotation: 0,
        },
        {
          x: (i) => [250, -250, 150, -150, 420, -420][i],
          y: (i) => [-120, -80, 150, 100, -180, 180][i],
          scale: 1,
          opacity: 1,
          rotation: (i) => [15, -15, 8, -8, 22, -22][i],
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.section-3',
            // [UBAH INI] dari 'top 30%' menjadi 'top top'
            start: 'top top',
            end: 'center center',
            scrub: 1.5,
          }
        }
      );

      // Deep parallax: as we keep scrolling, they float on Y axis
      gsap.to('.timeline-frame', {
        // PERBAIKAN 2: Kurangi intensitas parallax agar elemen tidak cepat hilang
        yPercent: (i) => (i % 2 === 0 ? -40 : 40),
        ease: 'none',
        scrollTrigger: {
          trigger: '.section-3',
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
        },
      });
      // ----------------------------------------------------
      // SECTION 4: Action (CTA)
      // ----------------------------------------------------
      const tlSec4 = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-4',
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
      });

      tlSec4
        .fromTo('.fx3-camera',
          { scale: 1, opacity: 1, x: -100, rotation: 0 },
          { scale: 0.5, opacity: 0, x: -100, rotation: 0, ease: 'power1.inOut', immediateRender: false }, 0)
        .from('.cta-content', { scale: 0.8, opacity: 0, ease: 'power1.out' }, 0);

      // Magnetic Button Effect
      const btn = document.querySelector('.magnetic-btn') as HTMLButtonElement;
      if (btn) {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: 'power2.out' });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'all' });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden">
      {/* 
        FIXED CAMERA PLACEHOLDER
        Stays fixed in the viewport and animated via GSAP across sections.
      */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="flex items-center gap-8 px-6 py-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full shadow-2xl">

          {/* Logo/Icon Area */}
          <div className="flex items-center gap-2 mr-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-black">
              α
            </div>
          </div>

          {/* Menu Links */}
          <div className="hidden md:flex gap-8 text-zinc-300 font-medium text-sm tracking-wide">
            <a href="#" className="hover:text-white transition-colors">Cameras</a>
            <a href="#" className="hover:text-white transition-colors">Lenses</a>
            <a href="#" className="hover:text-white transition-colors">Stories</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>

          {/* CTA Button */}
          <button className="px-6 py-2 bg-zinc-50 text-black font-semibold text-sm rounded-full hover:bg-zinc-200 transition-all">
            Explore Alpha
          </button>
        </nav>
      </header>
      <div className="fx3-camera fixed top-1/2 left-1/2 z-40 flex flex-col items-center justify-center pointer-events-none will-change-transform">
        <Image src="/fx3.webp" alt="Sony FX3" width={400} height={400} className="drop-shadow-2xl" priority />
        <div className="tally-light absolute top-[25%] right-[20%] w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,1)]"></div>
      </div>

      {/* SECTION 1: HERO */}
      <section className="hero-section h-screen w-full flex items-center justify-center relative z-10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/section1.webp" // Ganti dengan lokasi gambarmu di folder public
            alt="Background Model"
            fill
            className="object-cover opacity-40" // opacity-40 agar teks tetap terbaca
            priority
          />
          {/* Overlay hitam agar teks lebih kontras */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <h1 className="text-[15vw] font-black tracking-tighter text-zinc-400 flex w-full justify-between px-12 pointer-events-none select-none z-10">
          <span className="hero-text-left will-change-transform">SONY</span>
          <span className="hero-text-right will-change-transform">FX3</span>
        </h1>
      </section>

      {/* SECTION 2: VERTICAL REVOLUTION */}
      <section className="section-2 h-screen w-full relative flex items-center px-12 md:px-24 z-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/section2.webp" // Ganti dengan lokasi gambarmu di folder public
            alt="Background Model"
            fill
            className="object-cover opacity-40" // opacity-40 agar teks tetap terbaca
            priority
          />
          {/* Overlay hitam agar teks lebih kontras */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="max-w-2xl relative z-30">
          <h2 className="sec-2-text text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
            Mastering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">Vertical Cut.</span>
          </h2>
          <p className="sec-2-text text-2xl text-zinc-400 font-light max-w-lg">
            Designed for high-retention shorts and flawless clipping. Shoot horizontally, crop vertically without losing the cinematic edge.
          </p>
        </div>
      </section>

      {/* SECTION 3: THE TIMELINE */}
      <section className="section-3 h-[200vh] w-full relative z-10">
        <div className="absolute inset-0 z-0 bg-zinc-950">
          <Image
            src="/section3.webp" // Ganti dengan lokasi gambarmu di folder public
            alt="Background Model"
            fill
            className="object-cover opacity-40" // opacity-40 agar teks tetap terbaca
            priority
          />
          {/* Overlay hitam agar teks lebih kontras */}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black"></div>
        </div>
        <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-30">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="timeline-frame absolute w-48 h-[18.5rem] bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col items-center justify-center opacity-0 z-30 overflow-hidden shadow-2xl"
            >
              {/* BAGIAN GAMBAR */}
              <div
                className="w-full flex-grow bg-zinc-800 flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${cardImages[i]})` }}
              >
                {/* Jika kamu ingin ikon play tetap ada di atas gambar */}
                <div className="bg-black/30 w-full h-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* BAGIAN TEKS */}
              <div className="w-full h-12 flex items-center justify-between px-4 z-20 bg-zinc-900">
                <span className="text-zinc-500 font-mono text-xs">RAW_{i + 1}.MP4</span>
                <span className="text-red-500 font-mono text-[10px]">REC</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: ACTION */}
      <section className="section-4 h-screen w-full flex flex-col items-center justify-center z-50 relative bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/section4.avif" // Ganti dengan lokasi gambarmu di folder public
            alt="Background Model"
            fill
            className="object-cover opacity-40" // opacity-40 agar teks tetap terbaca
            priority
          />
          {/* Overlay hitam agar teks lebih kontras */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="cta-content flex flex-col items-center">
          <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tight">Ready to Shoot?</h2>
          <button className="magnetic-btn relative px-12 py-6 rounded-full bg-transparent border border-red-600/50 text-red-500 font-bold text-xl uppercase tracking-widest hover:bg-red-600 hover:text-zinc-50 transition-colors duration-300 shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:shadow-[0_0_60px_rgba(239,68,68,0.5)]">
            Pre-Order FX3
          </button>
        </div>
      </section>
    </div>
  );
}
