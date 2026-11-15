---
test: ../checkout_test.md
status: failed
started: 2026-11-12T10:00:00.000Z
duration_s: 42
session_id: test-session-failed
---

## Open the pricing page and confirm Pro is $19 ✓ passed (6s)
Open /pricing. The Pro plan was listed at $19.

## Choose Pro and continue to checkout ✓ passed (5s)
Continued to /checkout.

## Checkout must show $19 for Pro ✗ failed (8s)
Checkout showed $29 for Pro instead of $19.
