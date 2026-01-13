// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';
import theme from './theme';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  history: {
    type: 'browser',
  },
  routes,
  title: false,

  // 定义环境变量供客户端使用
  define: {
    'process.env.REACT_APP_ENV': REACT_APP_ENV,
  },

  // antd 配置
  antd: {
    configProvider: {},
    // 使用 dayjs 替代 moment
    momentPicker: false,
  },

  // dva 数据流
  dva: {},

  // 主题配置
  theme: theme,

  // 代理配置
  proxy: proxy[REACT_APP_ENV || 'dev'],

  // 请求配置
  request: {
    dataField: 'data',
  },

  // 外部脚本 - 仅在生产环境使用 CDN
  // headScripts: [
  //   'https://unpkg.com/react@18/umd/react.production.min.js',
  //   'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  //   'https://unpkg.com/@ant-design/charts@1.4.0/dist/charts.min.js',
  // ],

  // externals 配置 - 仅在生产环境使用
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  //   '@ant-design/charts': 'charts',
  // },

  // manifest
  manifest: {
    basePath: '/',
  },

  // 代码分割
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },

  // 修复 esbuild helpers 冲突
  esbuildMinifyIIFE: true,
});
