// Shared utilities & YouTube modal
const { useState, useEffect, useRef } = React;

// Shared Google Fonts injection (once)
if (typeof document !== 'undefined' && !document.getElementById('class-music-fonts')) {
  const l = document.createElement('link');
  l.id = 'class-music-fonts';
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700;800;900&family=Kosugi+Maru&family=Yusei+Magic&family=DotGothic16&family=Rampart+One&family=RocknRoll+One&family=Shippori+Mincho:wght@600;700&family=Bebas+Neue&display=swap';
  document.head.appendChild(l);
}

// YouTube modal — shared across all three variants
function VideoModal({ videoId, onClose }) {
  if (!videoId) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(8,6,20,0.88)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 960 }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: -44, right: 0,
            background: 'transparent', border: 'none', color: '#fff',
            fontSize: 32, fontWeight: 300, cursor: 'pointer', lineHeight: 1,
          }}
        >×</button>
        <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: 12, overflow: 'hidden', background: '#000', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <iframe
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

// Heart / like button with localStorage persistence
function HeartButton({ id, size = 20 }) {
  const key = `like_${id}`;
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      const { liked: l, count: c } = JSON.parse(saved);
      setLiked(l); setCount(c);
    } else {
      // Seed with a pseudo-random count based on id so it feels populated
      const seed = id.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
      setCount(3 + (seed % 28));
    }
  }, [id]);

  const toggle = (e) => {
    e.stopPropagation();
    const nl = !liked;
    const nc = nl ? count + 1 : Math.max(0, count - 1);
    setLiked(nl); setCount(nc);
    setBump(true); setTimeout(() => setBump(false), 400);
    localStorage.setItem(key, JSON.stringify({ liked: nl, count: nc }));
  };

  return (
    <button
      onClick={toggle}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
        color: liked ? '#ff3d68' : 'rgba(0,0,0,0.45)',
        fontFamily: 'inherit', fontSize: size * 0.7, fontWeight: 700,
        transform: bump ? 'scale(1.25)' : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(.2,.9,.3,1.4), color 0.15s',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.5 12 21 12 21z"/>
      </svg>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{count}</span>
    </button>
  );
}

Object.assign(window, { VideoModal, HeartButton });
