export function HeroResinVisual() {
  return (
    <figure className="m-0 w-full max-w-md lg:max-w-none lg:justify-self-end">
      <div className="relative mx-auto w-full max-w-[min(100%,520px)]">
        <div className="relative aspect-square w-full">
          <div
            className="absolute inset-0 rounded-full bg-bg shadow-[0_24px_48px_rgba(30,48,36,0.07)] ring-1 ring-green/10"
            aria-hidden
          />
          <div
            className="absolute inset-[5%] rounded-full opacity-90"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, rgba(255,255,255,0.92) 0%, rgba(232,235,228,0.5) 42%, transparent 72%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-[8%] rounded-full opacity-75"
            style={{
              background:
                "radial-gradient(ellipse 75% 65% at 50% 55%, rgba(197,207,192,0.38) 0%, transparent 68%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-[1.5%] z-[1] overflow-hidden rounded-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/hero-resin-art.webp)" }}
            role="img"
            aria-label="Круглое панно из смолы с сохранёнными розами"
          />
        </div>
      </div>
    </figure>
  );
}
