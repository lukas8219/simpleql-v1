import { Model } from "./model.js";

export class ModelRegistry {

    static models = new Map();

    static addModel(model) {
        if (this.models.has(model)) {
            return;
        }
        const instantiatedModel = new model();

        this.models.set(model, instantiatedModel);
    }

    static getTableName(model) {

        if (typeof model === 'string') {
            for (const [k, v] of this.models.entries()) {
                if (model === v.getTableName()) {
                    return v;
                }
            }
        }

        if (model.prototype && model.prototype instanceof Model) {
            return this.models.get(model)
        }

        throw new Error(`${model} not found on registry`)
    }

}