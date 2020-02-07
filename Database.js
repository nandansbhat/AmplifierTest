import SQLite from "react-native-sqlite-storage";
import { uuid } from "uuidv4";
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "Reactoffline.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_Size = 200000;
const shoppinlist = [];

export default class Database {
  initDB() {
    let db;
    return new Promise(resolve => {
      console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          console.log("Integrity check passed ...");
          console.log("Opening database ...");
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname
          )
            .then(DB => {
              db = DB;
              console.log("Database OPEN");
              db.executeSql("SELECT 1 FROM ShoppingList LIMIT 1")
                .then(() => {
                  console.log("Database is ready ... executing query ...");
                })
                .catch(error => {
                  console.log("Received error: ", error);
                  console.log("Database not yet ready ... populating data");
                  db.transaction(tx => {
                    tx.executeSql(
                      "CREATE TABLE IF NOT EXISTS ShoppingList (id, itemName)"
                    );
                  })
                    .then(() => {
                      console.log("Table created successfully");
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  closeDatabase(db) {
    if (db) {
      console.log("Closing DB");
      db.close()
        .then(status => {
          console.log("Database CLOSED");
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log("Database was not OPENED");
    }
  }

  getItem() {
    const finalShoppingList = [];
    this.listItem(finalShoppingList);
    return finalShoppingList;
  }

  listItem_a() {
    return new Promise(resolve => {
      const shoppingList = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              "SELECT s.id, s.itemName  FROM ShoppingList s",
              []
            ).then(([tx, results]) => {
              console.log("Query completed");
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                shoppingList.push({ id: row.id, itemName: row.itemName });
                console.log(`Item ID: ${row.id}, Item Name: ${row.itemName}`);
              }
              console.log("The actual list is");
              console.log(shoppingList);
              resolve(shoppingList);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  listItem() {
    return new Promise(resolve => {
      const shoppingList = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              "SELECT s.id, s.itemName  FROM ShoppingList s",
              []
            ).then(([tx, results]) => {
              console.log("Query completed");
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(`Item ID: ${row.id}, Item Name: ${row.itemName}`);
                const { id, itemName } = row;
                shoppingList.push({
                  id,
                  itemName
                });
              }
              console.log(shoppingList);
              resolve(shoppingList);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  itemById(id) {
    console.log(id);
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("SELECT * FROM ShoppingList WHERE id = ?", [id]).then(
              ([tx, results]) => {
                console.log(results);
                if (results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              }
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  addItem(itemName) {
    console.log("................................item name coming soon");
    console.log(itemName);
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("INSERT INTO ShoppingList VALUES (?, ?)", [
              uuid(),
              itemName
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  updateItem(id, item) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("UPDATE ShoppingList SET item = ? WHERE id = ?", [
              item,
              id
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  deleteItem(id) {
    console.log("Now inside deleteItem :" + id)
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("DELETE FROM ShoppingList WHERE id = ?", [id]).then(
              ([tx, results]) => {
                console.log(results);
                resolve(results);
              }
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
