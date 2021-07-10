import Application from '../../server/api/entities/Application';

export const createApplications = async count => {
  let applications = [];

  for (let i = 0; i < count; i++) {
    applications[i] = await createApplication();
  }

  return applications;
};

export const createApplication = async (application = {}) => {
  application = generateApplication(application);

  return await Application.create(application);
};

export const generateApplication = (application = {}) => {
  return {
    applicant_first_name: 'John',
    applicant_last_name: 'Doe',
    loan_amount: 100000,
    lender_id: 'NAB',
    assets: [],
    liabilities: [],
    ...application,
  };
};

export const generateAsset = (asset = {}) => {
  return {
    name: 'Property',
    value: 100000,
    ...asset,
  };
};

export const generateLiability = (liability = {}) => {
  return {
    name: 'Credit Card',
    value: 100000,
    ...liability,
  };
};
