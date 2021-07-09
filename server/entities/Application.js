module.exports = {
  name: 'Application',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: true,
    },
    applicant_first_name: {
      type: 'varchar',
    },
    applicant_last_name: {
      type: 'text',
    },
    loan_amount: {
      type: 'int',
    },
    lender_id: {
      type: 'enum',
    },
  },
  relations: {
    assets: {
      target: 'Asset',
      type: 'one-to-many',
      joinTable: true,
      cascade: true,
    },
    liabilities: {
      target: 'Liability',
      type: 'one-to-many',
      joinTable: true,
      cascade: true,
    },
  },
};
