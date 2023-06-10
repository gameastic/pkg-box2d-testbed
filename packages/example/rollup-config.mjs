import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

export default [
    {
        input: 'src/index.ts',

        output: [
            //
            { dir: 'dist', format: 'esm' },
        ],

        plugins: [
            //
            commonjs(),
            resolve(),
            serve({ port: 8080 }),
            livereload(),
            copy({
                targets: [{ src: 'assets', dest: 'dist' }],
            }),
        ],
    },
];
