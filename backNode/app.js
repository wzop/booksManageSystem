const express = require('express');
const app = express();

// cors模块
const cors = require('cors');
const path = require('path');
// 获取post请求中的参数
const expressJWT = require('express-jwt');
// history模式插件
const history = require('connect-history-api-fallback');
// 导入全部路由模块
const login = require('./routes/login');
const studentInfo = require('./routes/studentinfo');
const studentLend = require('./routes/studentLend');
const bookSearch = require('./routes/bookSearch');
const studentChangePassword = require('./routes/studentChangePassword');
const bookRenew = require('./routes/bookRenew');
const bookReturn = require('./routes/bookReturn');
const getStudentInfo = require('./routes/getStudentInfo');
const lendBooks = require('./routes/lendBooks');
const allBooksInfo = require('./routes/allBooksInfo');
const deleteBook = require('./routes/deleteBook');
const addStudent = require('./routes/addStudent');
const deleteStudent = require('./routes/deleteStudent');
const adminChangePassword = require('./routes/adminChangePassword');
const checkToken = require('./routes/checkToken');
const addBooks = require('./routes/addBooks');

// token秘钥
const secretkey = 'bookmanage';
app.use(history());

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());
/*
    设置静态资源目录
    app.use(express.static('dist'));
    app.use(express.static('bookpic'));
*/
app.use(expressJWT({ secret: secretkey, algorithms: ['HS256'] }).unless({ path: [/^\/login/, /^\/book\/picimg/] }))

// token错误处理中间件
app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') {
        res.send({
            status: 401,
            msg: 'token已过期'
        })
    } else {
        res.send({
            status: 500,
            msg: '未知错误',
        })
    }
})
// 注册路由中间件
app.use('/login', login);
app.use(bookSearch);
app.use('/student', [studentInfo, studentLend, studentChangePassword, lendBooks]);
app.use('/books', [bookRenew, bookReturn]);
app.use('/admin', [getStudentInfo, lendBooks, allBooksInfo, deleteBook, addStudent, deleteStudent, adminChangePassword, checkToken, addBooks]);
// 响应图片
app.get('/book/picimg/:picname', (req, res) => {
    res.sendFile(path.join(__dirname, '/bookpic/' + req.params.picname))
})
app.listen(8000, () => {
    console.log('服务器开启成功：http://127.0.0.1:8000');
})