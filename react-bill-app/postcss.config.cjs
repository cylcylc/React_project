//postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue:37.5,
      propList: ['*'], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，这里设置为['*']全部，假设需要仅对边框进行设置
    },
  },
}