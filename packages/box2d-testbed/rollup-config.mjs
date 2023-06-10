import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

export default [
    {
        input: 'src/index.ts',

        output: [
            //
            { file: 'dist/index.js', sourcemap: true, format: 'es' },
            { file: 'dist/index.min.js', format: 'es', plugins: [terser()] },
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
