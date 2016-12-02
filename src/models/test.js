export default {
  namespace: 'test',
  state: {
    usersById: {},
  },
  reducers: {
    test(state, { payload: user }) {
      return { ...state };
    },
  },
}
