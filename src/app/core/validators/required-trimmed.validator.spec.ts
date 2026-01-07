import { FormControl } from '@angular/forms';
import { requiredTrimmedValidator } from './required-trimmed.validator';

describe('requiredTrimmedValidator', () => {
  it('should return error for empty string', () => {
    const control = new FormControl('');
    expect(requiredTrimmedValidator(control)).toEqual({ required: true });
  });

  it('should return error for null value', () => {
    const control = new FormControl(null);
    expect(requiredTrimmedValidator(control)).toEqual({ required: true });
  });

  it('should return error for whitespace only', () => {
    const control = new FormControl('   ');
    expect(requiredTrimmedValidator(control)).toEqual({ required: true });
  });

  it('should return null for non-empty trimmed value', () => {
    const control = new FormControl('test');
    expect(requiredTrimmedValidator(control)).toBeNull();
  });

  it('should return null for value with leading/trailing spaces', () => {
    const control = new FormControl('  test  ');
    expect(requiredTrimmedValidator(control)).toBeNull();
  });
});
