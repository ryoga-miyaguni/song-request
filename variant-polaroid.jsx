// 案C: ポラロイド掲示板風 — コルクボードに写真を貼った感じ、手書き風
const { useState: useStateC } = React;

function VariantPolaroid({ onOpenVideo }) {
  const cork = '#d4a574';
  const ink = '#2a1f15';
  const paper = '#fdfbf3';

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: `
        repeating-radial-gradient(circle at 30% 40%, rgba(139,90,43,0.15) 0px, transparent 2px),
        repeating-radial-gradient(circle at 70% 60%, rgba(139,90,43,0.1) 0px, transparent 3px),
        linear-gradient(135deg, #d4a574 0%, #c49060 100%)
      `,
      fontFamily: '"Kosugi Maru", sans-serif',
      color: ink,
      padding: '24px 16px 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* コルクボードの枠 */}
      <div style={{ position: 'absolute', inset: 8, border: '12px solid #7a4a22', borderRadius: 4, pointerEvents: 'none', boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.2), inset 0 2px 8px rgba(0,0,0,0.15)' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '12px 8px' }}>
        {/* ヘッダー — マスキングテープで貼った紙 */}
        <div style={{ position: 'relative', marginBottom: 28 }}>
          <div style={{
            background: paper, padding: '22px 20px 20px',
            boxShadow: '0 6px 16px rgba(0,0,0,0.25), 2px 2px 0 rgba(0,0,0,0.05)',
            position: 'relative',
            transform: 'rotate(-1deg)',
          }}>
            {/* マスキングテープ */}
            <div style={{ position: 'absolute', top: -10, left: 20, width: 70, height: 22, background: 'rgba(255,107,157,0.7)', transform: 'rotate(-4deg)', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px)' }} />
            <div style={{ position: 'absolute', top: -10, right: 20, width: 70, height: 22, background: 'rgba(77,171,247,0.7)', transform: 'rotate(4deg)', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px)' }} />

            {/* ON AIRバッジ */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: ink, color: paper, padding: '4px 10px', borderRadius: 2, marginBottom: 10, transform: 'rotate(-2deg)' }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: '#ff4757', animation: 'pulse-on-air 1.6s ease-in-out infinite' }} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2 }}>ON AIR</span>
            </div>

            <h1 style={{
              fontFamily: '"Yusei Magic", sans-serif',
              fontSize: 36, lineHeight: 1, margin: 0,
              color: ink,
            }}>
              3-B 青春<br />プレイリスト
            </h1>
            <div style={{ fontSize: 13, fontWeight: 700, marginTop: 10, color: 'rgba(42,31,21,0.7)', fontFamily: '"Yusei Magic", sans-serif' }}>
              みんなの「今これ聴いて!!」を集めたよ♡
            </div>

            <button style={{
              marginTop: 14,
              background: '#ff6b9d', color: '#fff', border: 'none',
              padding: '10px 20px', borderRadius: 4,
              fontFamily: '"Yusei Magic", sans-serif', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
              transform: 'rotate(-1deg)',
            }}>
              📮 リクエスト投函する
            </button>
          </div>
        </div>

        {/* ポラロイドグリッド */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, position: 'relative' }}>
          {REQUESTS.map((r, i) => (
            <Polaroid key={i} req={r} index={i} onClick={() => onOpenVideo(r.videoId)} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-on-air { 0%,100%{opacity:1;} 50%{opacity:0.35;} }
        @keyframes gentle-sway { 0%,100%{transform:rotate(var(--r));} 50%{transform:rotate(calc(var(--r) + 0.5deg));} }
      `}</style>
    </div>
  );
}

function Polaroid({ req, index, onClick }) {
  const rotations = [-3.2, 2.8, -1.8, 3.5, -2.4, 2.1];
  const tapeColors = ['rgba(255,217,61,0.75)', 'rgba(255,107,157,0.7)', 'rgba(107,207,127,0.7)', 'rgba(77,171,247,0.7)'];
  const reasonColors = ['#fff9c4', '#ffe5ec', '#e3f9e8', '#e3f2ff', '#ffe8d1', '#f0e7ff'];
  const rot = rotations[index % rotations.length];
  const tape = tapeColors[index % tapeColors.length];
  const reasonBg = reasonColors[index % reasonColors.length];
  const ink = '#2a1f15';
  const paper = '#fdfbf3';

  const [hover, setHover] = useStateC(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        transform: hover ? `rotate(${rot * 0.3}deg) translateY(-4px)` : `rotate(${rot}deg)`,
        transition: 'transform 0.3s cubic-bezier(.2,.8,.3,1.2)',
        marginTop: index % 2 === 1 ? 16 : 0,
      }}
    >
      {/* マスキングテープ */}
      <div style={{
        position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%) rotate(-3deg)',
        width: 60, height: 18, background: tape,
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px)',
        zIndex: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }} />

      {/* ポラロイド本体 */}
      <div style={{
        background: paper, padding: '10px 10px 14px',
        boxShadow: '0 6px 16px rgba(0,0,0,0.2), 2px 2px 0 rgba(0,0,0,0.06)',
      }}>
        {/* 写真 */}
        <div
          onClick={onClick}
          style={{
            width: '100%', aspectRatio: '1 / 1',
            background: '#000',
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
            marginBottom: 8,
          }}
        >
          <img
            src={`https://img.youtube.com/vi/${req.videoId}/hqdefault.jpg`}
            alt={req.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.9) contrast(1.05)' }}
          />
          {/* ビンテージオーバーレイ */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(160deg, rgba(255,220,150,0.15) 0%, transparent 50%, rgba(100,60,20,0.2) 100%)',
            pointerEvents: 'none',
          }} />
          {/* 再生マーク */}
          {hover && (
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill={ink}><path d="M5 3l12 7-12 7z"/></svg>
              </div>
            </div>
          )}
          {/* 日付スタンプ */}
          <div style={{
            position: 'absolute', bottom: 6, right: 6,
            fontFamily: '"DotGothic16", monospace', fontSize: 9, color: '#ff8800',
            background: 'rgba(0,0,0,0.3)', padding: '1px 4px',
            letterSpacing: 0.5,
          }}>{req.timestamp.split(' ')[0].replace(/\//g, '.')}</div>
        </div>

        {/* 曲名 (手書き風) */}
        <div style={{ fontFamily: '"Yusei Magic", sans-serif', fontSize: 13, fontWeight: 700, color: ink, lineHeight: 1.2, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          ♪ {req.title}
        </div>
        <div style={{ fontFamily: '"Yusei Magic", sans-serif', fontSize: 10, color: 'rgba(42,31,21,0.6)', marginBottom: 8 }}>
          {req.artist}
        </div>

        {/* 推し理由 (手紙風) */}
        <div style={{
          background: reasonBg, padding: '8px 10px',
          fontFamily: '"Yusei Magic", sans-serif', fontSize: 11, lineHeight: 1.5, color: ink,
          position: 'relative',
          backgroundImage: `repeating-linear-gradient(transparent, transparent 15px, rgba(42,31,21,0.08) 15px, rgba(42,31,21,0.08) 16px)`,
        }}>
          {req.reason}
        </div>

        {/* フッター */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingTop: 6, borderTop: '1px dashed rgba(42,31,21,0.2)' }}>
          <div style={{ fontFamily: '"Yusei Magic", sans-serif', fontSize: 11, fontWeight: 700, color: ink }}>
            From. {req.radioName}
          </div>
          <HeartButton id={`pol-${index}`} size={16} />
        </div>
      </div>
    </div>
  );
}

window.VariantPolaroid = VariantPolaroid;
