const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const localeSchema = new Schema({
    placeName: { type: String, required: true, unique: true },
    clicks: { type: Number, required: true }
},
{
    timestamps: true
}
)

const Locale = mongoose.model('Locale', localeSchema);

module.exports = Locale;