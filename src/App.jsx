import { useState, useEffect, useRef } from "react";
import poster4 from "./assets/poster4.jpg";
import poster3 from "./assets/poster3.jpg";
import poster6 from "./assets/poster6.jpg";
import room1 from "./assets/rooms/Cucina_1.jpg";
import room2 from "./assets/rooms/Cucina_2.jpg";
import room3 from "./assets/rooms/Room_1.jpg";
import room4 from "./assets/rooms/Room_2.jpg";
import room5 from "./assets/rooms/Room_3.jpg";
import room6 from "./assets/rooms/Bagno_1.jpg";
import room7 from "./assets/rooms/Giardino_1.jpg";
import room8 from "./assets/rooms/Giardino_2.jpg";
import room9 from "./assets/rooms/Panorama_1.jpg";
import room10 from "./assets/rooms/Panorama_2.jpg";
import room11 from "./assets/rooms/Panorama_3.jpg";
import bertinoro from "./assets/rooms/Logo.jpg";

const IMG = {
  room1, room2, room3, room4, room5, room6,
  room7, room8, room9, room10, room11,
  bertinoro,
};

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>{children}</div>
  );
}

// ── Color tokens ──────────────────────────────────────────────────────────────
const C = {
  bg:       "#faf8f4",
  bg2:      "#f3efe8",
  bg3:      "#ede8de",
  text:     "#1a1612",
  textMid:  "#5a5248",
  textSoft: "#9a9088",
  gold:     "#a0782a",
  border:   "rgba(160,120,42,0.15)",
  cardBg:   "#ffffff",
  shadow:   "0 4px 24px rgba(26,22,18,0.08)",
};

