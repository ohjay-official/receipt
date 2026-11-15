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
