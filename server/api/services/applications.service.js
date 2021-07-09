import l from '../../common/logger';
import db from './applications.db.service';

class ApplicationsService {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return db.all();
  }

  byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return db.byId(id);
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
