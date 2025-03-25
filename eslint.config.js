const nx = require('@nx/eslint-plugin');
const perfectionist = require('eslint-plugin-perfectionist');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    plugins: {
      perfectionist,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    // Override or add rules here
    rules: {
      'prefer-const': 'error',
      'no-console': [
        'error',
        {
          allow: ['error'],
        },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: ['top', 'unknown', ['optional-multiline-member']],
          customGroups: [
            {
              groupName: 'top',
              selector: 'property',
              elementNamePattern: '^(id|iid|tag|name)$',
            },
          ],
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-object-types': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: ['id'],
          customGroups: {
            id: ['id', 'tag'],
          },
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: ['id'],
          customGroups: {
            id: ['id', 'tag'],
          },
        },
      ],
      'perfectionist/sort-enums': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-classes': 'error',
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: ['key', 'id', 'unknown', 'shorthand', 'multiline'],
          customGroups: {
            key: 'key',
            id: 'id',
          },
        },
      ],
      'perfectionist/sort-exports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-named-exports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: [
            ['react', 'builtin', 'external'],
            'type',
            'internal-apps',
            'internal',
            'internal-type',
            ['parent', 'sibling', 'index'],
            ['parent-type', 'sibling-type', 'index-type'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              react: ['preact', 'react-*'],
              'internal-apps': ['@store/*', '@ui/*', '@utils/*'],
            },
          },
          newlinesBetween: 'always',
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
