import { DataTypes, Model, Sequelize } from 'sequelize';

import DB from '../../db';
import Asset from './Asset';
import Liability from './Liability';

class Application extends Model {}

Application.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    applicant_first_name: DataTypes.STRING,
    applicant_last_name: DataTypes.STRING,
    loan_amount: DataTypes.INTEGER,
    lender_id: DataTypes.ENUM(['CMB', 'STG', 'NCP', 'NAB']),
  },
  {
    sequelize: DB,
    paranoid: true,
    deletedAt: 'deleted_at',
    modelName: 'applications',
  }
);

Application.hasMany(Asset);
Application.hasMany(Liability);

export default Application;
