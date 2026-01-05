import { FormControl } from '@angular/forms';
import { futureDateValidator } from './future-date.validator';

describe('futureDateValidator', () => {

    it('should return null for empty value', () => {
        const control = new FormControl('');
        expect(futureDateValidator(control)).toBeNull();
    });

    it('should return error for invalid date', () => {
        const control = new FormControl('invalid-date');
        expect(futureDateValidator(control)).toEqual({ invalidDate: true });
    });

    it('should return error for past date', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);

        const control = new FormControl(
            pastDate.toISOString().split('T')[0]
        );

        expect(futureDateValidator(control)).toEqual({ pastDate: true });
    });

    it('should return null for future date', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);

        const control = new FormControl(
            futureDate.toISOString().split('T')[0]
        );

        expect(futureDateValidator(control)).toBeNull();
    });
});
