import Application from '../entities/Application';

class ApplicationsService {
  async findAll() {
    return await Application.findAll();
  }

  async findById(id) {
    return await Application.findByPk(id);
  }

  async create(application) {
    return await Application.create(application);
  }

  async deleteById(id) {
    return await Application.destroy({ where: { id } });
  }

  async updateById(id, application) {
    await Application.update(application, { where: { id } });

    return this.findById(id);
  }
}

export default new ApplicationsService();
