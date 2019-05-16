const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const HtmlWebpackPluginConfig={
    title: 'hello,零和壹在线课堂', // html5文件中<title>部分
    filename: 'front.html', // 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样
    // 也是 context+template是最后模板的完整路径，./不能少
    template: './template/daqi.html', // 如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
    inject:'body', // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
}


module.exports = {
    // 上下文是查找入口文件的基本目录，是一个绝对值，所以要用到path.resolve
    // 如果不设，默认为当前目录
    // 与命令行中的 webpack --context是一样的
    // 最后入口文件是 context+entry,
    // 可以写成./today/wang[前加./],./today/wang/[后加/]，不能写成/today/wang，如果../表示在当前目录再往上一层
    // context 除了这里的入口文件用到，象很多loader,plugin都会要用到这个值
    context: path.resolve(__dirname,'../src'), //D:\03www2018\study\webpack2017\build\src
    // entry可以为字符串|对象|数组三种形式
    // 字符串，适合spa,也就是单页网页，如手机网页
    // 下面这个entry最终的位置是 项目根目录/today/wang/app/entry.js
    // 前面./不能少，后面的.js可以省略，也可以写
    // 以下演示三种entry，实际中取一种就行
    // entry: "./app/entry", // string | object | array
    // entry: ["./home.js","./about.js","./contact.js"],
    // entry: {
    //   home: "./home.js",
    //   about: "./about.js",
    //   contact: "./contact.js"
    // }, 
    entry: './redux-demo/app.js', //main.js中的js可以省略，前面的./不能省
    output:{
        //最后生成的打包文件所在的目录，是一个绝对值，，如果不指定，表示当前目录。如果文件夹不存在，会自动创建
        //这个路径除了这里会用到之外，象html插件,file-loader加载器也会用到
        // 最后生成的打包文件是 path+ filename
        path:path.resolve(__dirname,'../dist'),
        //filename中可以使用[name],[id],[hash],[chunkhash][query]五种变量
        // filename中可以含子文件夹，如如filename: "a/b/c/[id]app.js"
        // filename: 'wang.js', // 如果entry是个对象且有多个chunkname，那么这里会报错，但会生成一个wang.js,它的内容是第一个chunk的，建议entry是多个chunk的对象时，不要写固定名字，要带[name]变量
        // filename: '[name]wang.js', // 此处的[name]与entry中的chunk名字对应，象上面entry是字符串和数组时，最后输出的文件名是mainwang.js，entry是对象，最后输出的文件名是 homewang.js,aboutwang.js,ccontact123wang.js
        // filename: '[id]wang.js', //id从0,1这么增长的，象上面会生成0wang.js,1wang.js,2wang.js三个文件
        // filename: "[name].[hash].bundle.js" //会打包成about.bab6d0fe556449a9229e.bundle,contact123.bab6d0fe556449a9229e.bundle,home.bab6d0fe556449a9229e.bundle，尤其要记住的是[hash]不要单独用，要与[name]或[id]配合用
        // filename: "[chunkhash].yes.js", //78f16d7b19ff7ec1fd3a.yes.js,e12898a66041f68c1959.yes.js,f590b1f2de7b72dea5b3.yes.js，20位hash值
        // hashDigestLength: 8  //指定最后chunkhash和hash变量生成字符串的长度，默认是20个字符
        filename: './[hash]app.js',
        hashDigestLength: 8
        //与hash有关的几个配置分别是hashDigest,hashDigestLength,hashFunction,hashSalt知道就行，
    },
    module: {        
        rules: [
                // {
                //     test: /\.vue$/,
                //     loader: 'vue-loader',
                //     options: vueLoaderConfig
                // }, 
                 {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    include: [resolve('src'), resolve('test')],
                    use: {
                        loader: 'babel-loader',
                        options: {
                          presets: ['env','react']
                        }
                    }
                  },
                //   {
                //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                //     loader: 'url-loader',
                //     options: {
                //       limit: 10000,
                //       name: utils.assetsPath('img/[name].[hash:7].[ext]')
                //     }
                //   },
                //   {
                //     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                //     loader: 'url-loader',
                //     options: {
                //       limit: 10000,
                //       name: utils.assetsPath('media/[name].[hash:7].[ext]')
                //     }
                //   },
                //   {
                //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                //     loader: 'url-loader',
                //     options: {
                //       limit: 10000,
                //       name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                //     }
                //   },    
                {
                    test: /\.html$/, 
                    use: {
                        loader: 'html-loader',
                        options: {
                        attrs: [':data-src']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                  },
                  {
                    test: /\.less$/,
                    use: [{
                            loader: "style-loader" // creates style nodes from JS strings
                          }, {
                            loader: "css-loader" // translates CSS into CommonJS
                          }, {
                            loader: "less-loader" // compiles Less to CSS
                          }]
                  },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                    {
                        loader: 'file-loader',
                        options: {
                            //name: '[path][name].[ext]',
                            name: '[name]2.[ext]', //最后生成的文件名是 output.path+ outputPaht+ name，[name],[ext],[path]表示原来的文件名字，扩展名，路径
                            //useRelativePath:true,
                            outputPath: 'img/' // 后面的/不能少
                        }  
                    }
                    ]
                },
                {test: /\.svg/, loader: 'svg-url-loader'}

            ]
      },
    resolve: {
        extensions: ['.js', '.vue', '.json'], //扩展名为.js,.vue,.json的可以忽略，如 import App from './app'，先在当前目录中找app.js，没有再找app.vue，没找到，再找.json，如果还没找到，报错
        alias: {
          'vue$': 'vue/dist/vue.esm.js', // 别名，这是一个正则的写法，表示以vue结尾的，如import Vue from 'vue' 表示 import Vue from 'vue/dist/vue.esm.js'
          '@': path.resolve('src'),// 这也是为懒人服务的,import HelloWorld from '@/components/HelloWorld'这里的@其实就是代表src这个目录 
          '#': path.resolve('src/ui/components')// import Table from '#/table'
        }
      },
      
    plugins: [
        new HtmlWebpackPlugin(HtmlWebpackPluginConfig), // 生成首页html5文件，外部插件需要安装
        new webpack.DefinePlugin({BJ: JSON.stringify('北京'),}) // 内置插件，无须安装，可以理解为它是webpack实例的一个方法，该插件相当于apache等web服务器上定义一个常量
    ], 
    devServer: {
      contentBase: path.resolve(__dirname, "../dist"), //网站的根目录为 根目录/dist，这个路径一般与output.path一致，因为html插件生成的html5页是放在output.path这个目录下
      port: 9000, //端口改为9000
      host: '127.0.0.1', //如果指定的host，这样同局域网的电脑或手机可以访问该网站,host的值在dos下使用ipconfig获取 
      open:true, // 自动打开浏览器，每次启动服务器会自动打开默认的浏览器
      index:'front.html', // 与HtmlWebpackPlugin中配置filename一样
      inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
      hot:false,
      compress:true //压缩
    },
    // watch:true, // 会监视被导入的文件是否有改动，如果有改动，自动打包，但配置文件的改动不会被监视
}