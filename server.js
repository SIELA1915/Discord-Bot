var http = require('http');
var port = process.env.port || 8888;

var text = "";
var lines = [];
var args = {};

var server = http.createServer(function (request, response) {
	var title = 'Ryzom API | Test';
	
    var data = "";
	    request.on('data', (chunk) => {
		    console.log("recieved data chunk");
		    var d_str = chunk.toString();
		    data += d_str;
		});
    request.on('end', () => {
	if (request.method == "POST"){
		    if (data.includes("submit=submit")) {
		    var r_p = data.substring(data.lastIndexOf('\r\n') + 1);
		    
		    var P = require("url").parse("/foo?" + r_p, true).query;
			P["post"] = true;
			console.log("_POST = ");
			console.log(P);
			args = P;
		    }
	}
	 else if (request.method == "GET") {
	    var G = require("url").parse(request.url, true).query;
	    G["post"] = false
	    console.log("_GET = ");
	    console.log(G);
	    args = G;
	}
    
    response.statusCode= 200;
    response.setHeader('Content-Type', 'text/html;charset=utf8');
    var cookie = request.headers["cookie"];
    if (cookie == undefined) cookie = "";
    else cookie = cookie.substring(cookie.indexOf("log=")+4);
    if (args["post"]) cookie += args["command"] + '<br>' + ',';
    
    response.setHeader('set-cookie', 'log=' + cookie);
    
    console.log(cookie);
    
	text = cookie.split(',').join('');
    
    var body = '<form method="post" action="/webig_test.php">';
    body += '<label>';
    body += text;
    var li = new Array(15 - cookie.split(',').length);
    li.fill('<br>');
    body += li.join("");
    var pre = "";
    
    body += '<input type="text" name="command" value="' + pre  + '" size="60">';
    body += '</label>';
    body += '<input type="submit" name="submit" value="submit">';
    body += '</form>';
    
    writeRyzom(response, title, body);    
});
});

	    /*response.statusCode = 200;
	response.setHeader('Content-Type', 'text/html;charset=utf8');
    response.write('<!doctype html>\n<html>\n<head>\n');
    response.write('<title>' + title + '</title>\n');
    response.write('<link type="text/css" href="http://api.ryzom.com/data/css/ryzom_ui.css" rel="stylesheet" media="all" />\n </head>\n <style type="text/css">\n html, body { max-width: 800px; margin: 0 auto; } body { background-color: #000010; }\n</style>\n');

    response.write('<body>\n <div class="ryzom-ui ryzom-ui-header">\n <div class="ryzom-ui-tl">\n <div class="ryzom-ui-tr">\n');
    response.write('<div class="ryzom-ui-t">Ryzom API | Test</div>\n');
    response.write('</div>\n </div>\n <div class="ryzom-ui-l">\n <div class="ryzom-ui-r">\n <div class="ryzom-ui-m">\n <div class="ryzom-ui-body">\n');

    response.write('<form method="post" action="/ryzomapi_test.php">\n');
    response.write('<label>\n');
    response.write('<h1>Character API key</h1>\n');
	var textfield_pre = args["apikey"]==undefined?"":args["apikey"];
	response.write('<input type="text" name="apikey" value="' + textfield_pre + '" size="60">\n');
    response.write('</label>\n');
    response.write('<br>\n');
    response.write('<input type="submit" name="submit" value="submit">\n');
    response.write('</form>\n');

    response.write('<hr>\n');
    response.write(text);
    response.write('<br>\n </div>\n </div>\n </div>\n </div>\n');
    response.end('<div class="ryzom-ui-bl">\n <div class="ryzom-ui-br">\n <div class="ryzom-ui-b"></div>\n </div>\n </div>\n <p class="ryzom-ui-notice">powered by <a class="ryzom-ui-notice" href="http://dev.ryzom.com/projects/ryzom-api/wiki">ryzom-api</a></p>\n </div>\n </body>\n </html>\n');
	*/

function writeRyzom(res, title, body) {
    console.log("Writing Window");
    res.write('<!doctype html>\n<html>\n<head>\n');
    res.write('<title>' + title + '</title>\n');
    res.write('<link type="text/css" href="http://api.ryzom.com/data/css/ryzom_ui.css" rel="stylesheet" media="all" />\n </head>\n <style type="text/css">\n html, body { max-width: 800px; margin: 0 auto; } body { background-color: #000010; }\n</style>\n');

    res.write('<body>\n <div class="ryzom-ui ryzom-ui-header">\n <div class="ryzom-ui-tl">\n <div class="ryzom-ui-tr">\n');
    res.write('<div class="ryzom-ui-t">' + title + '</div>\n');
    res.write('</div>\n </div>\n <div class="ryzom-ui-l">\n <div class="ryzom-ui-r">\n <div class="ryzom-ui-m">\n <div class="ryzom-ui-body">\n');

    
    res.write(body);
    /*    res.write('<form method="post" action="/ryzomapi_test.php">\n');
    res.write('<label>\n');
    res.write('<h1>Character API key</h1>\n');
    var textfield_pre = args["apikey"]==undefined?"":args["apikey"];
    res.write('<input type="text" name="apikey" value="' + textfield_pre + '" size="60">\n');
    res.write('</label>\n');
    res.write('<br>\n');
    res.write('<input type="submit" name="submit" value="submit">\n');
    res.write('</form>\n');

    res.write('<hr>\n');
    res.write(text);*/
    res.write('<br>\n </div>\n </div>\n </div>\n </div>\n');


    res.end('<div class="ryzom-ui-bl">\n <div class="ryzom-ui-br">\n <div class="ryzom-ui-b"></div>\n </div>\n </div>\n <p class="ryzom-ui-notice">powered by <a class="ryzom-ui-notice" href="http://dev.ryzom.com/projects/ryzom-api/wiki">ryzom-api</a></p>\n </div>\n </body>\n </html>\n');
}

server.listen(port);

