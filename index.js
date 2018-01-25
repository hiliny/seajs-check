/*
* project entry file
*/
const path = require('path');
const fs = require('fs');
const hint = require('jshint').JSHINT;
//保存获取的js文件
let jsFiles = [];

//示例检查当前目录下的所有js文件的语法错误
traverseDirectory(__dirname);
//checkFileJsHint(jsFiles);
var fileArray = syncGetSpecialFiles(__dirname,/\.js$/);
console.log(fileArray);
// 获取文件的内容字符串
function getFileContent(strPath){
	let codeString = '';
	let exists = fs.existsSync(strPath);
	if(exists){
		codeString = fs.readFileSync(strPath,{encoding:'utf-8'});
	}
	return codeString;
}

//遍历(同步)文件夹下所有文件,得到js文件
function traverseDirectory(directoryName){
	let files = fs.readdirSync(directoryName,{encoding:'utf-8'});
	files.forEach(function(filename, index) {
		const fullPath = path.join(directoryName,filename);
		const filedir = fs.statSync(fullPath);
		const isFile = filedir.isFile(),isDirectory = filedir.isDirectory();
		if(isFile && /\.js$/.test(filename)){
			jsFiles[jsFiles.length] = fullPath;
		}
		if(isDirectory){
			traverseDirectory(fullPath);
		}
	});
}

//使用jshint检查js文件的语法
function checkFileJsHint(files){
	let i = 0;
	files.forEach( function(element, index) {
		let codeString = getFileContent(element);
		hint(codeString,{undef:true},{foo:false});
		hint.errors.forEach( function(err, index) {
			console.log((++i)+":"+element +err.reason);
		});
	});
}

//获取指定的文件夹下特殊文件的示例
function syncGetSpecialFiles(directoryName,typeRegexp){
	let specialFiles = [];
	function traverseDirectoryInner(directoryName){
		let files = fs.readdirSync(directoryName,{encoding:'utf-8'});
		files.forEach(function(filename, index) {
			const fullPath = path.join(directoryName,filename);
			const filedir = fs.statSync(fullPath);
			const isFile = filedir.isFile(),isDirectory = filedir.isDirectory();
			if(isFile && typeRegexp.test(filename)){
				specialFiles[specialFiles.length] = fullPath;
			}
			if(isDirectory){
				traverseDirectoryInner(fullPath);
			}
		});
	}
	traverseDirectoryInner(directoryName);
	return specialFiles;
}