const esbuild = require('esbuild');
const pkg = require('./package.json');
const fs = require('fs-extra');
const path = require('path');

// 确保dist目录存在
fs.ensureDirSync('dist');

// 复制public文件夹内容到dist目录
fs.copySync('public', 'dist', {
  overwrite: true,
  errorOnExist: false
});

esbuild.build({
  banner: {
    js: `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * Author: ${pkg.author}
 * Created: 2025-04-02 18:07:00
 * Updated: ${new Date().toLocaleString('zh-CN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    timeZone: 'Asia/Shanghai' 
  }).replace(
    /(\d+)\/(\d+)\/(\d+).*?(\d+):(\d+):(\d+).*/, 
    '$1-$2-$3 $4:$5:$6'
  )}
 * Repository: ${pkg.repository}
 */`,
  },
  entryPoints: ['src/main.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'iife',
  sourcemap: true,
  target: ['es2015'],
  platform: 'browser',
  globalName: 'SA',
  minify: false,
}).catch(() => process.exit(1));