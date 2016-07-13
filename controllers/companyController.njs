/**
 * Created by duatis on 13/07/16.
 */
module.exports = function(Company)
{
    //Instance
    var self = {};

    self.index = function(fn)
    {
        Company.find({}).exec(fn);
    }

    return self;
}
