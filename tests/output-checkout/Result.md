---
test: ../checkout_test.md
status: passed
started: 2026-11-15T06:21:58.624Z
duration_s: 74
session_id: 7772a052-ec2b-4973-9104-75719675aa70
---

# Checkout price must match the pricing page — Result

## Open the pricing page and confirm Pro is $19 ✓ passed (38.5s)
md5: a47e45f51ca313986d70cdeffd9a2c57
Go to the start URL's `/pricing` page. Verify that the Pro plan is listed at $19 (nineteen dollars). The amount 19 must be visible on the pricing page.

## Choose Pro and continue to checkout ✓ passed (17.6s)
md5: 2f9eb268c4a649ed8c591171e07d3512
Choose the Pro plan and continue to checkout (`/checkout`).

## Checkout must show $19 for Pro ✓ passed (13.5s)
md5: 816bffe8fa554d33332db01fe6213411
Verify that checkout shows $19 for Pro. Fail the step if checkout shows any other amount, including $29.
