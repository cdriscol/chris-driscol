// @flow
export default class ChrisModel extends Object {
  id: string;
  skills: {};
  constructor(id: string) {
    super();
    this.id = id;
    this.skills = {};
  }

  static findById(id: string) {
    return new ChrisModel(id);
  }
}
