// @flow
import fs from 'fs';
import path from 'path';
import { printSchema } from 'graphql/utilities';

import schema from '../src/graphql/schema';

fs.writeFileSync(
  path.join(__dirname, '../src/graphql/schema.graphql'),
  printSchema(schema, { commentDescriptions: true }),
);
