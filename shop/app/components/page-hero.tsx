import Link from "next/link";

const STILL = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/5c3ec08f-2dbf-4c0a-8588-f6106a789443.webp";

export default function PageHero({
  kicker,
  title,
  lede,
  crumb,
  primary,
  secondary,
}: {
  kicker: string;
  title: string;
  lede: string;
  crumb?: { href: string; label: string }[];
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <header className="rx-page-hero">
      <div className="rx-page-still" style={{ backgroundImage: `url(${STILL})` }} aria-hidden="true" />
      <div className="rx-page-copy">
        {crumb ? (
          <p className="rx-crumb">
            <Link href="/">Home</Link>
            {crumb.map((item) => (
              <span key={item.href}> / <Link href={item.href}>{item.label}</Link></span>
            ))}
          </p>
        ) : null}
        <p className="rx-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p>{lede}</p>
        {primary ? (
          <div className="rx-pills">
            <Link className="rx-pill rx-pill-ink" href={primary.href}>{primary.label}</Link>
            {secondary ? <Link className="rx-pill rx-pill-ghost" href={secondary.href}>{secondary.label}</Link> : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
