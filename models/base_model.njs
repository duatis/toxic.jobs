/**
 * Created by duatis on 14/07/16.
 */

class BaseModel{
    constructor( schema )
    {
        this.db = require('../library/database.njs');
        var _schema = new this.db.Schema(schema);
        this.model = this.db.model( this.constructor.name, _schema );
    }
}

module.exports = BaseModel;