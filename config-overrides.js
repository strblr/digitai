const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const { default: darkTheme } = require('@ant-design/dark-theme')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      ...darkTheme,
      '@body-background': '#282C35'
    }
  })
)
