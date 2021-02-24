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
        if (getTable == null || getTable == undefined) {
            console.error('SC Error: Table is not valid or undefined')
        } else {
            localStorage.removeItem(table);
        }
    }


    return SC
}))
