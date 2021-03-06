import thinky from '../thinky';

const type = thinky.type;

const Type = thinky.createModel('Type', {
    // Optional => not specified in bodies but generated by RethinkDB
    id         : type.string().optional(),
    name       : String,
    custom     : String,
    createdAt  : type.date().default(new Date()),
    editedAt   : type.date().default(new Date()),
    isRemoved  : type.boolean().default(false)
}, {
    enforce_missing: true,
    enforce_extra  : 'remove',
    enforce_type   : 'strict'
});

Type.pre('save', function (next) {
    this.editedAt = new Date();
    next();
});

Type.ensureIndex('createdAt');
Type.ensureIndex('editedAt');

Type.associate = models => {
    models.Type.hasAndBelongsToMany(models.Notification, 'notifications', 'id', 'id');
};

export default Type;