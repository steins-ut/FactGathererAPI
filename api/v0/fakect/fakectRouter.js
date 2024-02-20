const express = require('express');
const database = require('../../../database/database');

const router = express.Router();

let tableName = "Fakects";

router.get("/", (req, res) =>
{
    let queryParams = {};
    if(req.query.id) 
    {   
        queryParams.ids = req.query.id.split(",");
    }
    res.json(database.getFacts(queryParams, tableName));

});

router.get("/all", (req, res) => {

    res.json(database.getFacts({}, tableName));

})

router.get("/random", (req, res) =>
{
    let randomCount = req.query.count || 1;
    let factCount = database.getFactCount(tableName);

    console.log(factCount);
    console.log(randomCount);

    if(randomCount < factCount)
    {
        let randomIds = [];
        for(let i = 0; i < randomCount; i++)
        {
            let rand = Math.floor(Math.random() * (factCount - 1) + 1);
            while(randomIds.includes(rand))
            {
                rand = Math.floor(Math.random() * (factCount - 1) + 1);
            }
            randomIds.push(rand);
        }
        res.json(database.getFacts({ ids: randomIds }, tableName));
    }
    else
    {
        res.json(database.getFacts({}, tableName));
    }
    
});

module.exports = router;