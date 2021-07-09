import Application from '../entities/Application';

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
    const application = await this.findById(id);

    if (application) {
      return await application.update(updates);
    }

    return false;
  }
}

export default new ApplicationsService();
