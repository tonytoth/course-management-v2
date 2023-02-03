import { StudentEmail } from './student-email';

describe('student email', () => {
  it('should exist', () => {
    expect(StudentEmail).toBeDefined();
  });

  it('should have a creation method', () => {
    expect(StudentEmail.create).toBeDefined();
  });

  it('creation method should accept email as parameter', () => {
    expect(StudentEmail.create('hello@hello@hello')).toBeDefined();
  });

  it('should be able to tell us that tony@toth.com is a valid email', () => {
    expect(StudentEmail.create('tony@toth.com')).toBeInstanceOf(StudentEmail);
  });

  it('should be able to tell us that empty string is not a valid email', () => {
    expect(StudentEmail.validate('')).toBeFalsy();
  });

  it('should be able to tell us that a@a.a is not a valid email', () => {
    expect(StudentEmail.validate('a@a.a')).toBeFalsy();
  });

  it('should be able to tell us that aa@aa.aa is not a valid email', () => {
    expect(StudentEmail.validate('aa@aa.aa')).toBeFalsy();
  });

  it('should be able to tell us that sadas@aa.com is not a valid email', () => {
    expect(StudentEmail.validate('sadas@aa.com')).toBeFalsy();
  });

  it('should be able to tell us that asd@asd.a is not a valid email', () => {
    expect(StudentEmail.validate('asd@asd.a')).toBeFalsy();
  });
});
