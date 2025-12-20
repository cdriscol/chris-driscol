// @flow
class TypeModelResolver {
  typeConfigs: Array<any>;
  constructor() {
    this.typeConfigs = [];
  }

  registerType(type: any, model: any) {
    this.typeConfigs.push({ type, model });
  }

  getModelFromGraphType(graphType: any) {
    const config = this.typeConfigs.find(tc => tc.type.name === graphType);
    return config ? config.model : null;
  }

  getGraphTypeFromModel(model: any) {
    const config = this.typeConfigs.find(tc => model instanceof tc.model);
    return config ? config.type : null;
  }
}

export default new TypeModelResolver();
