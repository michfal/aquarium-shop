// eslint.config.ts
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

// __dirname dla ESM/TS i normalizacja ścieżki (ważne na Windows)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TS_ROOT = path.resolve(__dirname);

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    languageOptions: {
      parserOptions: {
        // Jeśli chcesz reguły type-checked:
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: TS_ROOT,
        extraFileExtensions: ['.vue'],
      },
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // Bazowe reguły Vue
  pluginVue.configs['flat/essential'],
  // Presety TS od Vue (możesz podmienić na ...recommendedTypeChecked, jeśli wolisz)
  vueTsConfigs.recommended,

  // Wyłącza konflikty z Prettierem
  skipFormatting,
);
