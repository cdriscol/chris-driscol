// @flow

export default {
  column: {
    flexDirection: 'column',
    boxSizing: 'border-box',
    display: 'flex',
  },

  row: {
    flexDirection: 'row',
    boxSizing: 'border-box',
    display: 'flex',
  },

  wrap: {
    flexWrap: 'wrap',
  },

  flex: {
    flex: 1,
  },

  flexBasisAuto: {
    flexBasis: 'auto',
  },

  justifyStart: {
    justifyContent: 'flex-start',
  },

  justifyCenter: {
    justifyContent: 'center',
  },

  justifyEnd: {
    justifyContent: 'flex-end',
  },

  justifySpaceAround: {
    justifyContent: 'space-around',
  },

  justifySpaceBetween: {
    justifyContent: 'space-between',
  },

  alignStart: {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },

  alignCenter: {
    alignItems: 'center',
    alignContent: 'center',
    maxWidth: '100%',
  },

  alignStretch: {
    alignItems: 'stretch',
    alignContent: 'stretch',
  },

  alignEnd: {
    alignItems: 'flex-end',
    alignContent: 'flex-end',
  },
};
