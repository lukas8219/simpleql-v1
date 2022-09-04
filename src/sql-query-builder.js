import { ModelRegistry } from './model-registry.js';

export class QueryBuilder {

    constructor() {
        this.operation = 'SELECT';
        this.join = [];
    }

    static newBuilder(model) {
        const instance = new this();
        if (model) {
            return instance.from(model);
        }
        return instance;
    }

    from(table) {
        this.model = this._getModelFromRegistry(table);
        return this;
    }

    _getModelFromRegistry(table) {
        const model = ModelRegistry.getTableName(table);
        if (!model) {
            throw new Error(`Model ${table} not found.`)
        }
        return model;
    }

    join(relation) {
        return this;
    }

    select(fields) {
        this.operation = 'SELECT';
        this.fields = fields;
        return this;
    }

    where(predicate) {
        this.predicate = predicate;
        return this;
    }

    _sanitizeWhere() {
        if (!this.predicate) {
            return "";
        }

        const where = [];

        for (const [k, v] of Object.entries(this.predicate)) {
            //TODO - handle different where operators.
            where.push(`"${k}" = '${v}'`)
        }
        return where.join(' AND ')
    }

    _sanitezeFields() {
        if (!this.fields) {
            return this.model.getColumns().map((c) => `"${c}"`).join(', ')
        }
        return this.fields.map((f) => {
            if (Array.isArray(f)) {
                return `"${f[0]}" as "${f[1]}"`
            }
            return `"${f}"`;
        }).join(', ')
    }

    _sanitizedFrom() {
        // Handle - adding the Database name before the Table
        return `"${this.model.getTableName()}"`
    }

    build() {
        const query = [this.operation];

        const sanitizedFields = this._sanitezeFields();
        query.push(sanitizedFields);

        query.push('FROM');
        query.push(this._sanitizedFrom());

        if (this.predicate) {
            query.push('WHERE');
            query.push(this._sanitizeWhere());
        }

        return `${query.join(' ')};`;
    }

}