import assert from 'assert'
import { ModelRegistry } from '../src/model-registry.js';
import { QueryBuilder } from '../src/sql-query-builder.js';
import { UserTestModel } from './test.models.js'

before(function () {
    ModelRegistry.addModel(UserTestModel);
});

describe('select()', function () {
    it('should return all specified columns', function () {
        const query = QueryBuilder.newBuilder(UserTestModel)
            .select(['id'])
            .build();

        assert.equal(query, 'SELECT "id" FROM "users"');
    });

    it('should return all columns, if SELECT was not called', function () {
        const query = QueryBuilder.newBuilder(UserTestModel)
            .build();

        assert.equal(query, 'SELECT "id", "name", "email", "organizationId" FROM "users"')
    });
});
