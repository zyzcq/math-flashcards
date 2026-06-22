# 第三方统计配置

这个项目现在可以在 GitHub Pages 这类静态托管上接第三方统计，不需要启动 `server.js`。

配置文件是 `js/analytics-config.js`。

## Cloudflare Web Analytics

1. 到 Cloudflare Web Analytics 添加网站。
2. 复制官方代码里的 `token`。
3. 修改：

```js
provider: 'cloudflare',
dashboardUrl: 'https://dash.cloudflare.com/',
cloudflare: {
    token: '你的 token'
}
```

## 百度统计

1. 到百度统计添加网站。
2. 复制 `hm.js?` 后面的站点 ID。
3. 修改：

```js
provider: 'baidu',
dashboardUrl: 'https://tongji.baidu.com/',
baidu: {
    siteId: '你的站点 ID'
}
```

## Google Analytics

1. 创建 GA4 媒体资源。
2. 复制 Measurement ID，例如 `G-XXXXXXXXXX`。
3. 修改：

```js
provider: 'google',
dashboardUrl: 'https://analytics.google.com/',
google: {
    measurementId: 'G-XXXXXXXXXX'
}
```

`admin.html` 在没有 Node 后端时会显示第三方统计后台入口；实际数据需要到所选统计平台的后台查看。
