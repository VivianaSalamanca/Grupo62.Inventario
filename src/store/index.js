import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //Crear variable
  state: {
    personajes:[]
  },
  //Modificar estado
  mutations: {
    setPersonajes(state, payload){
      state.personajes=payload;
    }
  },

  //Funciones a realizar (guardar)
  actions: {
    //Consultar y Obtener Personajes
    async getPersonajes({commit}){
      //const peticion= await fetch('https://futuramaapi.herokuapp.com/api/v2/characters');
      const peticion= await fetch('http://localhost:3000/Users/');
      const data= await peticion.json();
      console.log(data);
      commit('setPersonajes', data);
    },

    //Eliminar personaje con el id (misma estructura que con Postman)
    async deletePersonajes({commit}, personajes){
      const peticion = await fetch ('http://localhost:3000/Users/', {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(personajes)
      });
    },

    //Agregar personaje
    async setPersonajes({commit}, personajes){
      const peticion = await fetch ('http://localhost:3000/Users/', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(personajes)
      });
    },
    
    //Actualizar personaje
    async updatePersonajes({commit}, personajes){
      const peticion = await fetch ('http://localhost:3000/Users/', {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(personajes)
      });
    },
  },
  modules: {
  }
})
