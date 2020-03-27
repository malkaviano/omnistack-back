const hexId = require('../../src/helpers/uniqueid.helper');

describe('Generate Unique ID', () => {
    it('should genreate an unique ID', () => {
        expect(hexId()).toHaveLength(8);
    });
});