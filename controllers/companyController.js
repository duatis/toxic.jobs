/**
 * Created by duatis on 13/07/16.
 */
require('../helpers/string');
var BaseController = require('./base_controller');

class CompanyController extends BaseController
{
    constructor()
    {
        super();
    }

    /**
     * Validates data to be suitable to generate company document
     * @param data
     * @returns {Array}
     */
    validateData(data)
    {
        var errors = [];
        if( data.name == undefined || data.name == null )
            errors.push({code: 1001, message:"Company must provide a name"});
        if(data.description == undefined || data.description.length < 20)
            errors.push({code: 1002, message:"Company must a description of minimum 20 characters"});
        return errors;
    }

    /**
     * Overrides base controller create. Adds URID to data. Creates an incremental URID if repeated.
     * @param data
     * @param fn
     */
    create(data, fn)
    {
        var errors = this.validateData(data);

        if (errors.length > 0) fn(errors, null); //if errors execute callback with generated errors
        else
        {
            data.URID = data.name.slug();
            this.
            find({URID:new RegExp(data.URID)}).
            sort({URID:-1}).
            exec( (err,res)=>{
                if(res.length != 0) //if  any company with the same uri
                {
                    var matches = new RegExp("("+data.URID+")-?([0-9])?").exec(res[0].URID);
                    var n = (matches !=  null && matches[2] == undefined )? 1:parseInt(matches[2])+1;
                    data.URID = data.URID+"-"+n; //create an autoincrement URID
                }
                super.create(data, fn);
            });

        }

    }
}

module.exports = CompanyController;
