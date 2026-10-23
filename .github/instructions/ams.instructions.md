---
name: AMS Angular Conventions
description: 'Use when working on AMS Angular source, templates, styles, or unit tests.'
applyTo: ['src/**/*.ts', 'src/**/*.html', 'src/**/*.scss']
---

# AMS Conventions

- This is an Angular 21 application using strict TypeScript, standalone components, SCSS, RxJS, and Vitest.
- Follow nearby code and preserve existing public APIs; avoid unrelated refactoring.
- Keep feature code in its existing area under `src/app` (pages, components, services, guards, or pipes). Shared data interfaces belong in `src/models.ts` when that matches the existing design.
- Use the existing kebab-case file names, PascalCase class names, and `*.spec.ts` test naming.
- Prefer concrete TypeScript types over `any`; do not invent API response shapes or behavior.
- Unit tests use Angular `TestBed` and Vitest globals. Mock network calls and external dependencies rather than contacting a real backend.
- Use `npm test -- --watch=false` for unit tests and `npm run build` for a production build when validation is needed.
