import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

export default [
    {
        input: 'src/index.ts',

        external: ['@box2d/core', 'pixi.js'],

        output: [
            //
            { file: 'dist/index.js', sourcemap: true, format: 'esm' },
            { file: 'dist/index.min.js', format: 'esm', plugins: [terser()] },
        ],

        plugins: [
            //
            esbuild(),
        ],
    },

    {
        input: 'src/index.ts',
        plugins: [dts({})],
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
    },
];
