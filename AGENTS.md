# Agent And Steering Guide

## Objective
Keep AI-generated changes reliable, testable, and aligned with framework standards.

## Guardrails
- Prefer small, focused changes.
- Do not weaken lint, formatting, or test gates.
- Avoid brittle selectors and hard sleeps.
- Keep page objects interaction-focused and reusable.
- Keep tests assertion-driven and outcome-focused.

## Required Checks Before Merge
1. `npm run format:check`
2. `npm run lint`
3. `npm run test:ci`

## Repository Conventions
- Add tests in `e2e-tests/*.spec.js`.
- Store test data in `test-data/*.json`.
- Put reusable UI actions in `e2e-tests/page-objects/`.
- Keep fixture expansion in `e2e-tests/fixtures/testFixtures.js`.

## Documentation Rule
If scripts, execution behavior, or quality gates change, update `README.md` and `GUARDRAILS.md` in the same PR.
