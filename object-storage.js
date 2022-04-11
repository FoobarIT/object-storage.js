/**
 * @author Demart Dany | https://github.com/FoobarIT
 * @version (0.1v) 
 */
(function(root, factory) {

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = factory(root, exports);
        }
    } else if (typeof define === 'function' && define.amd) {
        define(['exports'], function(exports) {
            root.OS = factory(root, exports);
        });
    } else {
        root.OS = factory(root, {});
    }

}(this, function(root, OS) {
    'use strict';

    //Variable performance defined
    const key = {
        total : localStorage.length,
        data: (Object.entries(localStorage))
    }

    // Temp function to check size using.
    let localStorageSpace = function(){
        let allStrings = '';
        for(let key in window.localStorage){
            if(window.localStorage.hasOwnProperty(key)){
                allStrings += window.localStorage[key];
            }
        }
        return allStrings ? 3 + ((allStrings.length*16)/(8*1024)).toFixed(2) + 'KB / 5MB' : 'Empty (0 KB)';
    };



    /** 
    * @param {string} name
    * @param {boolean} logs
    */
    OS.create = (options) => {
        
        if (typeof options.name!= 'string') {
            console.error('[OS ERRROR]: The parameter name should be a string type.')
        } else {
            localStorage.setItem(options.name, JSON.stringify([]) )
            options.logs ? console.info(`[OS INFO]: Database ${options.name} created. Storage Indice: ${localStorageSpace()}`) : ''
        }
    }

    
    /**
     * @param {string} database 
     * @param {string} name 
     */
    OS.addTable = (database, name) => {
        if (typeof database === 'string') {
            let getDatabase = JSON.parse(localStorage.getItem(database))
            console.log(getDatabase, typeof getDatabase)
            if (getDatabase != null) {        
                getDatabase[`${name}`] = []
                console.log('check', JSON.stringify(getDatabase))
                localStorage.setItem(database, JSON.stringify(getDatabase));

                console.info(`[OS INFO]: Table ${name} has been created. Storage Indice: ${localStorageSpace()}`)

            } else {
                console.error(`[OS ERROR]: This database does not exist.`)
            }          
        } 
    }

    /** 
    * @param {String} table
    * @param {Object} model
    */
    OS.add = function(table, model) {
        /**
         * @todo 
         *  -We should check client stockage access. (Default 5mo)
         */
        if (typeof model != "object"){
            console.error('[OS ERROR]: Sorry but this ('+model+') is not a object.')
        } else {
            return localStorage.setItem(table, JSON.stringify(model));
        }
    }

    /**
     * @param {String} table
     */
    OS.get = function(table) {
        let getTable = localStorage.getItem(table); 
        if (getTable == null) {
            console.error('[OS ERROR]: Table is not valid or undefined')
        } else {
            return JSON.parse(getTable);
        }
    }

    /**
     * @param {String} table 
     * @param {String} key 
     * @param {String, Number, Boolean} value 
     */
    OS.update = function(table, key, value) {
        let getTable = localStorage.getItem(table); 
        if (getTable == null) {
            console.error('[OS ERROR]: Table is not valid or undefined')
        } else {
            getTable = getTable ? JSON.parse(getTable) : {};
            getTable[key] = value; 
            localStorage.setItem(table, JSON.stringify(getTable));
        }
    }

    /** 
     * @param {String} table 
    */
    OS.delete = function(table) {
        let getTable = localStorage.getItem(table);
        getTable == null ? console.error('[OS ERROR]: Table is not valid or undefined') : localStorage.removeItem(table);
    }

    OS.infos = function() {
        console.group('Object Storage Infos');
        console.log(`Object Storage - 0.1v`);
        console.log(`Size Usage: `+ localStorageSpace())
        console.log(`Table Count: `+ key.total);
        console.log(`Table View -> `)
        console.log(key.data)
        console.log('Author: Dany Demart | https://github.com/FoobarIT/storage-control')
        console.groupEnd()
    }

    return OS
}))
