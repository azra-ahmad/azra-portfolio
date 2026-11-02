"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, otherProjects } from "./projects";
import { ContactIcons } from "./contact-icons";
import { DjanggoMockup } from "./djanggo-mockup";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 32 32" fill="none"><path d={diagonal ? "M7 25 25 7M7 7h18v18" : "M5 16h22M17 6l10 10-10 10"} stroke="currentColor" strokeWidth="1.4" /></svg>;
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLElement>(null);
  const opening = useRef<gsap.core.Timeline | null>(null);
  const [introPlaying, setIntroPlaying] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: reduce)", () => {
      setIntroPlaying(false);
    });
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setIntroPlaying(true);
      const releaseIntro = () => {
        document.body.style.overflow = previousOverflow;
        setIntroPlaying(false);
      };
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: releaseIntro });
        opening.current = timeline;
        timeline
          .fromTo(".intro-title span", { yPercent: 115 }, { yPercent: 0, duration: .85, stagger: .09 }, .12)
          .fromTo(".intro-meta", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .5 }, .2)
          .fromTo(".intro-progress", { scaleX: 0 }, { scaleX: 1, duration: 1.15, ease: "power2.inOut" }, .3)
          .to(".intro-title span", { yPercent: -115, duration: .6, stagger: .06, ease: "power3.in" }, 1.5)
          .to(".intro", { yPercent: -101, borderRadius: "0 0 45% 45%", duration: 1.05, ease: "power4.inOut" }, 1.75)
          .from(".hero-photo", { scale: 1.07, duration: 1.6 }, 1.85)
          .from(".marquee-window", { yPercent: 105, opacity: 0, duration: 1.15 }, 2.1)
          .from(".nav", { opacity: 0, y: 12, duration: .8 }, 2.45);
        gsap.to(".marquee-track", { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
        gsap.to(".hero-photo", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        gsap.utils.toArray<HTMLElement>(".reveal").forEach(el => {
          gsap.from(el, { y: 35, opacity: 0, duration: .9, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 93%", once: true } });
        });
      }, root);
      // An intro must never prevent access if animation execution is interrupted.
      const failsafe = window.setTimeout(() => {
        opening.current?.progress(1);
        releaseIntro();
      }, 5000);
      return () => {
        window.clearTimeout(failsafe);
        ctx.revert();
        opening.current = null;
        document.body.style.overflow = previousOverflow;
      };
    });
    return () => media.revert();
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    const previous = document.activeElement as HTMLElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
      if (event.key === "Tab") {
        const controls = dialog.current?.querySelectorAll<HTMLElement>('button, a[href], video[controls]');
        if (!controls?.length) return;
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener("keydown", handleKey); previous?.focus(); };
  }, [activeProject]);

  return <main ref={root} id="top">
    <div className="intro" hidden={!introPlaying} aria-label="Portfolio introduction">
      <div className="intro-top intro-meta"><span>AAA — PORTFOLIO</span><button onClick={() => opening.current?.progress(1)}>Skip intro ↗</button></div>
      <div className="intro-center" aria-hidden="true"><div className="intro-title"><span>AZRA</span></div><div className="intro-title intro-title-second"><span>AHMAD</span></div></div>
      <div className="intro-bottom intro-meta"><span>AZRA AHMAD<br />ALGIFARI</span><div className="intro-rule" aria-hidden="true"><span className="intro-progress" /></div><span>SELECTED<br />PROJECTS</span></div>
    </div>
    <div className="site-content" inert={introPlaying}>
    <a className="skip-link" href="#work">Skip to selected work</a>
    <section className="hero" aria-label="Introduction">
      <div className="hero-photo" role="img" aria-label="Editorial portrait placeholder; to be replaced with Azra’s photograph" />
      <header className="nav">
        <a className="wordmark" href="#top" aria-label="Azra Ahmad home"><span className="copyright">©</span><span>Azra Ahmad</span></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#work">Work<span className="nav-dot" /></a><a href="#about">About<span className="nav-dot" /></a><a href="#contact">Contact <span aria-hidden="true">↗</span><span className="nav-dot" /></a></nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-nav">{menuOpen ? "Close −" : "Menu +"}</button>
      </header>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{["Work", "About", "Contact"].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item} ↗</a>)}</nav>}
      <h1 className="sr-only">Azra Ahmad Algifari — Personal portfolio</h1>
      <div className="marquee-position" aria-hidden="true"><div className="marquee-window"><div className="marquee-track"><span>Azra Ahmad —&nbsp;</span><span>Azra Ahmad —&nbsp;</span><span>Azra Ahmad —&nbsp;</span><span>Azra Ahmad —&nbsp;</span></div></div></div>
    </section>

    <section className="work section-pad" id="work">
      <div className="section-heading reveal"><p className="eyebrow">01 / SELECTED PROJECTS</p><p>Client work &amp;<br />university projects.</p></div>
      <div className="project-grid">{projects.map((project, index) => <button key={project.id} className={`project reveal ${index % 2 === 1 ? "project-reversed" : ""}`} onClick={() => setActiveProject(project)} aria-label={`View ${project.name} project notes`}>
        <div className={`project-art ${project.kind}`}>
          {project.kind === "djanggo" ? <DjanggoMockup /> : <div className="project-video-cover"><div className="monitor"><div className="monitor-display"><div className="monitor-camera" /><div className="monitor-screen">{project.image ? <img src={project.image} alt="MeyJuice ERP staff sign-in page" loading="lazy" /> : <video src={project.video} autoPlay muted loop playsInline preload="metadata" aria-label={`${project.name} website preview`} />}</div><div className="monitor-chin" /></div><div className="monitor-stand" /><div className="monitor-foot" /></div></div>}
          <span className="project-open"><Arrow diagonal /></span>
        </div>
        <div className="project-meta"><span className="eyebrow featured-label">{project.id} / {project.context.startsWith("Client") ? "CLIENT PROJECT" : "UNIVERSITY PROJECT"}</span><h2>{project.name}</h2><span>{project.category}</span><p className="featured-description">{project.description}</p><span className="featured-action">View project <Arrow diagonal /></span></div>
      </button>)}</div>
      <div className="other-projects reveal"><p className="eyebrow">MORE UNIVERSITY PROJECTS</p>{otherProjects.map(project => <a className="other-project" key={project.name} href={project.url} target="_blank" rel="noreferrer"><span>{project.name}<small>{project.description}</small></span><span className="other-stack">{project.stack}</span><Arrow diagonal /></a>)}</div>
    </section>

    <section className="about section-pad" id="about"><p className="eyebrow reveal">02 / ABOUT</p><div className="about-body reveal"><h2>Azra Ahmad<br />Algifari.<br /><span>Informatics graduate.</span></h2><div className="about-copy"><p>I’m a recent Informatics graduate with an interest in web development. Most of my projects started as university assignments, from ordering systems and catalogs to a video streaming application.</p><p>Kedai Djanggo was built for a real small business as part of coursework. I’m also working with a team on Fotomotif and Raffseal, two client projects that are nearing completion.</p><p>I’m continuing to develop my skills in web development while exploring other areas of technology.</p><a className="text-link" href="https://github.com/azra-ahmad" target="_blank" rel="noreferrer">My GitHub <Arrow diagonal /></a></div></div></section>

    <footer className="contact section-pad" id="contact">
      <p className="eyebrow reveal">03 / CONTACT</p>
      <div className="contact-row reveal"><h2>Get in touch.</h2><a className="contact-circle" href="mailto:azra.ahmad.algifari@gmail.com" aria-label="Email Azra"><Arrow diagonal /></a></div>
      <div className="contact-links">
        <ContactIcons />
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Azra Ahmad Algifari</span><a href="#top">Back to top ↑</a></div>
    </footer>

    {activeProject && <div className="modal-backdrop" onClick={() => setActiveProject(null)}><section ref={dialog} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={e => e.stopPropagation()}><div className="dialog-top"><span className="eyebrow">PROJECT / {activeProject.id}</span><button ref={closeButton} onClick={() => setActiveProject(null)} aria-label="Close project notes">Close ×</button></div><p className="dialog-category">{activeProject.category}</p><h2 id="project-title">{activeProject.name}</h2><p className="dialog-statement">{activeProject.title}</p><p>{activeProject.description}</p><dl className="project-facts"><div><dt>Context</dt><dd>{activeProject.context}</dd></div><div><dt>Status</dt><dd>{activeProject.status}</dd></div>{activeProject.stack && <div><dt>Stack</dt><dd>{activeProject.stack}</dd></div>}</dl>{activeProject.url && <a className="text-link" href={activeProject.url} target="_blank" rel="noreferrer">View repository <Arrow diagonal /></a>}<p className="dialog-note">{activeProject.note}</p></section></div>}
    </div>
  </main>;
}
