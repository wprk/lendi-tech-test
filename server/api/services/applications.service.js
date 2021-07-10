import Application from '../entities/Application';
import DB from '../../db';
import Liability from '../entities/Liability';
import Asset from '../entities/Asset';

class ApplicationsService {
  async findAll() {
    return await Application.findAll({
      include: ['assets', 'liabilities'],
    });
  }

  async findById(id) {
    return await Application.findByPk(id, {
      include: ['assets', 'liabilities'],
    });
  }

  async create(application) {
    return await Application.create(application, {
      include: ['assets', 'liabilities'],
    });
  }

  async deleteById(id) {
    return await Application.destroy({
      include: ['assets', 'liabilities'],
      where: { id },
    });
  }

  async updateById(id, updates) {
    const t = await DB.transaction();
    try {
      let application = await Application.findByPk(id, {
        include: ['assets', 'liabilities'],
        transaction: t,
      });

      if (!application) return false;

      const assets = updates.assets.map(asset => {
        return { application_id: application.id, ...asset };
      });
      delete updates.assets;
      const liabilities = updates.liabilities.map(liability => {
        return { application_id: application.id, ...liability };
      });
      delete updates.liabilities;

      Object.keys(updates).map(key => {
        application[key] = updates[key];
      });
      await application.save({ transaction: t });

      await application.setAssets([], { transaction: t });
      await Asset.bulkCreate(assets, { transaction: t });
      await application.setLiabilities([], { transaction: t });
      await Liability.bulkCreate(liabilities, { transaction: t });

      await t.commit();

      return await application.reload();
    } catch (error) {
      console.log(error);

      await t.rollback();

      throw new Error('Unable to update application.');
    }
  }
}

export default new ApplicationsService();
