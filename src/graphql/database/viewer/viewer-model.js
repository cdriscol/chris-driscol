export default class ViewerModel extends Object {
  constructor(id) {
    super();
    this.id = id;
  }

  static findById(id) {
    return new ViewerModel(id);
  }
}
