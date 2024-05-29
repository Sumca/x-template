// vite-plugin-transform-console.ts
// 自动转化console插件，可以打印文件和行数
import { readFileSync } from 'fs';
import { Plugin } from 'vite';

export default function transformConsolePlugin(): Plugin {
  return {
    name: 'transform-console', // 插件名称
    enforce: 'pre', // 在其他插件之前执行
    transform(code, id) {
      // 只处理 views 目录下的 JavaScript/TypeScript 文件
      if (!id.includes('/views/') || !/\.(js|ts|jsx|tsx|vue)$/.test(id)) {
        return;
      }

      // 读取文件内容并按行分割
      const lines = readFileSync(id, 'utf-8').split('\n');

      // 使用正则表达式匹配并替换代码
      const transformedCode = lines.map((line, index) => {
        return line.replace(
          /console\.log\(([^)]+)\)/g,
          (match, p1) => {
            // 去除空格和括号
            const variable = p1.trim();

            // 如果已经是 console.log('%c variable:', 'color: blue', variable) 格式，则不替换
            if (/^'.*'/.test(variable)) {
              return match;
            }

            const filePath = id.split('/').slice(-2).join('/'); // 获取文件路径
            const lineNumber = index + 1; // 行号从1开始计数

            const style = "color: #1e803f; font-size: 14px; background-color: #fff; font-weight: bold"; // 定义样式
            return `console.log('%c${filePath}文件第${lineNumber}行打印 => ${variable}:', '${style}', ${variable})`;
          }
        );
      }).join('\n');

      return {
        code: transformedCode,
        map: null // 如果需要，可以生成 source map
      };
    }
  };
}
