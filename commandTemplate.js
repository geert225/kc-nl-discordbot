module.exports = {
    name: 'command naam',
    options: {
        args : [
            "naam van argument",
            "naam van argument 2",
        ],
        neededargs : 0, // aantal benodigde argumenten om commando uittevoeren, Zet waarde op 0 als argument afhandeling wordt gedaan in command file
        roles : [
            '705480865785839617' // id's van rollen die dit commando mogen uitvoeren
        ],
        /*perms : [ // nog niet geintergreed TODO!

        ],*/
        admincmd : true, //mag commando alleen worden uitgevoerd door admins
        privatecmd : false, //is dit commando voor dm's alleen
        avalibleinhelp : true //wordt dit commando weergeven in het help commando

    },
    description: 'beschrijving van commando voor help menu',
    execute(message, args) {
        //command fucties
    }
};