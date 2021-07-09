import ApplicationsService from '../../services/applications.service';

export class Controller {
  all(req, res) {
    ApplicationsService.all().then(r => res.json(r));
  }

  byId(req, res) {
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
}
export default new Controller();
