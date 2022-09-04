import assert from 'assert'
import { ModelRegistry } from '../src/model-registry.js';
import { QueryBuilder } from '../src/sql-query-builder.js';
import { UserTestModel } from './test.models.js'

before(function () {
    ModelRegistry.addModel(UserTestModel);
});

describe('where()', function () {

    it('should filter by correct single predicate', function () {
        const query = QueryBuilder.newBuilder(UserTestModel).where({
            id: 5
        })
            .build();

        assert.match(query, /WHERE "id" = '5'/)
    })

    it('should filter by correct multiple predicate', function () {
        const query = QueryBuilder.newBuilder(UserTestModel).where({
            id: 5,
            name: 'LUCAS'
        })
            .build();

        assert.match(query, /WHERE "id" = '5' AND "name" = 'LUCAS'/);
    })

})