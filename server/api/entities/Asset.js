import { DataTypes, Model, Sequelize } from 'sequelize';

import DB from '../../db';
import Application from './Application';

class Asset extends Model {}

Asset.init(
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
    modelName: 'assets',
  }
);

Asset.belongsTo(Application);

export default Asset;
