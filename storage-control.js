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

    /** 
    * @param {table} String 
    * @summary - Is the key name of table creation. 
    * 
    * @param {object} Object
    * @summary - Is the uniq possibility to create data with Storage Control.
    */
    SC.add = function(table, object) {
        
        /**
         * @todo 
         *  -We should check client stockage access. (Default 5mo)
         */

        if (typeof object != "object"){
            console.error('SC error: Sorry but this ('+object+') is not a object..')
        } else {
            return localStorage.setItem(table, JSON.stringify(object));
            
        }
        
    }

    /**
     * @param {table} String
     * @summary - The name of key to localStorage in this we call table.
     */

    SC.get = function(table) {
        let getTable = localStorage.getItem(table); 
        if (getTable == null || getTable == undefined) {
            console.error('SC Error: Table is not valid or undefined')
        } else {
            return JSON.parse(getTable);
        }
    }

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



    return SC
}))
