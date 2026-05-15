export function SolonLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'text-[16px]', md: 'text-[20px]', lg: 'text-[28px]' };
  return (
    <div className={`font-serif font-semibold ${sizes[size]} select-none`} style={{ color: 'var(--ink)' }}>
      solon
      <span className="font-serif not-italic font-normal" style={{ color: 'var(--forest-600)' }}>.</span>
    </div>
  );
}
