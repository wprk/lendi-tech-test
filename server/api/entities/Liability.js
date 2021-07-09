import { DataTypes, Model, Sequelize } from 'sequelize';

import DB from '../../db';
import Application from './Application';

class Liability extends Model {}

Liability.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    application_id: DataTypes.UUID,
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
  },
  {
    sequelize: DB,
    paranoid: true,
    deletedAt: 'deleted_at',
    modelName: 'liabilities',
  }
);

Liability.belongsTo(Application);

export default Liability;
