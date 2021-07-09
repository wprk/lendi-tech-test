module.exports = {
  name: 'Asset',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: true,
    },
    application_id: {
      type: 'uuid',
    },
    name: {
      type: 'varchar',
    },
    value: {
      type: 'int',
    },
  },
  relations: {
    application: {
      target: 'Application',
      type: 'belongs-to',
      joinTable: true,
      cascade: true,
    },
  },
};
