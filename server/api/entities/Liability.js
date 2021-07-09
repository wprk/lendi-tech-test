import { DataTypes, Model, Sequelize } from 'sequelize';

import DB from '../../db';

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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    modelName: 'liabilities',
  }
);

(async () => {
  await Liability.sync({ force: true });
})();

export default Liability;
