import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';

import { RegisterStudent } from './register-student';

const feature = loadFeature(path.join(__dirname, './register-student.feature'));

defineFeature(feature, (test) => {
  test('Successfully register a student', ({ given, when, then }) => {
    let registerStudentUseCase: RegisterStudent;
    let response: unknown;

    given('a student is not registered yet', () => {
      registerStudentUseCase = new RegisterStudent();
    });

    when('the student is trying to get registered', async () => {
      const studentInput = {
        email: 'tony@email.com',
        firstName: 'Tony',
        lastName: 'Toth',
      };

      response = await registerStudentUseCase.execute(studentInput);
    });

    then('the student should be successfully registered', () => {
      expect(response).toEqual({
        email: 'tony@email.com',
        firstName: 'Tony',
        lastName: 'Toth',
      });
    });
  });
});
