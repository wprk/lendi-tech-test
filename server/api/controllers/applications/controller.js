import ApplicationsService from '../../services/applications.service';

export class Controller {
  find(req, res) {
    ApplicationsService.all().then(r => res.json(r));
  }

  findById(req, res) {
    ApplicationsService.byId(req.params.id).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req, res) {
    const application = req.body;
    ApplicationsService.create(application).then(r =>
      res
        .status(201)
        .location(`/api/v1/applications/${r.id}`)
        .json(r)
    );
  }

  deleteById(req, res) {
    ApplicationsService.deleteById(req.params.id).then(r => {
      console.log(r);
      if (r) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    });
  }

  updateById(req, res) {
    const application = req.body;
    ApplicationsService.updateById(req.params.id, application).then(r =>
      res.status(200).json(r)
    );
  }
}
export default new Controller();
