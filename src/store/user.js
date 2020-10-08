const user = {
  state: {
    level: 0,
    groupId: ''
  },
  mutations: {
    SET_LEVEL: (state, num) => {
      state.level = num
    },
    SET_GROUPID: (state, id) => {
      state.groupId = id
    }
  }
}

export default user
