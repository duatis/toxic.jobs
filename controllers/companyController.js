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
    static validateData(data)
    {
        var errors = [];
        if( data.name == undefined || data.name == null )
            errors.push({code: 1001, message:"Company must provide a name"});
        if(data.description == undefined || data.description.length < 20)
            errors.push({code: 1002, message:"Company must a description of minimum 20 characters"});
        if(data.email != undefined && !data.email.isValidEmail())
            errors.push({code: 1003, message: "Email format not valid"});
        return errors;
    }

    /**
     * Overrides base controller create. Adds URID to data. Creates an incremental URID if repeated.
     * @param data
     * @param fn
     */
    create(data, fn)
    {
        var errors = CompanyController.validateData(data);
        if (errors.length > 0)return fn(errors, null); //if errors execute callback with generated errors
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
    
    getAverageScore(id, fn)
    {
        var average = 0;
        this.findOne({_id:id}, (err, data)=>{
            if(err) return fn(err, null);
            data.answers.forEach((item)=> {
                average +=item.score;
            });
            fn(err,(average/data.answers.length));
        });
    }
}

module.exports = CompanyController;
