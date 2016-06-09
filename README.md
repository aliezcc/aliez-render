# aliez-static

aliez静态文件路由

此模块依赖**aliez-match**和**aliez-response**的处理结果

## 用法

```
var aliez = require('aliez'), http = require('http');
var aliez_match = require('aliez-match');
var aliez_static = require('aliez-static');
var aliez_response = require('aliez-response');

var app = aliez(function(req, res){
	// 这里必须使用正则匹配，必须至少有一个子查询
	req.match(/^\/css\/(.*)/, function(req, res){
		res.dir('./css');
	});
});

app.use(aliez_match);
app.use(aliez_response);
app.use(aliez_static);

http.createServer(app).listen(8080);
```