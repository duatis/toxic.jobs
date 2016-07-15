/**
 * Created by duatis on 14/07/16.
 */
var db = require('../library/database.njs');
class BaseModel
{
    /**
     *
     * @param schema structure for the mongo document based on mongoose
     */
    constructor( schema )
    {
        var _schema = new db.Schema(schema);                       //Create schema
        this.model = db.model( this.constructor.name, _schema );   //Create model
    }

    static get Schema()
    {
        return db.Schema;
    }
}

module.exports = BaseModel;