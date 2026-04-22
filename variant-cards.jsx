// 案B: カード一覧リニューアル — 青春ポップ、グラデーション、ON AIRランプ
const { useState: useStateB } = React;

function VariantCards({ onOpenVideo }) {
  const bg = '#fff7f0';
  const ink = '#2d1b4e';
  const pink = '#ff6b9d';
  const blue = '#4dabf7';
  const yellow = '#ffd93d';

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: `linear-gradient(180deg, #ffe5ec 0%, ${bg} 30%, #e5f3ff 100%)`,
      fontFamily: '"M PLUS Rounded 1c", sans-serif',
      color: ink,
      padding: '28px 20px 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* 背景の小さな装飾 */}
      <div style={{ position: 'absolute', top: 100, left: 20, fontSize: 24, opacity: 0.25 }}>♪</div>
      <div style={{ position: 'absolute', top: 200, right: 30, fontSize: 18, opacity: 0.25 }}>♫</div>
      <div style={{ position: 'absolute', top: 450, left: 40, fontSize: 20, opacity: 0.2 }}>♬</div>
      <div style={{ position: 'absolute', top: 700, right: 20, fontSize: 22, opacity: 0.2 }}>★</div>

      {/* ヘッダー */}
      <header style={{ marginBottom: 28, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', padding: '8px 16px', borderRadius: 100,
            boxShadow: '0 4px 12px rgba(255,107,157,0.2)',
            border: `2px solid ${pink}`,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: pink, boxShadow: `0 0 12px ${pink}`, animation: 'pulse-on-air 1.4s ease-in-out infinite', flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: pink, whiteSpace: 'nowrap' }}>ON AIR</span>
          </div>
        </div>

        <h1 style={{
          fontFamily: '"RocknRoll One", sans-serif',
          fontSize: 42, lineHeight: 1, margin: 0, textAlign: 'center',
          color: ink,
          textShadow: `3px 3px 0 ${yellow}`,
        }}>
          ラジオ<span style={{ color: pink }}>3-B</span>
        </h1>
        <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, marginTop: 8, color: 'rgba(45,27,78,0.65)' }}>
          みんなのリクエストで教室を満たそう 🎧
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <button style={{
            background: `linear-gradient(135deg, ${pink} 0%, #ff8fab 100%)`,
            color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 100,
            fontFamily: 'inherit', fontSize: 14, fontWeight: 800,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10,
            boxShadow: '0 6px 16px rgba(255,107,157,0.35), inset 0 -3px 0 rgba(0,0,0,0.08)',
          }}>
            <span style={{ fontSize: 16 }}>✨</span>
            曲をリクエストする
          </button>
        </div>
      </header>

      {/* カウンター */}
      <div style={{
        display: 'flex', gap: 10, marginBottom: 20, position: 'relative', zIndex: 1,
      }}>
        <StatChip label="リクエスト" value={REQUESTS.length} color={pink} />
        <StatChip label="いいね" value={142} color={blue} />
        <StatChip label="今週" value="NEW" color={yellow} />
      </div>

      {/* カードグリッド */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, position: 'relative', zIndex: 1 }}>
        {REQUESTS.map((r, i) => (
          <PopCard key={i} req={r} index={i} onClick={() => onOpenVideo(r.videoId)} />
        ))}
      </div>

      <style>{`
        @keyframes pulse-on-air { 0%,100%{opacity:1;} 50%{opacity:0.35;} }
        @keyframes wiggle { 0%,100%{transform:rotate(0deg);} 25%{transform:rotate(-2deg);} 75%{transform:rotate(2deg);} }
      `}</style>
    </div>
  );
}

function StatChip({ label, value, color }) {
  return (
    <div style={{
      flex: 1, background: '#fff', padding: '10px 12px', borderRadius: 14,
      boxShadow: '0 3px 8px rgba(0,0,0,0.05)',
      border: `2px solid ${color}`,
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 18, fontWeight: 900, color, fontFamily: '"Bebas Neue", sans-serif', letterSpacing: 1 }}>{value}</div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(45,27,78,0.5)', marginTop: 1 }}>{label}</div>
    </div>
  );
}

function PopCard({ req, index, onClick }) {
  const ink = '#2d1b4e';
  const colors = [
    { card: '#fff', accent: '#ff6b9d', bubble: '#ffe5ec' },
    { card: '#fff', accent: '#4dabf7', bubble: '#e3f2ff' },
    { card: '#fff', accent: '#ffd93d', bubble: '#fff7d1' },
    { card: '#fff', accent: '#6bcf7f', bubble: '#e3f9e8' },
    { card: '#fff', accent: '#b794f6', bubble: '#f0e7ff' },
    { card: '#fff', accent: '#ff8c42', bubble: '#ffe8d1' },
  ];
  const c = colors[index % colors.length];

  return (
    <div style={{
      background: c.card, borderRadius: 20, overflow: 'visible',
      boxShadow: '0 6px 20px rgba(45,27,78,0.08)',
      border: `3px solid ${ink}`,
      position: 'relative',
    }}>
      {/* ナンバータブ */}
      <div style={{
        position: 'absolute', top: -12, left: 16,
        background: c.accent, color: '#fff',
        padding: '4px 12px', borderRadius: 100,
        fontFamily: '"Bebas Neue", sans-serif', fontSize: 16, letterSpacing: 2,
        border: `2px solid ${ink}`,
      }}>TRACK #{String(index + 1).padStart(2, '0')}</div>

      <div style={{ padding: '18px 16px 14px' }}>
        {/* サムネイル+曲情報 */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, marginTop: 4 }}>
          <div
            onClick={onClick}
            style={{
              width: 120, height: 68, borderRadius: 10, overflow: 'hidden',
              position: 'relative', cursor: 'pointer', flexShrink: 0,
              border: `2px solid ${ink}`,
            }}
          >
            <img
              src={`https://img.youtube.com/vi/${req.videoId}/hqdefault.jpg`}
              alt={req.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(45,27,78,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill={c.accent}><path d="M5 3l12 7-12 7z"/></svg>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: ink, lineHeight: 1.2, marginBottom: 3 }}>{req.title}</div>
            <div style={{ fontSize: 11, color: 'rgba(45,27,78,0.6)', fontWeight: 600 }}>{req.artist}</div>
            <div style={{ fontSize: 10, color: c.accent, fontWeight: 800, marginTop: 6, letterSpacing: 1 }}>
              ♬ REQ. {req.radioName}
            </div>
          </div>
        </div>

        {/* 推し理由吹き出し */}
        <div style={{
          position: 'relative', background: c.bubble, padding: '12px 14px 12px 36px',
          borderRadius: 14, marginBottom: 10,
          border: `2px solid ${ink}`,
        }}>
          <div style={{
            position: 'absolute', top: -2, left: -8,
            fontFamily: '"Shippori Mincho", serif', fontSize: 32, fontWeight: 700,
            color: c.accent, lineHeight: 1,
          }}>❝</div>
          <div style={{ fontSize: 13, lineHeight: 1.55, color: ink, fontWeight: 500 }}>
            {req.reason}
          </div>
        </div>

        {/* フッター */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(45,27,78,0.45)' }}>
            {req.timestamp.split(' ')[0]}
          </div>
          <HeartButton id={`pop-${index}`} size={18} />
        </div>
      </div>
    </div>
  );
}

window.VariantCards = VariantCards;
