const path = require('path');

module.exports = (env, agrv) => {
    const isDev = agrv.mode === 'development';

    return {
        //nơi chứa một hay nhiều các file đầu vào.
        //Ở đây mình dùng fileindex.js. Vì ở trong file này mình import mọi file khác vào mà 🙂
        entry: './src/index.js',
        module: {
            // Nhận vào một array. Đây là nơi chứa các loader
            rules: [
                {
                    // Nhận vào một Regex để xác định kiểu file
                    test: /\.(js|jsx)$/,
                    //  Nhận vào một regex để loader loại trừ ra những file này
                    exclude: /(node_modules|bower_components)/,
                    // Nhận vào một object hoặc một array chứa thông tin loader
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(s[ac]ss|css)$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: { sourceMap: isDev ? true : false }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: isDev ? true : false }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        //  Nơi chứa thứ tự ưu tiên khi import các file.
        resolve: { extensions: ['.js', '.jsx'] },
        output: {
            // Nhận vào một string là đường dẫn tuyệt đối đến thư mục sau khi build
            path: path.resolve('dist'),
            // Chứa đường dẫn tương đối mà từ file index.html trỏ đến các file trong thư mục dist sau khi build
            publicPath: '../dist/',
            filename: 'bundle.js',
            environment: {
                arrowFunction: false, // Hỗ trợ arrow function.
                bigIntLiteral: false, // Hỗ trợ BigInt
                const: false, // Hỗ trợ khai báo const và let
                destructuring: false, // Hỗ trợ destructuring
                dynamicImport: false, // Hỗ trợ async import
                forOf: false, // Hỗ trợ vòng lặp forOf cho các array
                module: false // Hỗ trợ moudle ES6 (import … from ‘…’)
            }
        },
        devtool: isDev ? 'source-map' : false,
        devServer: {
            contentBase: 'public',// Chứa đường dẫn tương đối đến file index.html
            port: 3000,
            hot: true,
            // Chứa đường dẫn tương đối từ thư mục root trỏ đến thư mục build (ở đây là dist). 
            //Chú ý phải thêm / ở trước và sau
            publicPath: '/dist/',
            watchContentBase: true// Nếu bạn có thay đổi gì trong file index.html thì trình duyệt cũng tự động reload.
        }
    }
}
