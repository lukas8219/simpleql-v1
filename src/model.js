import { ModelRegistry } from "./model-registry.js";

export class Model {

    constructor(data) {
        this._tableName = data.tableName;
        this._columns = data.columns;
        this._relations = data.relations || [];

    }

    getTableName() {
        return this._tableName;
    }

    getColumns() {
        return this._columns.map((c) => c.name);
    }

    getRelationships() {
        return this._relations;
    }

    hasMany() {
        return;
    }

    belongsTo() {
        return;
    }
}