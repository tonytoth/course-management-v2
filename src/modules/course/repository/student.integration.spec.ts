import { StudentRepositoryFake } from './student.repository.fake';
import { getDatabaseConnection } from './../../../shared/infra/database/typeorm/';
import { TypeORMStudentRespository } from './student.repository.typeorm';
import { StudentRepository } from './student.repository';
import { Student } from '../domain/student.entity';

describe('Student Repository Integration Testing', () => {
  let studentRepos: StudentRepository[];

  beforeAll(async () => {
    const connection = await getDatabaseConnection();

    studentRepos = [
      new StudentRepositoryFake(),
      new TypeORMStudentRespository(connection.manager),
    ];
  });

  afterAll(async () => {
    await (await getDatabaseConnection()).destroy();
  });

  it('should be able to save student entity', async () => {
    const studentExpected = Student.create({
      email: 'tony@toth.tony',
      firstName: 'Tony',
      lastName: 'Toth',
    }).getValue()!;

    const studentInput = Student.create({
      email: 'tony@toth.tony',
      firstName: 'Tony',
      lastName: 'Toth',
    }).getValue()!;

    await Promise.all(
      studentRepos.map(async (studentRepo) => {
        await studentRepo.save(studentInput);
        const maybeFetchedStudent = await studentRepo.getByEmail(
          studentInput.email,
        );

        expect(maybeFetchedStudent).toMatchObject(studentExpected);
      }),
    );
  });
});
