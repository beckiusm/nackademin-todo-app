const db = require("../app").db;

module.exports = {
    getItems: () => {
        return new Promise( async (resolve, reject) => {
            try {
                const doc = await db.find({});
                resolve (doc);
            } catch (error) {
                reject (error);
            }
        })
    },

    createItem: (title, done) => {
        return new Promise( async (resolve, reject) => {
            try {
                const doc = await db.insert({title: title, done: done});
                resolve (doc);
            } catch (error) {
                reject (error);
            }
        })
    },

    updateItem: (id, title, done) => {
        return new Promise( async (resolve, reject) => {
            try {
                const doc = await db.update({_id: id}, {title: title, done: done});
                resolve (doc);
            } catch (error) {
                reject (error);
            }
        })
    },

    deleteItem: (id) => {
        return new Promise( async (resolve, reject) => {
            try {
                const doc = await db.remove({_id: id});
                resolve (doc);
            } catch (error) {
                reject (error);
            }
        })
    }
}