import { expect } from 'chai';
import { getPotdInfo } from '../../apps/wiki-pic';

require('dotenv').config();

describe('potd functionality', () => {
  it('should return link and descripition of potd', async () => {
    // add an assertion
    const potd = await getPotdInfo();
    expect(potd).to.have.property('link');
    expect(potd).to.have.property('description');
  });
});
