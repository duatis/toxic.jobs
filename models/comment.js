/**
 * Created by duatis on 15/07/16.
 * @summary model for comment entity.
 * @see BaseModel
 */
var BaseModel = require('./base_model.js');
class Comment extends BaseModel
{
    constructor()
    {
        var schema =
        {
            _company: { type: BaseModel.Schema.Types.ObjectId, ref: 'Company' },
            _account: { type: BaseModel.Schema.Types.ObjectId, ref: 'Account' },    
            text: String
        };
        super(schema);
        return this.model;
    }
}

module.exports = new Comment();