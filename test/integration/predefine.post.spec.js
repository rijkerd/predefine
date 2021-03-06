import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src';

describe('Predefine Static Post', () => {
  before((done) => clear(done));

  const predefine = Predefine.fake();

  it('should be able to post', (done) => {
    Predefine.post(predefine, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(predefine._id);
      expect(created.strings.code).to.eql(predefine.strings.code);
      done(error, created);
    });
  });

  after((done) => clear(done));
});

describe('Predefine Instance Post', () => {
  before((done) => clear(done));

  const predefine = Predefine.fake();

  it('should be able to post', (done) => {
    predefine.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(predefine._id);
      expect(created.strings.code).to.eql(predefine.strings.code);
      done(error, created);
    });
  });

  after((done) => clear(done));
});

describe('Predefine Relations Static Post', () => {
  before((done) => clear(done));

  const status = Predefine.fake();
  const parent = Predefine.fake();
  const predefine = Predefine.fake();

  before((done) => create(parent, status, done));

  it('should be able to post with parent', (done) => {
    predefine.set({ relations: { parent } });
    Predefine.post(predefine, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(predefine._id);
      expect(created.strings.code).to.eql(predefine.strings.code);
      expect(created.relations.parent).to.exist;
      expect(created.relations.parent._id).to.eql(parent._id);
      done(error, created);
    });
  });

  it('should be able to post with custom relation', (done) => {
    predefine.set({ relations: { status } });
    Predefine.post(predefine, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(predefine._id);
      expect(created.strings.code).to.eql(predefine.strings.code);
      expect(created.relations.status).to.exist;
      expect(created.relations.status._id).to.eql(status._id);
      done(error, created);
    });
  });

  after((done) => clear(done));
});

describe('Predefine Relations Instance Post', () => {
  before((done) => clear(done));

  const status = Predefine.fake();
  const parent = Predefine.fake();
  const predefine = Predefine.fake();

  before((done) => create(parent, status, done));

  it('should be able to post with parent', (done) => {
    predefine.set({ relations: { parent } });
    predefine.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(predefine._id);
      expect(created.strings.code).to.eql(predefine.strings.code);
      expect(created.relations.parent).to.exist;
      expect(created.relations.parent._id).to.eql(parent._id);
      done(error, created);
    });
  });

  it('should be able to post with custom relation', (done) => {
    predefine.set({ relations: { status } });
    predefine.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(predefine._id);
      expect(created.strings.code).to.eql(predefine.strings.code);
      expect(created.relations.status).to.exist;
      expect(created.relations.status._id).to.eql(status._id);
      done(error, created);
    });
  });

  after((done) => clear(done));
});
