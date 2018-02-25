exports.up = (pgm) => {
  // pgm.createTable('edition_base', {
  //   edition_base_id: {
  //     type: 'serial4',
  //     primaryKey: true,
  //     notNull: true
  //   },
  //   abbreviation: {
  //     type: 'varchar(20)',
  //     unique: true,
  //     notNull: true
  //   },
  //   priority: {
  //     type: 'integer'
  //   }
  // });

  // pgm.createTable('edition', {
  //   edition_id: {
  //     type: 'serial4',
  //     primaryKey: true,
  //     notNull: true
  //   },
  //   edition_base_id: {
  //     type: 'integer',
  //     notNull: true
  //   },
  //   language_id: {
  //     type: 'integer',
  //     notNull: true
  //   },
  //   name: {
  //     type: 'varchar(40)',
  //     unique: true,
  //     notNull: true
  //   },
  // })
};

exports.down = (pgm) => {
  // pgm.dropTable('edition_base');
  // pgm.dropTable('edition');
};
