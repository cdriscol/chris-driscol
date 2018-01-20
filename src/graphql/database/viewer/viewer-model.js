export default class ViewerModel extends Object {
  constructor(id) {
    super();
    this.id = id;
    this.skills = {};
  }

  static findById(id) {
    return new ViewerModel(id);
  }
}
