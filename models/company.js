/**
 * Created by duatis on 12/07/16.
 * @summary model for company entity.
 * @see BaseModel
 */
var BaseModel = require('./base_model');

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
            email:String,
            URID: String, //Id to accress through url
            _account: { type: BaseModel.Schema.Types.ObjectId, ref: 'Account' }
        };
        super(schema);
       return this.model;
    }
}

module.exports = new Company();