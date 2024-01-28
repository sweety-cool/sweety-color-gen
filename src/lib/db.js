import Dexie from "dexie";

const db = new Dexie("colors"); 

db.version(2).stores({
    colors: "++id, name, hex, time"    
});

export default db;