/**
 * Created by duatis on 12/07/16.
 * @summary model for question entity.
 * @see BaseModel
 */
var BaseModel = require('./base_model');

class Question extends BaseModel
{
    constructor()
    {
        var schema =
        {
            text:String
        };
        super(schema);
        return this.model;
    }
}

module.exports = new Question();