exports.up = (pgm) => {
  pgm.createTable('language', {
    language_id: {
      type: 'serial8',
      primaryKey: true,
      notNull: true
    },
    abbreviation: {
      type: 'varchar(20)',
      notNull: true,
      unique: true
    },
    description: {
      type: 'varchar(20)',
      notNull: true
    }
  }, {
    ifNotExist: true
  })
};

exports.down = (pgm) => {
  pgm.dropTable('language')
};
