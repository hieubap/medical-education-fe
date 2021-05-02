export default {
  setPage(value, state, setState) {
    setState({ ...state, page: value });
    console.log(state);
  },
  setSize(value, state, setState) {
    setState({ ...state, size: value, page: 0 });
    console.log("size=   " + value);
  },
};
