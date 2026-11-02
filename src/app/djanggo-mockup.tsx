export function DjanggoMockup() {
  return <div className="project-video-cover dual-device-scene" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, .2fr)", gap: "6%", padding: "8% 1%", alignItems: "center" }} aria-label="Kedai Djanggo desktop admin and mobile customer video previews">
    <div className="monitor dual-monitor"><div className="monitor-display"><div className="monitor-camera" /><div className="monitor-screen"><video src="/video/kedai-djanggo-admin.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Kedai Djanggo admin preview" /></div><div className="monitor-chin" /></div><div className="monitor-stand" /><div className="monitor-foot" /></div>
    <div className="phone-mockup" style={{ position: "relative", left: "auto", right: "auto", bottom: "auto", width: "100%", marginTop: "20%", aspectRatio: "452 / 1020", padding: "4px", borderRadius: "10px", transform: "perspective(1100px) rotateX(8deg) rotateY(-17deg) rotateZ(5deg)" }}><div className="phone-screen"><video src="/video/kedai-djanggo-user.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Kedai Djanggo customer preview" /></div></div>
  </div>;
}
