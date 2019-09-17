import _ from 'lodash';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { Schema, SchemaTypes } from '@lykmapipo/mongoose-common';
import {
  uniqueIndexes,
  parseNamespaceRelations,
  parseGivenRelations,
  createRelationsSchema,
  createDatesSchema,
  createGeosSchema,
} from '../../src/utils';

describe('Predefine Utils', () => {
  it('should derive unique indexes', () => {
    expect(uniqueIndexes).to.exist;
    expect(uniqueIndexes).to.be.a('function');

    const indexes = uniqueIndexes();
    expect(indexes).to.exist.and.be.an('object');
    expect(indexes.namespace).to.exist.and.be.equal(1);
    expect(indexes.bucket).to.exist.and.be.equal(1);
    expect(indexes.code).to.exist.and.be.equal(1);
    expect(indexes['name.en']).to.exist.and.be.equal(1);
  });

  it('should map namespace to relations', () => {
    expect(parseNamespaceRelations).to.exist;
    expect(parseNamespaceRelations).to.be.a('function');

    const relations = parseNamespaceRelations();
    expect(relations).to.exist;
    expect(relations.parent).to.exist;
    expect(relations.setting).to.exist;
    _.forEach(relations, relation => {
      expect(relation).to.exist;
      expect(relation.type).to.exist;
      expect(relation.ref).to.exist;
      expect(relation.index).to.exist.and.be.true;
      expect(relation.aggregatable).to.exist.and.be.true;
      expect(relation.exists).to.exist.and.be.eql({
        refresh: true,
        select: {
          name: 1,
          code: 1,
          abbreviation: 1,
          symbol: 1,
          weight: 1,
          color: 1,
        },
      });
      expect(relation.autopopulate).to.exist.and.be.eql({
        maxDepth: 1,
        select: {
          name: 1,
          code: 1,
          abbreviation: 1,
          symbol: 1,
          weight: 1,
          color: 1,
        },
      });
      expect(relation.taggable).to.exist.and.be.true;
    });
  });

  it('should parse given relations', () => {
    expect(parseGivenRelations).to.exist;
    expect(parseGivenRelations).to.be.a('function');

    const relations = parseGivenRelations();
    expect(relations).to.exist;
    expect(relations.status).to.exist;
    expect(relations.priority).to.exist;
    _.forEach(relations, relation => {
      expect(relation).to.exist;
      expect(relation.type).to.exist;
      expect(relation.ref).to.exist;
      expect(relation.index).to.exist.and.be.true;
      expect(relation.aggregatable).to.exist.and.be.true;
      expect(relation.autopopulate).to.exist.and.be.eql({ maxDepth: 1 });
      expect(relation.taggable).to.exist.and.be.true;
    });
  });

  it('should create relations schema', () => {
    expect(createRelationsSchema).to.exist;
    expect(createRelationsSchema).to.be.a('function');

    const relations = createRelationsSchema();
    expect(relations).to.exist;
    expect(relations).to.be.an.instanceof(Schema);
    expect(relations.options._id).to.be.false;
    expect(relations.options.id).to.be.false;
    expect(relations.options.timestamps).to.be.false;
    expect(relations.options.emitIndexErrors).to.be.true;
  });

  it('should create dates schema', () => {
    expect(createDatesSchema).to.exist;
    expect(createDatesSchema).to.be.a('function');

    const dates = createDatesSchema();
    expect(dates).to.exist;
    expect(dates).to.be.an.instanceof(Schema);
    expect(dates.options._id).to.be.false;
    expect(dates.options.id).to.be.false;
    expect(dates.options.timestamps).to.be.false;
    expect(dates.options.emitIndexErrors).to.be.true;

    const startedAt = dates.path('startedAt');
    expect(startedAt).to.exist;
    expect(startedAt).to.be.an.instanceof(SchemaTypes.Date);
    expect(startedAt.options.index).to.be.true;
    expect(startedAt.options.exportable).to.be.true;
    expect(startedAt.options.fake).to.exist.and.be.a('function');

    const endedAt = dates.path('endedAt');
    expect(endedAt).to.exist;
    expect(endedAt).to.be.an.instanceof(SchemaTypes.Date);
    expect(endedAt.options.index).to.be.true;
    expect(endedAt.options.exportable).to.be.true;
    expect(endedAt.options.fake).to.exist.and.be.a('function');
  });

  it('should create geos schema', () => {
    expect(createGeosSchema).to.exist;
    expect(createGeosSchema).to.be.a('function');

    const geos = createGeosSchema();
    expect(geos).to.exist;
    expect(geos).to.be.an.instanceof(Schema);
    expect(geos.options._id).to.be.false;
    expect(geos.options.id).to.be.false;
    expect(geos.options.timestamps).to.be.false;
    expect(geos.options.emitIndexErrors).to.be.true;

    const paths = [
      'point',
      'line',
      'polygon',
      'geometry',
      'points',
      'lines',
      'polygons',
      'geometries',
    ];
    _.forEach(paths, path => {
      const geo = geos.path(path);
      expect(geo).to.exist;
      expect(geo).to.be.an.instanceof(SchemaTypes.Embedded);
      expect(geo.options.index).to.exist.and.be.equal('2dsphere');
      expect(geo.options.fake).to.exist.and.be.an('object');
    });
  });
});
