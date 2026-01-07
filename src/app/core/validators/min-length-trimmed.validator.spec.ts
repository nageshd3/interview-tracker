import { FormControl } from '@angular/forms';
import { minLengthTrimmedValidator } from './min-length-trimmed.validator';

describe('minLengthTrimmedValidator', () => {
  const validator = minLengthTrimmedValidator(3);

  it('should return null for empty value', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeNull();
  });

  it('should return null for null value', () => {
    const control = new FormControl(null);
    expect(validator(control)).toBeNull();
  });

  it('should return null for valid length after trim', () => {
    const control = new FormControl('  abc  ');
    expect(validator(control)).toBeNull();
  });

  it('should return error for length less than min after trim', () => {
    const control = new FormControl('  ab  ');
    expect(validator(control)).toEqual({
      minLengthTrimmed: { requiredLength: 3, actualLength: 2 },
    });
  });

  it('should return null for exact min length', () => {
    const control = new FormControl('abc');
    expect(validator(control)).toBeNull();
  });
});
