/**
 * Created by duatis on 12/07/16.
 * @summary model for company entity.
 *
 * @param mongoose reference to mongoose database conection
 */
module.exports = function(mongoose)
{
    var Schema = mongoose.Schema, Company;

    /**
     * @var schema for the mongodb document
     */
    var schema = new Schema(
        {
            name: String,
            address: String,
            city: String,
            province: String,
            zip: Number,
            country: String,
            description: String,
            web: String
        }
    );


    /**
     * @var creates the mongoose model
     */
    Company = mongoose.model( 'Company', schema );

    return Company;
};