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
            root.SC = factory(root, exports);
        });
    } else {
        root.SC = factory(root, {});
    }

}(this, function(root, SC) {
    'use strict';

    //Variable performance defined
    let keyTotal = localStorage.length;
    let keyData = (Object.entries(localStorage))

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
    SC.add = function(table, model) {
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
    SC.get = function(table) {
        let getTable = localStorage.getItem(table); 
        if (getTable == null || getTable == undefined) {
            console.error('SC Error: Table is not valid or undefined')
        } else {
            return JSON.parse(getTable);
        }
    }

    /**
     * @param {String} table 
     * @param {String} key 
     * @param {String, Number, Boolean} value 
     */
    SC.update = function(table, key, value) {
        let getTable = localStorage.getItem(table); 
        if (getTable == null || getTable == undefined) {
            console.error('SC Error: Table is not valid or undefined')
        } else {
            getTable = getTable ? JSON.parse(getTable) : {};
            getTable[key] = value; 
            localStorage.setItem(table, JSON.stringify(getTable));
        }
    }

    /** 
     * @param {String} table 
    */
    SC.delete = function(table) {
        let getTable = localStorage.getItem(table);
        getTable == null || getTable == undefined ? console.error('SC Error: Table is not valid or undefined') : localStorage.removeItem(table);
    }

    SC.infos = function() {
        console.group('Storage Control Infos');
        console.log(`Storage Control - 0.1v`);
        console.log(`Size Usage: `+ localStorageSpace())
        console.log(`Table Count: `+ keyTotal);
        console.log(`Table View -> `)
        console.log(keyData)
        console.log('Author: Dany Demart | https://github.com/FoobarIT/storage-control')
        console.groupEnd()
    }

    return SC
}))
