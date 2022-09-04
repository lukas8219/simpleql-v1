import assert from 'assert'
import { ModelRegistry } from '../src/model-registry.js';
import { QueryBuilder } from '../src/sql-query-builder.js';
import { UserTestModel } from './test.models.js'

before(function () {
    ModelRegistry.addModel(UserTestModel);
});

describe('from()', function () {

    describe('with Model as class', function () {
        it('should throw error if is not on registry', function () {
            assert.throws(function () {
                QueryBuilder.newBuilder().from(String)
            })
        })

        it('should create correct FROM clause', function () {
            assert.equal(true, QueryBuilder.newBuilder().from(UserTestModel).build().endsWith(`FROM "users"`));
        })

        it('should accept Model class', function () {
            QueryBuilder.newBuilder().from(UserTestModel);
        })

    })

    describe('with Model as string', function () {
        it('should throw error if is not on registry', function () {
            assert.throws(function () {
                QueryBuilder.newBuilder().from('dont-exists');
            })
        })

        it('should create correct FROM clause', function () {
            assert.equal(true, QueryBuilder.newBuilder().from("users").build().endsWith(`FROM "users"`));
        })

        it('should accept table name', function () {
            QueryBuilder.newBuilder().from("users");
        })

    })


})