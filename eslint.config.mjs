import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const featuresDir = path.join(rootDir, "src/features");

const features = fs.existsSync(featuresDir)
  ? fs
      .readdirSync(featuresDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : [];

const SHARED_LAYERS = [
  "./src/components",
  "./src/hooks",
  "./src/lib",
  "./src/providers",
  "./src/store",
  "./src/types",
  "./src/config",
  "./src/styles",
];

const boundaryZones = [
  ...features.map((feature) => ({
    target: `./src/features/${feature}`,
    from: "./src/features",
    except: [`./${feature}`],
    message:
      "A feature must not import another feature. Move the shared code into src/lib or src/components.",
  })),
  {
    target: SHARED_LAYERS,
    from: ["./src/features", "./src/app"],
    message:
      "Shared layers must not import from features/ or app/. Dependencies only point downwards.",
  },
  {
    target: "./src/app",
    from: "./src/store",
    message:
      "Route files must not touch the store directly. Go through a feature.",
  },
];

const eslintConfig = defineConfig([
  { linterOptions: { reportUnusedDisableDirectives: "error" } },
  ...nextVitals,
  ...nextTs,
  {
    plugins: { import: importPlugin },
    settings: {
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "import/no-restricted-paths": ["error", { zones: boundaryZones }],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/*"],
              message:
                "Import a feature only through its public surface: @/features/<name>.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
