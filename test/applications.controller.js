import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const expect = chai.expect;

describe('Applications', () => {
  it('should get all applications', () =>
    request(Server)
      .get('/api/v1/applications')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .of.length(2);
      }));

  it('should add a new application', () =>
    request(Server)
      .post('/api/v1/applications')
      .send({
        applicant_first_name: 'John',
        applicant_last_name: 'Doe',
        loan_amount: 100000,
      })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .to.deep.equal({
            id: 2,
            applicant_first_name: 'John',
            applicant_last_name: 'Doe',
            loan_amount: 100000,
          });
      }));

  it('should get an application by id', () =>
    request(Server)
      .get('/api/v1/applications/2')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .to.deep.equal({
            id: 2,
            applicant_first_name: 'John',
            applicant_last_name: 'Doe',
            loan_amount: 100000,
          });
      }));

  it('should delete an application by id', () => {
    it('returns 204 when successful', () => {
      request(Server)
        .delete('/api/v1/applications/2')
        .expect('Content-Type', /json/)
        .then(r => {
          expect(r.statusCode)
            .to.be.an('number')
            .to.equal(204);
        });
    });

    it('returns 404 if not found', () => {
      request(Server)
        .delete('/api/v1/applications/25')
        .expect('Content-Type', /json/)
        .then(r => {
          expect(r.statusCode)
            .to.be.an('number')
            .to.equal(404);
        });
    });
  });

  it('should update an application by id', () => {
    it('returns 200 when successful', () => {
      request(Server)
        .put('/api/v1/applications/2', {
          applicant_first_name: 'Joe',
          applicant_last_name: 'Bloggs',
          loan_amount: 150000,
        })
        .expect('Content-Type', /json/)
        .then(r => {
          expect(r.statusCode)
            .to.be.an('number')
            .to.equal(200);
          expect(r.body)
            .to.be.an('object')
            .to.deep.equal({
              id: 2,
              applicant_first_name: 'Joe',
              applicant_last_name: 'Bloggs',
              loan_amount: 150000,
            });
        });
    });

    it('returns 404 if not found', () => {
      request(Server)
        .put('/api/v1/applications/25', {
          applicant_first_name: 'Joe',
          applicant_last_name: 'Bloggs',
          loan_amount: 150000,
        })
        .expect('Content-Type', /json/)
        .then(r => {
          expect(r.statusCode)
            .to.be.an('number')
            .to.equal(404);
        });
    });
  });
});
