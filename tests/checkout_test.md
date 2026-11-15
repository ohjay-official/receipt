---
url: https://example.vercel.app
timeout: 300
max_steps: 40
---

# Checkout price must match the pricing page

## Open the pricing page and confirm Pro is $19

Go to the start URL's `/pricing` page. Verify that the Pro plan is listed at $19 (nineteen dollars). The amount 19 must be visible on the pricing page.

## Choose Pro and continue to checkout

Choose the Pro plan and continue to checkout (`/checkout`).

## Checkout must show $19 for Pro

Verify that checkout shows $19 for Pro. Fail the step if checkout shows any other amount, including $29.

## LAUNCH10 takes 10% off Pro

On the checkout page, enter the coupon code LAUNCH10 and apply it. The Pro total due today must become $17.10 (ten percent off $19). Fail the step if the total is unchanged, shows NaN, or is any other amount.

## Pay works at a 390px mobile viewport

Narrow the page viewport to 390 pixels wide (a typical phone; use the browser's viewport or device toolbar if needed — Kane 0.10 has no viewport frontmatter key and rejects window widths under 800). Click the Pay button. Verify a confirmation that payment was accepted (for example the text "Payment accepted"). Fail if Pay does nothing, is covered, or cannot be clicked at this width.
