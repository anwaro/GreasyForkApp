export default {
  coverageDirectory: '../../coverage/apps/vimeo-speed-slider',
  displayName: 'vimeo-speed-slider',
  moduleFileExtensions: ['ts', 'js', 'html'],
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
};
