import assert from 'assert'
import { ModelRegistry } from '../src/model-registry.js';
import { QueryBuilder } from '../src/sql-query-builder.js';
import { UserTestModel } from './test.models.js'

before(function () {
    ModelRegistry.addModel(UserTestModel);
});

describe('newBuilder()', function () {

    describe('with Model(class) as argument', function () {
        it('should accept Model class', function () {
            QueryBuilder.newBuilder(UserTestModel);
        })

        it('should create correct FROM clause', function () {
            const query = QueryBuilder.newBuilder(UserTestModel).build();
            assert.match(query, /FROM "users"/)
        })

        it('should throw error if Model is not on registry (MODEL)', function () {
            assert.throws(function () {
                QueryBuilder.newBuilder(String);
            })
        })
    })

    describe('with Model(table-name) as argument', function () {

        it('should accept table name', function () {
            QueryBuilder.newBuilder("users");
        })

        it('should create correct FROM clause', function () {
            const query = QueryBuilder.newBuilder("users").build();
            assert.match(query, /FROM "users"/)
        })

        it('should throw error if Model is not on registry (TABLE)', function () {
            assert.throws(function () {
                QueryBuilder.newBuilder('dont-exists');
            })
        })
    })


})