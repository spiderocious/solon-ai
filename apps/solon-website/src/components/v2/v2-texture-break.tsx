export function V2TextureBreak() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '200px' }}>
      <div
        className="absolute inset-x-0 top-0 h-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, var(--paper-2), transparent)' }}
      />
      <img
        src="/v2/texture.png"
        alt=""
        className="w-full h-full object-cover object-center"
        style={{ filter: 'sepia(0.08) brightness(0.92) saturate(0.8)', opacity: 0.85 }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--paper), transparent)' }}
      />
    </div>
  );
}
