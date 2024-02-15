import { createStore } from "vuex";
import axios from "axios";
const BASE_URL = "http://localhost:8523";

export default createStore({
  state: {
    // better way to handle data you dont know what it is
    friends: null
 
  },
  getters: {},
  mutations: {
    setFriends(state, payload) {
      // payload is the array we pass through
      state.friends = payload;
    },
    setAddFriend(state,data){
      state.addfriend=data
     }
  },
  actions: {
    async getFriends({ commit }) {
      let { data } = await axios.get(BASE_URL+'/friends');
      console.log(data);
      commit("setFriends", data);
    },
    async addFriend({ commit },newfriend) {
      await axios.post(BASE_URL+'/friends/',newfriend);
      // reloads page 
      window.location.reload()
      // commit("setAddFriend", data);
    },
    async deleteFriend({commit},name){
      await axios.delete(BASE_URL+'/friends/'+name)
      window.location.reload()
    },
    async editFriend({commit},update){
      await axios.post(BASE_URL+'/friends/'+update.id,update);
      window.location.reload()
    },
    async addUser({ commit },newuser) {
      await axios.post(BASE_URL+'/users/',newuser);
      // new user is the this.$data that was saved
      // reloads page 
      window.location.reload()
    }
  },
  modules: {},
});


