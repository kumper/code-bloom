
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Project Overview

CodeBloom is an Angular web application that presents interactive coding quizzes. Users are shown code snippets alongside multiple-choice answers and can submit their answers to get instant feedback. The app is deployed to GitHub Pages at `/code-bloom/`.

## Tech Stack

- **Framework**: Angular 21+ (standalone components, no NgModules)
- **Language**: TypeScript 5.9 with strict mode enabled
- **Styling**: Bootstrap 5 + component-level CSS
- **Testing**: Vitest (via `@angular/build:unit-test`)
- **Build**: Angular CLI (`ng build`)
- **Package manager**: npm

## Development Workflow

Install dependencies:
```bash
npm install
```

Start the development server (http://localhost:4200):
```bash
npm start
```

Build the production bundle:
```bash
npm run build
```

Run unit tests:
```bash
npm test
```

Format code with Prettier:
```bash
npx prettier --write .
```

## Project Structure

```
src/
  app/
    components/       # Reusable UI components (e.g., quiz-card)
    app.ts            # Root component
    app.routes.ts     # Application routes
    app.config.ts     # Application configuration
```

Each component lives in its own folder and includes a `.ts`, `.html`, `.css`, and `.spec.ts` file.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