// ── Diagonal divider ──────────────────────────────────────────────────────────
function DiagDivider({ topColor, botColor, flip = false }) {
  return (
    <div style={{ background: botColor, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
        <polygon points={flip ? "0,0 1440,60 1440,0" : "0,60 1440,0 1440,60"} fill={topColor} />
      </svg>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Apartment", "Location", "Experiences", "Reviews"];
  const ids    = ["apartment", "location", "experiences", "reviews"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(250,248,244,0.96)" : "rgba(250,248,244,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${scrolled ? "rgba(160,120,42,0.18)" : "rgba(160,120,42,0.08)"}`,
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <img src={IMG.bertinoro} alt="Bertinoro" style={{ height: 36, width: 36, objectFit: "contain", filter: "brightness(0) saturate(100%) invert(45%) sepia(60%) saturate(600%) hue-rotate(10deg) brightness(85%)" }} />
          <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.2rem", color: C.gold, letterSpacing: "0.08em", fontWeight: 700, lineHeight: 1.1 }}>
            CASA<br /><span style={{ fontSize: "0.82rem", letterSpacing: "0.18em" }}>CAVOUR</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desk-nav">
          {links.map((l, i) => (
            <a key={l} href={`#${ids[i]}`} style={{ color: C.textMid, textDecoration: "none", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.gold} onMouseLeave={e => e.target.style.color = C.textMid}>
              {l}
            </a>
          ))}
          <a href="https://airbnb.com/h/casacavour-bertinoro" target="_blank" rel="noopener noreferrer"
            style={{ background: C.gold, color: "#fff", padding: "0.5rem 1.3rem", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#8a6520"}
            onMouseLeave={e => e.currentTarget.style.background = C.gold}>
            BOOK NOW
          </a>
          {/* Language switcher — desktop */}
          <div style={{ display: "flex", gap: "0.25rem", borderLeft: `1px solid ${C.border}`, paddingLeft: "1rem" }}>
            <a href="https://www.casa-cavour.com/"
              style={{ color: C.textSoft, textDecoration: "none", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", transition: "color 0.2s", padding: "0.2rem 0.3rem" }}
              onMouseEnter={e => e.currentTarget.style.color = C.gold}
              onMouseLeave={e => e.currentTarget.style.color = C.textSoft}>
              IT
            </a>
            <span style={{ color: C.border, fontSize: "0.7rem", alignSelf: "center" }}>|</span>
            <a href="https://casa-cavour-en.vercel.app"
              style={{ color: C.gold, textDecoration: "none", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", transition: "color 0.2s", padding: "0.2rem 0.3rem" }}
              onMouseEnter={e => e.currentTarget.style.color = C.gold}
              onMouseLeave={e => e.currentTarget.style.color = C.textSoft}>
              EN
            </a>
            <span style={{ color: C.border, fontSize: "0.7rem", alignSelf: "center" }}>|</span>
            <a href="https://nl.casa-cavour.com/"
              style={{ color: C.textSoft, textDecoration: "none", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", transition: "color 0.2s", padding: "0.2rem 0.3rem" }}
              onMouseEnter={e => e.currentTarget.style.color = C.gold}
              onMouseLeave={e => e.currentTarget.style.color = C.textSoft}>
              NL
            </a>
          </div>
        </div>
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "0.5rem", flexDirection: "column", gap: 5 }} className="burger">
          <div style={{ width: 24, height: 2, background: C.gold }} />
          <div style={{ width: 24, height: 2, background: C.gold }} />
          <div style={{ width: 24, height: 2, background: C.gold }} />
        </button>
      </div>
      {open && (
        <div style={{ background: C.bg, padding: "1rem 1.5rem 1.5rem", borderTop: `1px solid ${C.border}` }}>
          {links.map((l, i) => (
            <a key={l} href={`#${ids[i]}`} onClick={() => setOpen(false)}
              style={{ display: "block", color: C.textMid, textDecoration: "none", padding: "0.65rem 0", fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", borderBottom: `1px solid ${C.border}` }}>
              {l}
            </a>
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
            <a href="https://airbnb.com/h/casacavour-bertinoro" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: C.gold, color: "#fff", padding: "0.7rem 1.75rem", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
              BOOK NOW
            </a>
            {/* Language switcher — mobile */}
            <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
              <a href="https://www.casa-cavour.com/"
                style={{ color: C.textSoft, textDecoration: "none", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", padding: "0.3rem 0.4rem" }}>
                IT
              </a>
              <span style={{ color: C.border, fontSize: "0.75rem" }}>|</span>
              <a href="https://casa-cavour-en.vercel.app"
                style={{ color: C.gold, textDecoration: "none", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", padding: "0.3rem 0.4rem" }}>
                EN
              </a>
              <span style={{ color: C.border, fontSize: "0.75rem" }}>|</span>
              <a href="https://nl.casa-cavour.com/"
                style={{ color: C.textSoft, textDecoration: "none", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", padding: "0.3rem 0.4rem" }}>
                NL
              </a>
            </div>
          </div>
        </div>
      )}
      <style>{`@media(max-width:768px){.desk-nav{display:none!important}.burger{display:flex!important}}`}</style>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 120); }, []);
  return (
    <section style={{ position: "relative", minHeight: "100vh", background: C.bg, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(140deg,#f5efe3 0%,#faf8f4 50%,#f0ece2 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-5%", right: "-3%", width: "45vw", height: "45vw", border: "1px solid rgba(160,120,42,0.1)", transform: "rotate(12deg)" }} />
        <div style={{ position: "absolute", top: "3%", right: "3%", width: "32vw", height: "32vw", border: "1px solid rgba(160,120,42,0.06)", transform: "rotate(12deg)" }} />
        <div style={{ position: "absolute", top: "44%", left: 0, width: "30%", height: 1, background: "linear-gradient(90deg,transparent,rgba(160,120,42,0.2),transparent)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 2rem", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3rem", width: "100%", paddingTop: "5rem", paddingBottom: "3rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <div style={{ opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(18px)", transition: "all 0.7s ease 0.15s", display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.3rem" }}>
              <span style={{ display: "inline-block", width: 32, height: 1, background: C.gold }} />
              <span style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>Bertinoro · Emilia-Romagna · B&amp;B</span>
            </div>
            <h1 style={{ opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(28px)", transition: "all 0.85s ease 0.3s", fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(2.6rem,5.5vw,5rem)", fontWeight: 700, color: C.text, lineHeight: 1.04, letterSpacing: "-0.02em", margin: "0 0 1.2rem" }}>
              Experience Romagna<br /><span style={{ color: C.gold, fontStyle: "italic" }}>like a local.</span>
            </h1>
            <p style={{ opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(24px)", transition: "all 0.85s ease 0.46s", fontSize: "clamp(0.93rem,1.8vw,1.08rem)", color: C.textMid, lineHeight: 1.82, margin: "0 0 2rem", fontFamily: "'DM Sans',sans-serif" }}>
              A design apartment in the historic centre of Bertinoro — the <em style={{ color: C.text }}>"Balcony of Romagna"</em>. For couples, professionals and travellers seeking authenticity, comfort and a genuine connection with the region.
            </p>
            <div style={{ opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(24px)", transition: "all 0.85s ease 0.6s", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="https://airbnb.com/h/casacavour-bertinoro" target="_blank" rel="noopener noreferrer"
                style={{ background: C.gold, color: "#fff", padding: "0.95rem 2rem", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.13em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 20px rgba(160,120,42,0.25)", transition: "all 0.25s", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.background="#8a6520"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background=C.gold; e.currentTarget.style.transform="translateY(0)"; }}>
                Book on Airbnb ↗
              </a>
              <a href="#apartment" style={{ border: "1.5px solid rgba(160,120,42,0.35)", color: C.textMid, padding: "0.95rem 1.75rem", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=C.gold; e.currentTarget.style.color=C.text; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(160,120,42,0.35)"; e.currentTarget.style.color=C.textMid; }}>
                Discover more
              </a>
            </div>
            <div style={{ opacity: loaded?1:0, transition: "opacity 0.8s ease 0.78s", display: "flex", gap: "2rem", marginTop: "2.5rem", paddingTop: "1.75rem", borderTop: `1px solid ${C.border}`, flexWrap: "wrap" }}>
              {[["★★★★★","Airbnb Rating"],["4","Max guests"],["15 min","from Cesena"],["35 min","from San Marino"]].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.3rem", color: C.gold, fontWeight: 700 }}>{v}</div>
                  <div style={{ fontSize: "0.66rem", color: C.textSoft, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "0 1 420px", maxWidth: 420, width: "100%", opacity: loaded?1:0, transform: loaded?"translateY(0) rotate(-1deg)":"translateY(30px) rotate(-1deg)", transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s" }}>
            <div style={{ boxShadow: "0 20px 60px rgba(26,22,18,0.15), 0 0 0 1px rgba(160,120,42,0.12)" }}>
              <img src={poster6} alt="Casa Cavour Bertinoro" style={{ width: "100%", display: "block" }} />
            </div>
          </div>
        </div>
      </div>
      <DiagDivider topColor={C.bg} botColor={C.bg2} />
    </section>
  );
}

// ── Apartment / Gallery ───────────────────────────────────────────────────────
function Apartment() {
  const [active, setActive] = useState(0);
  const rooms = [
    { src: IMG.room1 }, { src: IMG.room2 }, { src: IMG.room3 },
    { src: IMG.room4 }, { src: IMG.room5 }, { src: IMG.room6 },
    { src: IMG.room7 }, { src: IMG.room8 }, { src: IMG.room9 },
    { src: IMG.room10 }, { src: IMG.room11 },
  ];
  return (
    <section id="apartment" style={{ background: C.bg2, padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="apt-grid">
          <Reveal>
            <div style={{ marginBottom: "0.75rem", overflow: "hidden", boxShadow: C.shadow }}>
              <img src={rooms[active].src} alt="Casa Cavour apartment"
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "opacity 0.35s" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "0.35rem", marginBottom: "0.35rem" }}>
              {rooms.slice(0,6).map((r,i) => (
                <div key={i} onClick={() => setActive(i)} style={{ cursor: "pointer", overflow: "hidden", border: active===i ? `2px solid ${C.gold}` : "2px solid transparent", transition: "border 0.2s" }}>
                  <img src={r.src} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block", filter: active===i?"none":"brightness(0.7) saturate(0.8)", transition: "filter 0.2s" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "0.35rem" }}>
              {rooms.slice(6).map((r,i) => (
                <div key={i+6} onClick={() => setActive(i+6)} style={{ cursor: "pointer", overflow: "hidden", border: active===i+6 ? `2px solid ${C.gold}` : "2px solid transparent", transition: "border 0.2s" }}>
                  <img src={r.src} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block", filter: active===i+6?"none":"brightness(0.7) saturate(0.8)", transition: "filter 0.2s" }} />
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <span style={{ width: 26, height: 1, background: C.gold, display: "inline-block" }} /> The Apartment
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, marginBottom: "1.2rem", letterSpacing: "-0.02em" }}>
                Your home<br /><span style={{ color: C.gold, fontStyle: "italic" }}>from day one.</span>
              </h2>
              <p style={{ fontSize: "0.94rem", color: C.textMid, lineHeight: 1.85, fontFamily: "'DM Sans',sans-serif", marginBottom: "1.2rem" }}>
                <strong style={{ color: C.text }}>Casa Cavour</strong> is a fully furnished apartment in the historic centre of Bertinoro — a medieval hilltop village in Romagna known as the <em>"Balcony of Romagna"</em>. Perfect for couples, remote workers and families of up to 4.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6px", background: C.border, marginBottom: "2rem" }}>
                {[
                  ["🛋️","Curated furnishings","Selected Italian design"],
                  ["👨‍🍳","Full kitchen","Local market 2 min away"],
                  ["💻","Fibre WiFi","Perfect for remote work"],
                  ["🚗","Public parking","Nearby"],
                  ["🌡️","A/C & heating","Comfort all year round"],
                  ["🛁","Quality bathroom","Premium products included"],
                ].map(([ic,t,s]) => (
                  <div key={t} style={{ background: C.cardBg, padding: "1.1rem", transition: "background 0.25s" }}
                    onMouseEnter={e => e.currentTarget.style.background=C.bg2}
                    onMouseLeave={e => e.currentTarget.style.background=C.cardBg}>
                    <div style={{ fontSize: "1.25rem", marginBottom: "0.4rem" }}>{ic}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: C.text, fontWeight: 600, marginBottom: "0.2rem" }}>{t}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: C.textSoft }}>{s}</div>
                  </div>
                ))}
              </div>
              <a href="https://airbnb.com/h/casacavour-bertinoro" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: C.gold, color: "#fff", padding: "0.9rem 1.8rem", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 18px rgba(160,120,42,0.22)", transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.background="#8a6520"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background=C.gold; e.currentTarget.style.transform="translateY(0)"; }}>
                Check availability on Airbnb ↗
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:768px){.apt-grid{grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
      <DiagDivider topColor={C.bg2} botColor={C.bg} flip />
    </section>
  );
}

// ── Location ──────────────────────────────────────────────────────────────────
function Location() {
  return (
    <section id="location" style={{ background: C.bg, padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span style={{ width: 26, height: 1, background: C.gold, display: "inline-block" }} /> Strategic Location
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, maxWidth: 600, letterSpacing: "-0.02em" }}>
              At the heart of everything<br /><span style={{ color: C.gold, fontStyle: "italic" }}>that matters.</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="loc-grid">
          <Reveal>
            <div>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.textSoft, marginBottom: "1.1rem" }}>KEY DISTANCES</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6px", background: C.border }}>
                {[
                  ["📍","Bertinoro historic centre","On foot","2 min"],
                  ["🏰","Rocca Albornoziana","On foot","8 min"],
                  ["🍷","Wineries & Vineyards","By car","10 min"],
                  ["🏙️","Cesena","By car","15 min"],
                  ["🏖️","Cesenatico & Riviera","By car","30 min"],
                  ["🏔️","Republic of San Marino","By car","35 min"],
                  ["🌊","Rimini & beaches","By car","40 min"],
                  ["🌆","Ravenna","By car","50 min"],
                  ["🎓","Bologna","By car / train","60 min"],
                  ["✈️","Bologna Airport","By car","65 min"],
                ].map(([ic,dest,modo,time]) => (
                  <div key={dest} style={{ background: C.cardBg, padding: "0.85rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background=C.bg2}
                    onMouseLeave={e => e.currentTarget.style.background=C.cardBg}>
                    <span style={{ fontSize: "1.05rem", flexShrink: 0 }}>{ic}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.84rem", color: C.text, fontWeight: 500 }}>{dest}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: C.textSoft, marginTop: 2 }}>{modo}</div>
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "0.95rem", color: C.gold, fontWeight: 600, whiteSpace: "nowrap" }}>{time}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal delay={100}>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.textSoft, marginBottom: "1.1rem" }}>THINGS TO DO NEARBY</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6px", background: C.border }}>
              {[
                { icon:"🍷", title:"Wine Tour in Romagna", desc:"Albana DOCG and Sangiovese — the vineyards are 10 minutes away. Historic wineries." },
                { icon:"🚴", title:"Cycling & Hiking Trails", desc:"Hilltop cycling routes through medieval villages, olive groves and Adriatic panoramas." },
                { icon:"🌅", title:"Sunset on the Balcony", desc:"The panoramic terrace of Bertinoro offers one of the most beautiful sunsets in Romagna, with views to the Adriatic." },
                { icon:"🍝", title:"Romagnola Cuisine", desc:"Piadina, tagliatelle al ragu, squacquerone. Trattorias 5 min away where the locals eat." },
                { icon:"🏖️", title:"Adriatic Riviera", desc:"Cesenatico, Rimini and the beaches just 30-40 min by car." },
                { icon:"🏰", title:"San Marino & Castles", desc:"The Most Serene Republic just 35 min away. Intact medieval villages all around." },
              ].map(({icon,title,desc}) => (
                <div key={title} style={{ display: "flex", gap: "1rem", marginBottom: "0.6px", alignItems: "flex-start", background: C.cardBg, padding: "0.85rem 1rem", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background=C.bg2} onMouseLeave={e => e.currentTarget.style.background=C.cardBg}>
                  <span style={{ fontSize: "1.25rem", flexShrink: 0, marginTop: 2 }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1rem", color: C.text, fontWeight: 600, marginBottom: "0.2rem" }}>{title}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: C.textMid, lineHeight: 1.65 }}>{desc}</div>
                  </div>
                </div>
              ))}
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={120}>
          <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="poster-grid">
            {[poster6, poster4].map((src,i) => (
              <div key={i} style={{ overflow: "hidden", boxShadow: C.shadow }}>
                <img src={src} alt="Casa Cavour poster" style={{ width: "100%", display: "block", transition: "transform 0.55s ease" }}
                  onMouseEnter={e => e.currentTarget.style.transform="scale(1.03)"}
                  onMouseLeave={e => e.currentTarget.style.transform="scale(1)"} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){.loc-grid{grid-template-columns:1fr!important;gap:2rem!important}.poster-grid{grid-template-columns:1fr!important}}`}</style>
      <DiagDivider topColor={C.bg} botColor={C.bg2} flip />
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="experiences" style={{ background: C.bg2, padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem" }}>Simple from start to finish</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Your Romagna stay,<br /><span style={{ color: C.gold, fontStyle: "italic" }}>hassle-free.</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 0, position: "relative" }}>
          <div style={{ position: "absolute", top: "3.1rem", left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg,transparent,${C.border},${C.border},transparent)`, pointerEvents: "none" }} />
          {[
            { n:"01", t:"Search & Book", b:"Find us on Airbnb. Read reviews from guests who have already lived Romagna from here." },
            { n:"02", t:"We confirm", b:"Receive full access, local tips and personalised suggestions for your stay." },
            { n:"03", t:"Self check-in", b:"Arrive whenever you like. The keys are waiting. No queues, no reception." },
            { n:"04", t:"Live like a local", b:"Morning market, hilltop aperitivo, an unmarked winery. This is your Bertinoro." },
          ].map(({n,t,b}) => (
            <Reveal key={n} delay={parseInt(n)*60}>
              <div style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
                <div style={{ width: 50, height: 50, border: `1px solid ${C.border}`, margin: "0 auto 1.3rem", display: "flex", alignItems: "center", justifyContent: "center", background: C.cardBg, position: "relative", zIndex: 1, boxShadow: C.shadow }}>
                  <span style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", color: C.gold, fontSize: "0.88rem", fontWeight: 700 }}>{n}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.12rem", color: C.text, marginBottom: "0.6rem", fontWeight: 600 }}>{t}</h3>
                <p style={{ fontSize: "0.85rem", color: C.textMid, lineHeight: 1.75, fontFamily: "'DM Sans',sans-serif", margin: 0 }}>{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <DiagDivider topColor={C.bg2} botColor={C.bg} flip />
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="reviews" style={{ background: C.bg, padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem" }}>Real Experiences</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              What our guests<br /><span style={{ color: C.gold, fontStyle: "italic" }}>are saying.</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5px", background: C.border }}>
          {[
            { q:"We came for a weekend and stayed a week. The apartment is stunning and Bertinoro is an incredible discovery. We have told everyone about it.", n:"Sophie & Marc", o:"Paris, France", s:5 },
            { q:"As a digital nomad I was looking for reliable WiFi, space to work and beauty around me. Casa Cavour delivered everything. The most productive month of my life.", n:"James R.", o:"London, UK", s:5 },
            { q:"It is not just accommodation — it is an experience. The hosts tips took us to a family winery that was not even on Google Maps.", n:"Claudia M.", o:"Munich, Germany", s:5 },
            { q:"A perfect romantic weekend. Bertinoro at night is magical, and having our own apartment with a kitchen made everything even more special.", n:"Luca & Sara", o:"Milan, Italy", s:5 },
          ].map(({q,n,o,s}) => (
            <Reveal key={n} delay={80}>
              <div style={{ background: C.cardBg, padding: "2.25rem", height: "100%", boxSizing: "border-box", transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background=C.bg2}
                onMouseLeave={e => e.currentTarget.style.background=C.cardBg}>
                <div style={{ color: C.gold, fontSize: "0.9rem", letterSpacing: "0.06em", marginBottom: "1rem" }}>{"★".repeat(s)}</div>
                <p style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.05rem", color: C.text, lineHeight: 1.75, fontStyle: "italic", marginBottom: "1.75rem" }}>"{q}"</p>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.1rem" }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", color: C.text, fontSize: "0.85rem", fontWeight: 600 }}>{n}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", color: C.textSoft, fontSize: "0.75rem", marginTop: 3 }}>{o}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={160}>
          <div style={{ marginTop: "2.25rem", display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <div style={{ color: C.textSoft, fontSize: "0.73rem", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>On Airbnb</div>
            {["⭐ 5.0 / 5","100% Would recommend","Superhost"].map(b => (
              <div key={b} style={{ border: `1px solid ${C.border}`, padding: "0.3rem 0.85rem", fontSize: "0.72rem", color: C.gold, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.08em", background: C.cardBg }}>{b}</div>
            ))}
          </div>
        </Reveal>
      </div>
      <DiagDivider topColor={C.bg} botColor={C.bg2} flip />
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section style={{ background: C.bg2, padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">
        <Reveal>
          <div style={{ boxShadow: "0 20px 60px rgba(26,22,18,0.12), 0 0 0 1px rgba(160,120,42,0.1)", overflow: "hidden" }}>
            <img src={poster3} alt="Visit Casa Cavour Bertinoro" style={{ width: "100%", display: "block", transition: "transform 0.6s ease" }}
              onMouseEnter={e => e.currentTarget.style.transform="scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform="scale(1)"} />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span style={{ width: 26, height: 1, background: C.gold, display: "inline-block" }} /> Our Story
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.7rem,3vw,2.7rem)", color: C.text, fontWeight: 700, lineHeight: 1.15, marginBottom: "1.2rem", letterSpacing: "-0.02em" }}>
              A hidden gem,<br /><span style={{ color: C.gold, fontStyle: "italic" }}>lovingly kept.</span>
            </h2>
            <p style={{ fontSize: "0.94rem", color: C.textMid, lineHeight: 1.85, fontFamily: "'DM Sans',sans-serif", marginBottom: "1rem" }}>
              Casa Cavour is located on Via Cavour, one of the oldest streets in Bertinoro, a medieval hilltop village nicknamed the <em>"Balcony of Romagna"</em> for its panoramic views stretching to the Adriatic.
            </p>
            <p style={{ fontSize: "0.94rem", color: C.textMid, lineHeight: 1.85, fontFamily: "'DM Sans',sans-serif", marginBottom: "1.75rem" }}>
              The apartment was designed to give discerning travellers a home worthy of the region. A holiday apartment in the historic centre of Bertinoro, near Cesena, ideal for romantic weekends in the hills of Romagna.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "15 min from Cesena · 30 min from Cesenatico",
                "35 min from the Republic of San Marino",
                "40 min from Rimini and the Adriatic Riviera",
                "Direct access to the Wine and Flavours Road",
                "Steps from the best restaurants and wineries in Romagna",
              ].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <span style={{ color: C.gold, fontSize: "0.6rem", marginTop: "0.3rem", flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: "0.87rem", color: C.textMid, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
      <DiagDivider topColor={C.bg2} botColor={C.bg} flip />
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section style={{ background: C.bg, padding: "9rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg,rgba(160,120,42,0.05) 0%,transparent 55%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(12deg)", width: "60vw", height: "60vw", border: "1px solid rgba(160,120,42,0.07)", maxWidth: 700, pointerEvents: "none" }} />
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "1.3rem" }}>Ready to go?</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.8rem)", color: C.text, fontWeight: 700, lineHeight: 1.05, marginBottom: "1.3rem", letterSpacing: "-0.025em" }}>
            Your Romagna chapter<br /><span style={{ color: C.gold, fontStyle: "italic" }}>starts here.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: C.textMid, lineHeight: 1.85, fontFamily: "'DM Sans',sans-serif", marginBottom: "2.5rem" }}>
            Available dates fill up fast — especially during harvest season, spring weekends and summer. Check availability on Airbnb now.
          </p>
          <a href="https://airbnb.com/h/casacavour-bertinoro" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", background: C.gold, color: "#fff", padding: "1.15rem 2.75rem", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 8px 32px rgba(160,120,42,0.28)", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#8a6520"; e.currentTarget.style.transform="translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background=C.gold; e.currentTarget.style.transform="translateY(0)"; }}>
            Check availability on Airbnb ↗
          </a>
          <div style={{ marginTop: "1.5rem", fontSize: "0.74rem", color: C.textSoft, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.1em" }}>
            Secure booking · Instant confirmation · Flexible cancellation
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.bg3, borderTop: `1px solid ${C.border}`, padding: "4rem 2rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.9rem" }}>
              <img src={IMG.bertinoro} alt="Bertinoro" style={{ height: 30, width: 30, objectFit: "contain", filter: "brightness(0) saturate(100%) invert(45%) sepia(60%) saturate(600%) hue-rotate(10deg) brightness(85%)" }} />
              <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.1rem", color: C.gold, letterSpacing: "0.08em", fontWeight: 700 }}>CASA CAVOUR</div>
            </div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: C.textMid, lineHeight: 1.75, marginBottom: "0.65rem" }}>
              Via Cavour · Bertinoro (FC)<br />Emilia-Romagna · Italy 47032
            </div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", color: C.textSoft, lineHeight: 1.7 }}>
              Holiday apartment in the historic centre of Bertinoro.<br />Near Cesena, Rimini, San Marino.
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.textSoft, fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem" }}>Navigate</div>
            {[["Apartment","apartment"],["Location","location"],["Experiences","experiences"],["Reviews","reviews"]].map(([l,id]) => (
              <a key={l} href={`#${id}`} style={{ display: "block", color: C.textMid, textDecoration: "none", fontSize: "0.83rem", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.5rem", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color=C.gold} onMouseLeave={e => e.target.style.color=C.textMid}>
                {l}
              </a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.textSoft, fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem" }}>Book</div>
            <a href="https://airbnb.com/h/casacavour-bertinoro" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: C.gold, color: "#fff", padding: "0.55rem 1.1rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background="#8a6520"}
              onMouseLeave={e => e.currentTarget.style.background=C.gold}>
              Airbnb ↗
            </a>
            <div style={{ marginTop: "1.25rem", fontFamily: "'DM Sans',sans-serif", fontSize: "0.74rem", color: C.textSoft, lineHeight: 1.7 }}>Available on Airbnb.<br />Up to 4 guests.</div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ fontSize: "0.72rem", color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>© {new Date().getFullYear()} Casa Cavour · Bertinoro · All rights reserved</div>
          <div style={{ fontSize: "0.72rem", color: C.textSoft, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.1em" }}>WITH ♥ IN ROMAGNA</div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#faf8f4;color:#1a1612;-webkit-font-smoothing:antialiased;}
        ::selection{background:rgba(160,120,42,0.18);color:#1a1612;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#faf8f4;}
        ::-webkit-scrollbar-thumb{background:rgba(160,120,42,0.3);border-radius:3px;}
      `}</style>
      <Nav />
      <Hero />
      <Apartment />
      <Location />
      <HowItWorks />
      <Testimonials />
      <About />
      <FinalCTA />
      <Footer />
    </>
  );
}
