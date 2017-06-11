`use strict`
import {sqlPara} from '~/configure.js';
const mysql = require('promise-mysql');
// const Promise = require('bluebird');
/*
	An MySqlModels base abstract class
	Shall not be instantiate

*/

class MySqlModel{
	constructor(){
		this.sqlPara = sqlPara;
	}

	query(sql,callback){
		let connection;
		mysql.createConnection(this.sqlPara).then(function(con){
			connection = con;
		    return connection.query(sql);
		}).then(function(res){
			callback(true);
			connection.end();
		}).catch(function(err){
			console.error(err);
			callback(false);
		});
	}
	insert(table, fields, values,callback){
		if (fields.length != values.length)
			return -1;
		let n = fields.length;
		let sql = "INSERT INTO `" + table + "` (";
		sql += "`" + fields[0] + "`";
		for (let i=1;i<n;i++)
			sql += ", `" + fields[i] + "`";
		sql += ') VALUES( "' + values[0] + '"';
		for (let i=1;i<n;i++)
			sql += ', "' + values[i].toString() + '"';
		sql += ');';
		console.log(sql);
		this.query(sql,callback);
	}


}

export default MySqlModel;