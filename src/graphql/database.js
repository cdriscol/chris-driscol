export class Viewer extends Object {}
const VIEWER_ID = 'me';

const viewer = new Viewer();
viewer.id = VIEWER_ID;
const usersById = { [VIEWER_ID]: viewer };

export function getUser() {
  return usersById[VIEWER_ID];
}

export function getViewer() {
  return getUser(VIEWER_ID);
}
