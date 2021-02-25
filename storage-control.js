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
    const keyTotal = localStorage.length;
    const keyData = (Object.entries(localStorage))

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
    * @param {String} table
    * @param {Object} model
    */
    OS.add = function(table, model) {
        /**
         * @todo 
         *  -We should check client stockage access. (Default 5mo)
         */
        if (typeof model != "object"){
            console.error('SC error: Sorry but this ('+model+') is not a object..')
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
            console.error('OS Error: Table is not valid or undefined')
        } else {
            return JSON.parse(getTable);
        }
    }

    /**
     * @param {String} table 
     * @param {String} property
     * @param {String, Number, Boolean} value 
     */
    OS.update = function(table, property, value) {
        let getTable = localStorage.getItem(table); 
        if (getTable == null) {
            console.error('OS Error: Table is not valid or undefined')
        } else {
            getTable = getTable ? JSON.parse(getTable) : {};
            getTable[property] = value;
            localStorage.setItem(table, JSON.stringify(getTable));
        }
    }

    /**
     * @param {String} table
     * @param {String} property
     */
    OS.select = function (table, property) {
        let getTable = localStorage.getItem(table);
        if (getTable == null) {
            console.error('OS Error: Table is not valid or undefined')
        } else {
            getTable = getTable ? JSON.parse(getTable) : {};
            return getTable[property];
        }
    }

    /** 
     * @param {String} table 
    */
    OS.delete = function(table) {
        let getTable = localStorage.getItem(table);
        getTable == null ? console.error('OS Error: Table is not valid or undefined') : localStorage.removeItem(table);
    }

    OS.infos = function() {
        console.group('Object Storage Infos');
        console.log(`Object Storage - 0.1v`);
        console.log(`Size Usage: `+ localStorageSpace())
        console.log(`Table Count: `+ keyTotal);
        console.log(`Table View -> `)
        console.log(keyData)
        console.log('Author: Dany Demart | https://github.com/FoobarIT/storage-control')
        console.groupEnd()
    }

    return OS
}))
