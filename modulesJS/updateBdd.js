        var iduser = 0;
        var lName = "";
        var fName = "";
        var mail = "";
        var pwd = "";
        var tok = "";


        function appRecupInfos(maj) {

            // console.log("obj1 :" + maj.indexOf(',') + 1);
            const id = maj.substr(0, maj.indexOf(','));
            const token = maj.substr(maj.indexOf(',') + 1);


            var sql = 'SELECT * FROM `users` WHERE `idusers` = ' + parseInt(id, 10);

            const bdd = require('./connectMySql.js');

            var useBdd = bdd.resConnect();

            // var sql = (req == 1) ? cSql1 : cSql2;


            useBdd.getConnection(function (err, connection) {
                if (err) throw console.log("erreur getConnection : " + err); // not connected!

                // Use the connection
                connection.query(sql, function (error, results, fields) {
                    // When done with the connection, release it.
                    // je fais une boucle par defaut meme si je sais qu'il n'ya qu'1 seul enreg pour cette requete
                    for (let idx = 0; idx < results.length; idx++) {
                        iduser = results[idx].idusers;
                        lName = results[idx].lastNameUsers;
                        fName = results[idx].nameUsers;
                        mail = results[idx].mailUsers;
                        pwd = results[idx].passUsers;
                        tok = token;
                    };


                    // etape 2 de getConnection
                    connection.release();
                    // etape 3 de getConnection
                    // Handle error after the release.
                    if (error) throw console.log("erreur release : " + error);

                    // Don't use the connection here, it has been returned to the pool.
                    // etape 4 de getConnection, liberation de la connection
                    connection.destroy();

                    appMaj(iduser, lName, fName, mail, pwd, tok);
                });

                // etape 1 de getConnection

            });



        }

        // mise a jour de la BDD
        function appMaj(id, lName, fName, mail, pwd, tok) {

            const bdd = require('./connectMySql.js');

            var useBdd = bdd.resConnect();


            var sql = "UPDATE `users`" +
                " SET `lastNameUsers` = '" + lName + "'," +
                " `nameUsers` = '" + fName + "'," +
                " `mailUsers` = '" + mail + "'," +
                " `passUsers` = '" + pwd + "'," +
                " `tokenUsers` = '" + tok + "' " +
                " WHERE `idusers` = " + id;




            useBdd.getConnection(function (err, connection) {
                if (err) throw console.log("erreur getConnection : " + err); // not connected!

                // Use the connection
                connection.query(sql, function (error, results, fields) {
                    // When done with the connection, release it.

                    // etape 2 de getConnection
                    connection.release();
                    // etape 3 de getConnection
                    // Handle error after the release.
                    if (error) throw console.log("erreur release : " + error);

                    // Don't use the connection here, it has been returned to the pool.
                    // etape 4 de getConnection, liberation de la connection
                    connection.destroy();
                });

                // etape 1 de getConnection

            });
        }

        module.exports = {
            funcAppRecupInfos: appRecupInfos,
            funcAppConnect: appMaj
        }