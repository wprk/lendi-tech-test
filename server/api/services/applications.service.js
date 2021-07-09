import db from './applications.db.service';

class ApplicationsService {
  findAll() {
    return db.findAll();
  }

  findById(id) {
    return db.findById(id);
  }

  create(application) {
    return db.insert(application);
  }

  deleteById(id) {
    return db.deleteById(id);
  }

  updateById(id, application) {
    return db.updateById(id, application);
  }
}

export default new ApplicationsService();
