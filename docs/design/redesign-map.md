# Railway home map, measured 15 Nov 2026

Source: https://railway.com/ rendered at 1440×900. Document scroll height 12493px. Ten regions. Copy below is Railway's, quoted only to record shape and length. The Receipt page rewrites those shapes. It does not reuse the sentences.

| # | Height | Heading | Subhead shape | Placement |
| --- | --- | --- | --- | --- |
| 1 | 1716px | Ship software peacefully | One short line under the headline. One primary pill, "Deploy". | Nav across the top. Headline and subhead in the upper left of a full-bleed scene. A large product surface (dashboard, build log) fills the lower part and runs past the fold. |
| 2 | 1712px | Deploy anything without the complexity | One sentence, then "Learn more". | Headline and subhead above a wide product visual. |
| 3 | 765px | Instant networking. Zero setup. | One sentence, no second button. | Shorter band. Text leads, visual sits with it. |
| 4 | 761px | Grow big without the growing pains | One sentence. | Same rhythm as 3. A pair of short bands between the long ones. |
| 5 | 1741px | Logs, metrics, and traces in one place. Clarity without the chaos. | Two sentences, then "Learn more". | Long band. Headline can run to two lines. Body is wider than the short bands. |
| 6 | 1421px | Finally, a development workflow that actually flows. | Two short sentences. | Long band again, after the pair of short ones. |
| 7 | 1390px | Trusted by the best in business | One sentence inviting quotes. | Social proof. Receipt does not invent quotes, logos, or counts. This slot becomes the demo-shop calculator, which uses only shop/lib figures. |
| 8 | 1800px | 0+ deploys per month (and counting) | One sentence naming the live totals. | A large figure band. Receipt uses only counts that exist: 49 action tests, 3 seeded bugs, attempt cap 3, 5 proof PRs, $19 versus $29. |
| 9 | 88px | (same heading, a thin repeat) | | Ignored as a layout duplicate. |
| 10 | 652px | Railway site links | Copyright line. | Footer. Columns: Product, Compare, Resources, Company, Contact, Legal. |

Nav on Railway: Product, Developers, Enterprise, Company, Pricing, then "Sign in" and "Book a demo".

Receipt section order, matching that rhythm and at least that length at 1440px wide:

| # | Receipt section | Brief | Railway slot |
| --- | --- | --- | --- |
| 1 | Hero, 100vh, jet video, overlapping two-line heading, two pills | SkyElite hero | 1, compressed to the spec's 100vh |
| 2 | Tall feature band, min-height 1712px | Railway shape, Receipt copy | 2 |
| 3 | How it works stage, 100svh, three 429×554 cards | Built for Intelligent Performance | 3–4 as one specified stage |
| 4 | Short band, min-height 765px | Railway shape | 3 |
| 5 | Short band, min-height 761px | Railway shape | 4 |
| 6 | Proof conveyor, one viewport | Distill | 5 |
| 7 | Workflow band, min-height 1421px | Railway shape | 6 |
| 8 | Demo shop calculator | Calculator brief | 7, no invented logos or prices |
| 9 | Why Receipt, three cards, width-scaled canvas | Vela, scaled to viewport width | extra creative band the brief requires |
| 10 | Stats band, real counts only | Railway shape of slot 8 | 8 |
| 11 | Install, tear-off slip in the hero/footer family | Creative install | before the footer |
| 12 | Footer, one screen | Vantix | 10 |

Palette for every section: ink #202A36, gray-500 #6b7280, gray-600 #4b5563, gray-300 #d1d5db, paper #f9fafb, white. The single accent is #202A36. It is the primary pill, the scanner, the LED dots, the slider, and the footer marks. Media URLs stay on the hosts named in the brief. Card and footer videos keep their own pixels. UI chrome does not add a second hue.

Known spec gaps, recorded on purpose:

- Distill specifies six Kessler cards. Receipt has five real proof pull requests (#1 through #5). Five cards are used. The sixth Higgsfield photo (salt flats) is not given a fictional card.
- Calculator formulas in the brief invent agency and freelancer prices. Those formulas are not used. Every dollar figure is read from shop/lib.
- Vela and the glass cards specify hue gradients (cobalt, orange, pink). Those UI colors are remapped onto the single scheme. Layout, type scale, radii, timing, hover behavior, and media URLs stay.
- Shop routes keep main's header, footer, and globals.css, so they stay pixel-identical to main.
