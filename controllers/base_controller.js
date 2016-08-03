/**
 * Created by duatis on 16/07/16.
 * Base controller.
 * Controllers for models should inherit from this class to have access to generic controller methods.
 */
var model = Symbol(); //to crate private index
class BaseController
{
    /**
     * Imports model module corresponding the the entity managed by de controller
     */
    constructor()
    {
        var modelName  = this.constructor.name.replace("Controller","");
        this[model] = require("../models/"+modelName);
    }

    /**
     * Get all documents from collection
     * @param {function(err,data)}  fn callback function (err,data)
     * @returns {Promise}
     */
    all(fn)
    {
       return this[model].find().exec(fn);
    }

    /**
     * Find documents of the collection
     * @param query mongo formatted
     * @param fn {function(err,data)} callback
     * @returns {Promise}
     */
    find(query, fn)
    {
        if(fn == undefined) return this[model].find(query);
        return this[model].find(query).exec(fn);
    }

    /**
     * Find single document of the collection based on query passed.
     * @param query mongo formatted query object
     * @param fn {function(err,data)}  callback
     * @returns {Promise}
     */
    findOne(query, fn)
    {
        return this[model].findOne(query).exec(fn);
    }

    /**
     * Save a document to de collection.
     * @param entity {model} data to be saved
     * @param fn callck
     * @returns {Promise}
     */
    save(entity, fn)
    {
        return entity.save(fn);
    }

    /**
     * Gets the number of documents that a query would return
     * @param query mongo formatted query object
     * @param fn {function(err,data)}  callback function
     * @returns {Promise}
     */
    count(query, fn)
    {
        return this[model].find(query).count().exec(fn);
    }

    /**
     * Creates a new document to the collection
     * @param data values for the new document
     * @param fn {function(err,data)} callback function
     */
    create(data, fn)
    {
        new (this[model](data)).save(fn);
    }

    /**
     * Removes documents from collection filtered by the query
     * @param query mongo like query object
     * @param fn {function(err,data)} callback
     */
    remove(query, fn)
    {
        this[model].remove(query,fn);
    }

    modify(query, data, fn )
    {
        this[model].update(query, data, {multi:true}, fn);
    }

    modifyOne(query, data, fn )
    {
        this[model].update(query, data, {multi:false}, fn);
    }

    get controllerModel() {
        return this[model];
    }
}

module.exports = BaseController;