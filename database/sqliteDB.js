const sqlite = require('better-sqlite3');
const path = require('path');

module.exports = function()
{

    if(global.database) { return global.database; }

    let database = new sqlite(path.join(process.cwd(), "data/facts.db"), { verbose: console.log });
    
    function getFacts(queryParams, tableName) 
    {
        let query = [];
        let queryBinds = [];
        if(queryParams)
        {
            if(queryParams.ids) 
            {
                let filter = `(${"?,".repeat(queryParams.ids.length)}`;
                filter = filter.substring(0, filter.length - 1) + ')';

                query.push(`SELECT * FROM ${tableName} WHERE Id IN ${filter}`);
                queryBinds.push(queryParams.ids);
            }
            /*if(queryParams.range)
            {
                queryParams.id.range.count = queryParams.id.range.count || 1;
                queryParams.id.range.range_index = queryParams.id.range.range_index || 1;

                query.push(`SELECT * FROM ${tableName} LIMIT ${queryParams.id.range.count} OFFSET ${queryParams.id.range.offset}`);
            }*/
        }

        if(query.length != 0) 
        {
            if(query.length >= 2)
            {
                for(let i = query.length - 2; i >= 0; i -= 2)
                {
                    query.splice(i, 0, "UNION");
                }
            }
            console.log(query.join(" "));
            try {
                return database.prepare(query.join(" ")).all(...queryBinds); 
            }
            catch(ex) {
                return "there was an oopsie :(";
            }
        }
        else
        {
            try {
                return database.prepare(`SELECT * FROM ${tableName}`).all(); 
            }
            catch(ex) {
                return "there was an oopsie :(";
            }
        }
    }

    function getFactCount(tableName)
    {
        query = `SELECT COUNT(*) FROM ${tableName}`;
        return database.prepare(query).get()["COUNT(*)"];
    }

    function runCustomQuery(query)
    {
        return database.prepare(query);
    }

    global.database = {
        getFacts,
        getFactCount,
        runCustomQuery
    };

    return global.database;

}();