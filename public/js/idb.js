// Create a connection to the database
let db;
const request = indexedDB.open('budget_tracker', 1);

// Executed if database version changes
request.onupgradeneeded = function(event){
    const db = event.target.result;
    db.createObjectStore('new_transaction', {autoIncrement: true});
};

// Executed if connection to the database is successful
request.onsuccess.onsuccess = function(event){
    db = event.target.result;
    if(navigator.onLine){
        uploadTransaction();
    }
};

// Executed if connection to the database fails
request.onerror = function(event){
    console.log(event.target.errorCode);
};

// Executed if a new transaction is submitted or if there is no connection
function saveRecord(record){
    // Open new transaction with read/write permissions
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    // Access the object store
    const budgetObjectStore = transaction.objectStore('new_transaction');
    // Add the record to the object store
    budgetObjectStroe.add(record);
};

function uploadTransaction(){
    const transaction = db.transaction(['new_transaction'], 'readwrite');
}