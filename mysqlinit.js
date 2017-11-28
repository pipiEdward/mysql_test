'use strict';
let mysql = require('mysql');
const conf = require('./_conf.json');	//配置文件

const db_test = conf.dbname.mysqltest;
const testUser = mysql.escapeId(db_test + '.user');

//建立数据库连接
let connection = mysql.createConnection(conf.database);


connect();
//createDb();
//selectDb();
//deleteDb();
//createTable();
//deleteTable();
//insertOneToTable();
//insertSomeToTable();
//queryFromTable();
//updateData();
//deleteData()
//cleanData();
//connectEnd();

//创建库
function createDb() {
    let createDb = `create database if not exists ${db_test}
    default charset utf8 COLLATE utf8_general_ci;`;
    connection.query(createDb, (err, results, fields) => {
        if (err) return console.error(err.message);
        //console.log('create database success');
    });
}

//选择数据库
function selectDb() {
    let sql = `use ${db_test}`;
    connection.query(sql, (err, ...v) => {
        if (err) return console.error(err.message);
        console.log(`选择db：${db_test}`);
    });
}

//删除数据库
function deleteDb() {
    let sql = `drop database if exists ${db_test}`
    connection.query(sql, (err, ...v) => {
        if (err) return console.error(err.message);
        console.log(`删除db：${db_test}`);
    });
}

//监听是否连接上和连接的错误
function connect() {
    connection.connect(err => {
        if (err) return console.error(err.message);
        console.log('connect success');
    });
}

//结束连接
function connectEnd() {
    connection.end(err => {
        if (err) return console.error(err.message);
        console.log('connect end');
    });
}

//创建表
function createTable() {
    const createUser = `create table if not exists ${testUser}(
        id int primary key auto_increment,
        username varchar(255)not null,
        password varchar(255) not null)`;
    console.log(testUser);
    connection.query(createUser, (err, results, fields) => {
        if (err) return console.error(err.message);
        //console.log('create table success');
    });
}


//删除表
function deleteTable() {
    const deleteUser = `drop table if exists ${testUser} `;
    connection.query(deleteUser, (err, results, fields) => {
        if (err) return console.error(err.message);
        console.log('delete table success');
    });
}


//插入一行数据
function insertOneToTable() {
    let sql = `insert into ${testUser}(username,password)values(?,?)`;
    let data = ['pipi', '15966'];
    connection.query(sql, data, (err, results, fields) => {
        if (err) return console.error(err.message);
        console.log('插入到第' + results.insertId + '行');
    });
}

//插入若干条数据
function insertSomeToTable() {
    let sql = `insert into ${testUser}(username,password)values ?`;
    let data = [
        ['pipi1', '111111'],
        ['pipi2', '1212212'],
        ['pipi3', '7767767'],
    ]
    connection.query(sql, [data], (err, results, fields) => {
        if (err) return console.error(err.message);
        console.log(`从第${results.insertId}开始插入，插入了${results.affectedRows} 行`);
    });
}

//查询数据
function queryFromTable() {
    let sql = `select *from ${testUser} where username = ? and id < ?`;
    let data = ['pipi1', 5];
    connection.query(sql, data, (err, results, fields) => {
        if (err) return console.error(err.message);
        console.log(results);//返回一个数组
    });
}

//更新数据
function updateData() {
    let sql = `update ${testUser} set username = ? where id <= ?`;
    let data = ['fanfan', 3];
    connection.query(sql, data, (err, results, fields) => {
        if (err) return console.error(err.message);
        console.log(`操作了${results.affectedRows},发生改变的行数为${results.changedRows}`);
    });
}

//删除数据
function deleteData() {
    let sql = `delete from ${testUser} where id = ?`;
    let data = [5];
    connection.query(sql, data, (err, results, fields) => {
        if (err) return console.error(err.message);
        console.log(`删除了${results.affectedRows}条数据`);
    });
}
//清空数据
function cleanData() {
    let sql = `delete from ${testUser}`;
    connection.query(sql, (err, results, fields) => {
        if (err) return console.error(err.message);
        console.log(`删除了${results.affectedRows}条数据`);
    });
}
