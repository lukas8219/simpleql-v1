import { Model } from "../src/model.js"

export class UserTestModel extends Model {
    constructor() {
        super({
            tableName: 'users',
            columns: [
                { name: 'id' },
                { name: 'name' },
                { name: 'email' },
                { name: 'organizationId' },
            ]
        })
    }
}