// @flow
import type {
  RecordSourceSelectorProxy,
  SelectorData,
  RelayMutationConfig,
} from 'relay-runtime';

export type MutationConfigType = $Shape<{
  onCompleted?: ?(response: ?Object, errors: ?Array<Error>) => void,
  onError?: ?(error: Error) => void,
  optimisticResponse?: Object,
  optimisticUpdater?: ?(store: RecordSourceSelectorProxy) => void,
  updater?: ?(store: RecordSourceSelectorProxy, data: SelectorData) => void,
  configs?: Array<RelayMutationConfig>,
}>;
