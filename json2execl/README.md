1、将需要提取的js放到data目录下

2、js开头改成module.exports = { （这样方便一点，不用多导入一个库，因为js默认不支持ES6 的 export default）

3、执行以下命令

进入脚本所在文件夹，如果在就不用执行了
```
cd json2execl
```

安装依赖
```
npm install xlsx
```

执行脚本

```
node json2execl
```
