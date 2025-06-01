const sum = (a, b) => {
    return a + b;
};

describe('sum function', () => {
    it('should return the sum of two numbers', () => {
        //    arrange
        const a = 5;
        const b = 10;

        // act
        const result = sum(a, b);

        // assert
        expect(result).toBe(15);
    });
});
