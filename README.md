# React + TypeScript + Vite Boilerplate

This is a boilerplate for developing React applications using TypeScript and Vite. It includes a set of commonly used development tools to ensure code quality, consistency, and smooth CI/CD integration.

## Technologies

- [**React**](https://react.dev/) - A JavaScript library for building user interfaces.
- [**TypeScript**](https://www.typescriptlang.org/) - Statically typed JavaScript for an improved development experience.
- [**Vite**](https://vitejs.dev/) - A fast build tool and development server.

## Development Tools

- [**Commitlint**](https://commitlint.js.org/) - Enforces conventional commit messages.
- [**Prettier**](https://prettier.io/) - Ensures consistent code formatting and import order.
- [**ESLint**](https://eslint.org/) - Lints code to maintain quality and prevent errors.
- [**Lint-staged**](https://github.com/okonet/lint-staged) - Runs pre-commit checks on staged files, ensuring only formatted code is committed.
- [**Vitest**](https://vitest.dev/) - A unit testing framework.
- [**Changeset**](https://github.com/changesets/changesets) - Manages versioning and release notes.
- [**GitHub Actions**](https://github.com/features/actions) - Automates linting, testing, and formatting checks on pull requests and pushes.

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (>= v20.15)
- **PNPM** (>= v10.3.0)

## Getting Started

1. **Clone the repository**

   ```sh
   git clone <repo-url>
   cd <project-directory>
   ```

2. **Install dependencies**

   ```sh
   pnpm install
   ```

3. **Run the development server**

   ```sh
   pnpm dev
   ```

Open the app at [http://localhost:5173](http://localhost:5173).

## Recommended Folder Structure

File imports within these directories will be automatically ordered by Prettier's import order configuration.

```bash
/src
├── assets     # Static assets
│ ├── img      # Image files
│ ├── styles   # Global styles
├── components # Presentational components
├── constants  # Constants and configuration
├── containers # Container components
├── hooks      # Custom React hooks
├── services   # Business logic and API calls
├── types      # TypeScript types and interfaces
├── utils      # Utility functions
```

## Path Aliases

To simplify imports, this project uses the `@/*` alias to refer to the `./src/*` directory.

Example usage:

```tsx
import MyComponent from '@/components/MyComponent'
```

## Available Scripts

The following scripts are available:

- **`pnpm build`** - Builds the app for production using Vite.
- **`pnpm lint`** - Runs ESLint to check code quality.
- **`pnpm prettier:fix`** - Formats code and assets using Prettier.
- **`pnpm test`** - Runs unit tests using Vitest.
- **`pnpm test:watch`** - Watches for changes and re-runs tests automatically.
- **`pnpm test:ui`** - Launches the Vitest UI for interactive test execution.

## Applying Template Updates

If the template is updated, apply the changes using the following commands:

```sh
git remote add template <template-repo-url>
git fetch template
git merge template/main --allow-unrelated-histories
```
