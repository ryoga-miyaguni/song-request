// 案A: ビニールレコード風 — 丸いジャケット、回転するレコード、カセット風アクセント
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

function VariantRecord({ onOpenVideo }) {
  const bg = '#f4ebd9'; // クリーム色の背景
  const ink = '#1a1a2e';
  const accent = '#e63946';
  const gold = '#c9a961';

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: `radial-gradient(ellipse at top, #fff5e1 0%, ${bg} 60%)`,
      fontFamily: '"M PLUS Rounded 1c", sans-serif',
      color: ink,
      padding: '28px 24px 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* 背景装飾 — 大きな音符 */}
      <div style={{ position: 'absolute', top: 40, right: -30, fontSize: 180, opacity: 0.06, fontWeight: 900, color: ink, transform: 'rotate(15deg)', pointerEvents: 'none' }}>♪</div>
      <div style={{ position: 'absolute', bottom: 60, left: -20, fontSize: 140, opacity: 0.05, fontWeight: 900, color: ink, transform: 'rotate(-10deg)', pointerEvents: 'none' }}>♫</div>

      {/* ラジオ局風ヘッダー */}
      <header style={{ marginBottom: 28, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ink, color: bg, padding: '6px 12px', borderRadius: 20, whiteSpace: 'nowrap' }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: accent, boxShadow: `0 0 8px ${accent}`, animation: 'pulse-on-air 1.6s ease-in-out infinite', flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, whiteSpace: 'nowrap' }}>ON AIR</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(26,26,46,0.5)', letterSpacing: 1 }}>FM 3-B · 2026</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4, flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
          <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 48, lineHeight: 0.9, fontWeight: 400, letterSpacing: 2 }}>CLASS</div>
          <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 28, lineHeight: 0.9, color: accent, letterSpacing: 2 }}>RADIO</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: ink, marginBottom: 14 }}>みんなのリクエスト、全部かけます。</div>

        <button style={{
          background: ink, color: bg, border: 'none',
          padding: '12px 22px', borderRadius: 100,
          fontFamily: '"M PLUS Rounded 1c", sans-serif', fontSize: 13, fontWeight: 800,
          cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
          boxShadow: `4px 4px 0 ${accent}`,
        }}>
          <span>✉️</span> 曲をリクエストする
        </button>
      </header>

      {/* NOW SPINNING (大きい1曲ピックアップ) */}
      <div style={{
        background: ink, color: bg, borderRadius: 16, padding: 18,
        marginBottom: 32, position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: gold, fontWeight: 700, marginBottom: 8 }}>▸ NOW SPINNING</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* スピニングレコード */}
          <RecordSpinner videoId={REQUESTS[0].videoId} onClick={() => onOpenVideo(REQUESTS[0].videoId)} size={100} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{REQUESTS[0].title}</div>
            <div style={{ fontSize: 12, color: 'rgba(244,235,217,0.6)', marginBottom: 8 }}>{REQUESTS[0].artist}</div>
            <div style={{ fontSize: 11, color: gold, fontWeight: 700, letterSpacing: 1 }}>REQ. by {REQUESTS[0].radioName}</div>
          </div>
        </div>
      </div>

      {/* セクションラベル */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, position: 'relative', zIndex: 1 }}>
        <div style={{ height: 2, background: ink, flex: 1 }} />
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: ink }}>TRACK LIST · {REQUESTS.length}曲</div>
        <div style={{ height: 2, background: ink, flex: 1 }} />
      </div>

      {/* レコードグリッド */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, position: 'relative', zIndex: 1 }}>
        {REQUESTS.slice(1).map((r, i) => (
          <RecordCard key={i} req={r} index={i + 1} onClick={() => onOpenVideo(r.videoId)} />
        ))}
      </div>

      <style>{`
        @keyframes pulse-on-air { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        @keyframes spin-record { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
      `}</style>
    </div>
  );
}

function RecordSpinner({ videoId, onClick, size = 120 }) {
  const [hover, setHover] = useStateA(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{ width: size, height: size, position: 'relative', cursor: 'pointer', flexShrink: 0 }}
    >
      {/* レコード本体 */}
      <div style={{
        width: '100%', height: '100%', borderRadius: '50%',
        background: `
          repeating-radial-gradient(circle at center, #0a0a0a 0px, #0a0a0a 2px, #1a1a1a 2px, #1a1a1a 3px)
        `,
        animation: 'spin-record 4s linear infinite',
        animationPlayState: hover ? 'paused' : 'running',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.05)',
        position: 'relative',
      }}>
        {/* ジャケット画像 (中央) */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '42%', height: '42%', borderRadius: '50%',
          backgroundImage: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          boxShadow: '0 0 0 2px #f4ebd9, 0 0 0 4px #0a0a0a',
        }} />
        {/* センターホール */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 6, height: 6, borderRadius: 3, background: '#f4ebd9',
        }} />
      </div>
      {/* 再生インジケータ */}
      {hover && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(230,57,70,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="#fff"><path d="M5 3l12 7-12 7z" /></svg>
          </div>
        </div>
      )}
    </div>
  );
}

function RecordCard({ req, index, onClick }) {
  const ink = '#1a1a2e';
  const paperColors = ['#ffe5a0', '#ffc9a0', '#c9e5a0', '#a0d5ff', '#e5a0ff'];
  const paperColor = paperColors[index % paperColors.length];
  return (
    <div style={{ position: 'relative' }}>
      {/* レコード */}
      <RecordSpinner videoId={req.videoId} onClick={onClick} size={130} />
      {/* 番号バッジ */}
      <div style={{
        position: 'absolute', top: -6, right: -6, width: 30, height: 30, borderRadius: 15,
        background: ink, color: '#f4ebd9', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Bebas Neue", sans-serif', fontSize: 15, letterSpacing: 1,
        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
      }}>{String(index + 1).padStart(2, '0')}</div>

      {/* タイトル */}
      <div style={{ marginTop: 10, marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: ink, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{req.title}</div>
        <div style={{ fontSize: 10, color: 'rgba(26,26,46,0.55)', marginTop: 1 }}>{req.artist}</div>
      </div>

      {/* 推し理由カード（付箋風）*/}
      <div style={{
        background: paperColor, padding: '8px 10px', borderRadius: 4,
        fontSize: 11, lineHeight: 1.45, color: ink,
        transform: `rotate(${(index % 2 === 0 ? -1 : 1) * 1.2}deg)`,
        boxShadow: '2px 2px 0 rgba(0,0,0,0.08)',
        marginBottom: 8,
      }}>
        {req.reason}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: ink, background: 'rgba(26,26,46,0.08)', padding: '3px 8px', borderRadius: 10 }}>
          👤 {req.radioName}
        </div>
        <HeartButton id={`rec-${index}`} size={16} />
      </div>
    </div>
  );
}

window.VariantRecord = VariantRecord;
