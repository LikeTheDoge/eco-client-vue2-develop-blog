module.exports = {
    publicPath: `/develop-blog/`,
    outputDir: './dist/develop-blog/',
    lintOnSave: false,
    pages: {
        index: {
            // page 的入口
            entry: './index.js',
            // 模板来源
            template: './index.html',
            favicon: './favicon.ico',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: 'src/subpage/main.js'
    },
    devServer: {
        port: 5173,
        proxy: {
            '/': {
                target: 'http://192.168.161.10:11080/',
                ws: true,
                bypass: function(req) {
                    const url = req.url.replace(/(http:\/\/)?localhost:[0-9]+/, '')
                    if (url.indexOf(`/develop-blog/`) === 0) {
                        return req.next();
                    }
                },
                changeOrigin: true
            }
        }
    },
}