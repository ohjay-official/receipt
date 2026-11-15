import StableVideo from "./stable-video";

const LOOP = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a8f60da5-538f-403a-a812-6be0f098e319.mp4";
const GLOW = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4a917d4c-123f-4b68-8125-b201961b7791.jpg";

export default function PageHero({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="rx-page-hero">
      <StableVideo className="rx-page-video" src={LOOP} poster={GLOW} />
      <div className="rx-page-shade" />
      <div className="rx-page-copy">
        <p className="rx-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p>{lede}</p>
      </div>
    </header>
  );
}
