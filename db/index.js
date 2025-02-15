require("dotenv").config();
const { Pool } = require('pg');
const weeks = require("./weeks/weeks.json");

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }) //credentials from Heroku

/**
     * Returns Week Object for given Timestamp (UTC)
     * @author   (Mgram) Marcus Ingram
     * @param    {number} timestamp         Unix Timestamp
     * @returns  {Object}                   Object { week: <number>, start: <unix>, end: <unix> }
     */
function getWeek(timestamp) {
    try {
        for(var i=0; i<weeks.length; i++) {
            if (timestamp >= weeks[i].start && timestamp <= weeks[i].end) {
                return weeks[i];
            }
        }
        throw "Timestamp not found in weeks.json"
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    query: async (text, params, callback) => {
        try {
            let res = pool.query(text, params, callback);
            return res;
        } catch {
            return "Failed";
        }
    },

    /**
    * Function adds a Star System to the Database
    * @author   (Mgram) Marcus Ingram
    * @param    {String} name    Name of the Star System
    */
    addSystem: async (name) => {
        try {
            pool.query(`INSERT INTO systems(name,status)VALUES($1,'1')`, [name]);
        } catch (err) {
            console.error(err);
        }
        try {
            let res = await pool.query(`INSERT INTO systems(name,status)VALUES($1,'1')`, [name]);
            return rows[0].system_id; // Return System_id
        } catch {
            return 0; // Return 0 if system is not in the DB
        }
    },

    /**
     * Function adds an Incursion to the Database
     * @author   (Mgram) Marcus Ingram
     * @param    {Int} system_id     Database ID of the Star System
     */
    addIncursions: async (system_id,time) => {
        try {
            pool.query(`INSERT INTO incursions(system_id,time)VALUES($1,$2)`, [system_id, time], (err, res) => { });
        } catch (err) {
            console.error(err);
        }
    },

    /**
     * Add a presence level to Database by name
     * @author   (Mgram) Marcus Ingram
     * @param    {String} name    Name of the Star System
     * @param    {Int} presence   Presence level of the system (1-5) 5 = Massive, 1 = None
     */
    addPresence: async (name, presence) => {
        let time = Math.floor(new Date().getTime()); // Unix time
        let res;
        let id;
        try { res = await pool.query(`SELECT system_id FROM systems WHERE name = $1`, [name]) } catch (err) { console.log(err) }
        if (id == undefined) { id = 0 } else { id = res.rows[0].system_id }
        if (id == 0) {
            try { await pool.query(`INSERT INTO systems(name,status)VALUES($1,'1')`, [name]) } catch (err) { console.log(err) }
            try { res = await pool.query(`SELECT system_id FROM systems WHERE name = $1`, [name]) } catch (err) { console.log(err) }
            id = res.rows[0].system_id;
        }
        try { await pool.query(`INSERT INTO presence(system_id,presence_lvl,time)VALUES($1,$2,$3)`, [id, presence, time]) } catch (err) { console.log(err) }
    },
  
    /**
     * Set the current incursion status of a system by name
     * @author   (Mgram) Marcus Ingram
     * @param    {String} name    Name of the Star System
     * @param    {Int} status     (1 = active, 0 = inactive)
     */
    setStatus: async (name,status) => {
        try {
            pool.query(`UPDATE systems SET status = $1 WHERE name = $2;`, [status, name], (err, res) => {});
        } catch (err) {
            console.error(err);
        }
    },
    
    /**
     * Returns the Database ID for the system name requested
     * @author   (Mgram) Marcus Ingram
     * @param    {String} name    Name of the Star System
     * @return   {Int}            Star System Database ID
     */
    getSysID: async (name) => {
        try {
            let res = await pool.query("SELECT system_id FROM systems WHERE name = $1", [name]);
            if (res.rowCount == 0) {
                return 0;
            }
            return res.rows[0].system_id;
        } catch (err) {
            return 0; // Return 0 if system is not in the DB
        }
    },
    
    /**
     * Gets the most recent system presence level for a system id.
     * @author   (Mgram) Marcus Ingram
     * @param    {Int} system_id     Database ID of the Star System
     * @return   {Int}               Returns presence level for Star System
     */
    getPresence: async (system_id) => {
        try {
            let { rows } = await pool.query("SELECT MAX(time) FROM presence WHERE system_id = $1", [system_id]);
            time = rows[0].max;
            let result = await pool.query("SELECT presence_lvl FROM presence WHERE time = $1", [time]);
            return result.rows[0].presence_lvl; // Return Presence
        } catch (err) {
            console.error(err);
        }
    },
  
    /**
     * Returns an object with current incursions and their presence levels (WORK IN PROGRESS)
     * @author   (Mgram) Marcus Ingram
     * @return   {Int}       Returns map object with incursion system name:presence level
     */
    getIncList: async () => {
        try {
            let res = await pool.query("SELECT * FROM systems WHERE status = '1'");
            let list = new Map();
        for (let i = 0; i < res.rowCount; i++) {
            let { rows } = await pool.query("SELECT MAX(time) FROM presence WHERE system_id = $1", [res.rows[i].system_id]);
            time = rows[0].max;
            let result = await pool.query("SELECT presence_lvl FROM presence WHERE time = $1", [time]);
            let presence = result.rows[0].presence_lvl; // Return Presence
            list.set(res.rows[i].name,presence);
        }
        return list;
        } catch (err) {
            console.error(err);
        }
    },
  
    // Fetch a new watchlist from the current incursion systems
    getWatchlist: async (name) => {
        try {
            let list = [];
            const { rows } = await pool.query("SELECT name FROM systems WHERE status = '1'");
        for (let i = 0; i < rows.length; i++) {
            list.push(rows[i].name);
        }
            console.log(`Watchlist: ${list}`);
        return list; // Return System_id
        } catch (err) {
            console.log(err); // Return 0 if system is not in the DB
        }
    },
  
    /**
     * Returns presence as string from lvl 
     * @author   (Mgram) Marcus Ingram
     * @param    {Int} presence_lvl    Input value of presence level          
     * @return   {String}              Returns the presence level as a string
     */
    convertPresence: (presence_lvl) => {
        switch (presence_lvl) {
        case 0:
            return "No data available";
        case 1:
            return "No Thargoid Presence";
        case 2:
            return "Marginal Thargoid Presence";
        case 3:
            return "Moderate Thargoid Presence";
        case 4:
            return "Significant Thargoid Presence";
        case 5:
            return "Massive Thargoid Presence";
        }
    },
    /**
     * Returns Incursions active on input date 
     * @author   (Mgram) Marcus Ingram
     * @param    {String} date          Input date format "YYYY-MM-DDTHH:MM:SS"
     * @return   {Object}               Returns Incursions Objects
     */
    getIncursionsByDate: async (date) => {
        let timestamp = Date.parse(date);
        let week = getWeek(timestamp);
        let incursions = await pool.query(`SELECT * FROM incursions WHERE time < '${week.end}' AND time > '${week.start}'`);
        let system_ids = incursions.rows.map(item => item.system_id).filter((value, index, self) => self.indexOf(value) === index)
        let systems = [];
        for (let i = 0; i < system_ids.length; i++) {
            let sysname = await pool.query(`SELECT name FROM systems WHERE system_id = '${system_ids[i]}'`);
            systems.push(sysname.rows[0].name);
        }
        return systems;
    }
}