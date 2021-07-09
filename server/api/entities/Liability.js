import { DataTypes, Model, Sequelize } from 'sequelize';

import DB from '../../db';
import Application from './Application';

class Liability extends Model {}

Liability.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
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

// Liability.belongsTo(Application);

(async () => {
  await Liability.sync({ force: true });
})();

export default Liability;
