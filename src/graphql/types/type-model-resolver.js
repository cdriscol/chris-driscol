class TypeModelResolver {
  constructor() {
    this.typeConfigs = [];
  }

  registerType(type, model) {
    this.typeConfigs.push({ type, model });
  }

  getModelFromGraphType(graphType) {
    const config = this.typeConfigs.find(tc => tc.type.name === graphType);
    return config ? config.model : null;
  }

  getGraphTypeFromModel(model) {
    const config = this.typeConfigs.find(tc => model instanceof tc.model);
    return config ? config.type : null;
  }
}

export default new TypeModelResolver();
