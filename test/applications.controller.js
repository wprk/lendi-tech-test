import chai from 'chai';
import request from 'supertest';
import Server from '../server';
import Application from '../server/api/entities/Application';
import DB from '../server/db';
import {
  createApplication,
  createApplications,
  generateApplication,
  generateAsset,
  generateLiability,
} from './utils/applications.helper';

const expect = chai.expect;

describe('Applications - GET /applications', async () => {
  beforeEach(async () => {
    await DB.sync({ force: true });
    await createApplications(2);
  });

  it('should get all applications', () => {
    return request(Server)
      .get('/api/v1/applications')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .of.length(2);
      });
  });
});

describe('Applications - POST /applications', () => {
  let basicApplication;
  let complexApplication;
  let asset;
  let liability;

  beforeEach(async () => {
    await DB.sync({ force: true });
    asset = generateAsset();
    liability = generateLiability();
    basicApplication = generateApplication({
      applicant_first_name: 'John',
      applicant_last_name: 'Doe',
      loan_amount: 100000,
      lender_id: 'NAB',
    });
    complexApplication = generateApplication({
      applicant_first_name: 'John',
      applicant_last_name: 'Doe',
      loan_amount: 100000,
      lender_id: 'NAB',
      assets: [asset],
      liabilities: [liability],
    });
  });

  it('should add a new application', () => {
    return request(Server)
      .post('/api/v1/applications')
      .send(basicApplication)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .to.include({
            applicant_first_name: 'John',
            applicant_last_name: 'Doe',
            loan_amount: 100000,
            lender_id: 'NAB',
          });
      });
  });

  it('should add a new application with assets and liabilities', () => {
    return request(Server)
      .post('/api/v1/applications')
      .send(complexApplication)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .to.include({
            applicant_first_name: 'John',
            applicant_last_name: 'Doe',
            loan_amount: 100000,
            lender_id: 'NAB',
          });
        expect(r.body.assets)
          .to.be.an('array')
          .of.length(1);
        expect(r.body.liabilities)
          .to.be.an('array')
          .of.length(1);
      });
  });
});

describe('Applications - GET /applications/:id', async () => {
  let application;

  beforeEach(async () => {
    await DB.sync({ force: true });
    application = await createApplication();
  });

  it('should get an application by id', () => {
    return request(Server)
      .get(`/api/v1/applications/${application.id}`)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .to.include({
            applicant_first_name: application.applicant_first_name,
            applicant_last_name: application.applicant_last_name,
            loan_amount: application.loan_amount,
            lender_id: application.lender_id,
          });
      });
  });
});

describe('Applications - DELETE /applications/:id', async () => {
  let application;

  beforeEach(async () => {
    await DB.sync({ force: true });
    application = await createApplication();
  });

  it('when deleting an application returns 204 when successful', () => {
    return request(Server)
      .delete(`/api/v1/applications/${application.id}`)
      .then(async r => {
        expect(r.statusCode)
          .to.be.a('number')
          .to.equal(204);

        const applications = await Application.findAll();
        expect(applications.length)
          .to.be.a('number')
          .to.equal(0);
      });
  });

  it('when deleting an application returns 404 if not found', () => {
    return request(Server)
      .delete(`/api/v1/applications/INVALID_ID`)
      .then(async r => {
        expect(r.statusCode)
          .to.be.a('number')
          .to.equal(404);

        const applications = await Application.findAll();
        expect(applications.length)
          .to.be.a('number')
          .to.equal(1);
      });
  });
});

describe('Applications - PUT /applications/:id', async () => {
  let application;

  const updatedApplication = {
    applicant_first_name: 'Joe',
    applicant_last_name: 'Bloggs',
    loan_amount: 150000,
    lender_id: 'STG',
  };

  beforeEach(async () => {
    await DB.sync({ force: true });
    application = await createApplication();
  });

  it('when updating an application returns 200 when successful', () => {
    return request(Server)
      .put(`/api/v1/applications/${application.id}`)
      .send({ ...application.toJSON(), ...updatedApplication })
      .then(r => {
        expect(r.statusCode)
          .to.be.a('number')
          .to.equal(200);
        expect(r.body)
          .to.be.an('object')
          .to.include(updatedApplication);
      });
  });

  it('when updating an application returns 404 if not found', () => {
    return request(Server)
      .put('/api/v1/applications/INVALID_ID')
      .send({ ...application.toJSON(), ...updatedApplication })
      .then(r => {
        expect(r.statusCode)
          .to.be.a('number')
          .to.equal(404);
      });
  });
});
