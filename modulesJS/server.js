var http = require('http');

// var upBdd = require('./updateBdd.js');



var server = http.createServer(function (req, res) {
    if (req.url.substr(0,18) == '/tpphp3/index.html') { //check the URL of the current request
        
        const app = require("./updateBdd.js");
        
        app.funcAppRecupInfos(req.url.substr(req.url.indexOf('=') + 1));
            

        // set response header
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        // set response content
        res.write(`<html>
                        <style>
                            p {color: black;
                                display: flex;
                                justify-content: center;
                                font-size: 10rem;
                            animation-name: inite;
                            animation-duration: 3s;
                            animation-iteration-count: infinite;
                            }
                            @keyframes inite {
                                0% {color: red;}
                                25% {color: yellow;}
                                50% {color: blue;}
                                100% {color: green;}
                                }
                            
                        </style>
                    <body>
                    <p id="init">Initialization</p> 
                        <script type="text/javascript">
                            var timeOut = setTimeout(function () {
                            document.location.href = "http://localhost:60002/tpphp3/index.html";
                            }, 5000);
                        </script> 
                    </body> 
                    </html>`);
        res.end();


    } else if (req.url == "/os") {
        console.log('je suis la');
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(IOF());
        res.end();

    } else if (req.url == "/os2") {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        console.log(chalk.red(IOF()));
        res.end();

    }

});
server.listen(60003); //6 - listen for any incoming requests
console.log('Node.js web server at port 60003 is running..');
