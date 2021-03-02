export async function getDB(){
    let dbPromise = await indexedDB.open("Cric");
   
    dbPromise.onupgradeneeded = function() {
        let db = dbPromise.result;
        if (!db.objectStoreNames.contains('matches')) { 
            db.createObjectStore('matches', {keyPath: 'id'}); // create it
        }
    };

    return new Promise(function(resolve,reject){
        dbPromise.onsuccess = async function() {
            console.log("Opened Successfully");
            let db = dbPromise.result;
            resolve(db)
        }
        dbPromise.onerror = function() {
            console.error("DB Error", openRequest.error);
            reject("Failed");
        };
    });
}
export async function addNewMatch(db,match){
    console.log("Adding Match")

    let tx = db.transaction('matches', 'readwrite');
    let matches = tx.objectStore('matches');
    let request = matches.add(match);

    return new Promise(function(resovle,reject){
        request.onsuccess = function() { 
            console.log("New Matchcreated", request.result);
            resovle("success")
        };
        request.onerror = function(){
            console.log("Error while creating a new MAtch")
        }
    }); 

}

export async function updateExistingMatch(db,match){
    console.log("Updating Match")

    let tx = db.transaction('matches', 'readwrite');
    let matches = tx.objectStore('matches');
    let request = matches.put(match);

    return new Promise(function(resovle,reject){
        request.onsuccess = function() { 
            console.log("Updated Existing Match", request.result);
            resovle("success")
        };
        request.onerror = function(){
            console.log("Error while creating a new MAtch")
        }
    }); 

}

export async function getAllMatches(db){

    let tx = db.transaction('matches');
    let matches = tx.objectStore('matches');
    let request = await matches.getAll();
    
    return new Promise(function(resolve,reject) {
        request.onsuccess = function() {
        
        if (request.result !== undefined) {
            console.log(request.result)
            resolve(request.result);       
        }
        else{
            resolve(false)
        }
        };
    });
}
// async function getMatch(matches,id){
//     console.log("Getting MAtch")
//     let request = await matches.get(id)
    
//     return new Promise(function(resolve,reject) {
//         request.onsuccess = function() {
        
//         if (request.result !== undefined) {
//             console.log(request.result)
//             resolve(request.result);       
//         }
//         else{
//             resolve(false)
//         }
//         };
//     });
// }
