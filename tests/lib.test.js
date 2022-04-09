const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');
const { fizzBuzz } = require('../exercise1');

describe('absolute', () => {
    it('absolute - shauld return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('absolute - shauld return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('absolute - shauld return a zero if input is zero', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Mosh');
        expect(result).toMatch(/Mosh/);
    });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
});

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);

        // expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ id: 1 });
        expect(result).toHaveProperty('id', 1);
    });
});

describe('reisterUser', () => {
    it('should throw if username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false];

        args.forEach(() => {
            expect(() => {
                lib.registerUser(null);
            }).toThrow();
        });
    });

    it('should return a user object if vaild username is passed', () => {
        const result = lib.registerUser('jorge');
        expect(result).toMatchObject({ username: 'jorge' });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('fizzBuzz', () => {
    it('should throw if not a number', () => {
        expect(() => {
            fizzBuzz('');
        }).toThrow();
        expect(() => {
            fizzBuzz(null);
        }).toThrow();
        expect(() => {
            fizzBuzz(undefined);
        }).toThrow();
        expect(() => {
            fizzBuzz({});
        }).toThrow();
    });
    ``;
    it('should return Fizz if divisible by 3 and 5', () => {
        const result = fizzBuzz(15);
        expect(result).toEqual('FizzBuzz');
    });
    it('should return Fizz if only divisible by 3', () => {
        const result = fizzBuzz(3);
        expect(result).toEqual('Fizz');
    });
    it('should return Fizz if only divisible by 5', () => {
        const result = fizzBuzz(5);
        expect(result).toEqual('Buzz');
    });
    it('should return input if it is not divisible by 3 or 5', () => {
        const result = fizzBuzz(1);
        expect(result).toEqual(1);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% disconut fi customer has more than 10 points', () => {
        db.getCustomerSync = function (customerId) {
            console.log('Fake reading customer');
            return { id: customerId, points: 11 };
        };

        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toEqual(9);
    });
});

describe('notifyCustomer', () => {
    it('should send an email to the custotmer', () => {
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});
