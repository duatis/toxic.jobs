/**
 * Created by duatis on 12/07/16.
 * @summary model for company entity.
 * @see BaseModel
 */
var BaseModel = require('./base_model.njs');

class Company extends BaseModel
{
    constructor()
    {
        var schema =
        {
            name: String,
            address: String,
            city: String,
            province: String,
            zip: Number,
            country: String,
            description: String,
            web: String,
            URID: String //Id to accress throug url
        };
        super(schema);
       return this.model;
    }
}

module.exports = new Company();