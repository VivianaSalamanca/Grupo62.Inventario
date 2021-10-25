<template>
<div>
    <h1>Delanteros de Futbol</h1>
    <ul>

<!--Formulario para crear los jugadores-->
    <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
        <v-text-field
            v-model="nombre"
            :counter="10"
            :rules="nombreRules"
            label="Nombre"
            required
        ></v-text-field>

                <v-text-field
            v-model="apellido"
            :counter="10"
            :rules="apellidoRules"
            label="Apellido"
            required
        ></v-text-field>

                <v-text-field
            v-model="edad"
            :counter="10"
            :rules="edadRules"
            label="Edad"
            required
        ></v-text-field>

        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>

        <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
        ></v-checkbox>

        <v-btn v-if="id==null" x-small color="primary" class="mr-4" @click="crearPersonaje()">
            Agregar </v-btn>
        <v-btn v-if="id!=null" x-small color="primary" class="mr-4" @click="actualizarPersonaje(id)">
            Actualizar </v-btn>
        <v-btn v-if="id!=null" x-small color="error" class="mr-4" v-on:click="btnCancelar()">
            Cancelar </v-btn>
        <v-btn :disabled="!valid" color="success" x-small class="mr-4" @click="validate"> 
            Validate </v-btn>
        <v-btn color="error" x-small class="mr-4" @click="reset">
            Reset Form </v-btn>
        <v-btn color="warning" x-small @click="resetValidation">
            Reset Validation </v-btn>
    </v-form>


    <br />

<!--Tabla organización de jugadores de base de datos-->
    <v-simple-table>
      <template v-slot:default>

        <thead>
          <tr>
            <th class="text-center">Nombre</th>
            <th class="text-center">Apellido</th>
            <th class="text-center">Edad</th>
            <th class="text-center">Email</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
        <!--Mostrar en el frontend los items de ejemplo de Apis de futurama-->
            <!--<li v-for="item in personajes" :key="item.Name">
            {{ item.Name }} - {{item.Age}}-->
        <!--Mostrar en el frontend los items de base de datos -->
        <tr v-for="item in personajes" :key="item.id">
            <td>{{item.nombre}} </td>
            <td>{{item.apellido}}  </td>
            <td>Edad:{{item.edad}}  </td>
            <td>{{item.email}}</td>
        <td>
        <v-btn  
            class="mr-4" 
            @click="eliminarPersonaje(item._id)" 
            color="error" 
            elevation="12" 
            rounded x-small>Eliminar
            </v-btn>
        <v-btn  
            class="mr-4" 
            @click="btnActualizarPersonaje(item._id, item.nombre, item.apellido, item.edad, item.email)" 
            color="primary" 
            elevation="12" 
            rounded x-small>Actualizar
        </v-btn>
        </td>
        </tr>
        <br>
        </tbody>
      </template>
    </v-simple-table>
    </ul>
</div>
</template>

<script>
import store from "../store/index.js";

export default {

data: () => ({
    valid: true,
    nombre: '',
    nombreRules: [
        v => !!v || 'Nombre es obligatorio',
        v => (v && v.length <= 10) || 'Nombre debe ser menor de 10 caracteres',
    ],
    apellido: '',
    apellidoRules: [
        v => !!v || 'Apellido es obligatorio',
        v => (v && v.length <= 10) || 'Apellido debe ser menor de 10 caracteres',
    ],
    edad: '',
    edadRules: [v => !!v || 'Edad es obligatorio',
    ],
    email: '',
    emailRules: [
        v => !!v || 'E-mail es obligatorio',
        v => /.+@.+\..+/.test(v) || 'E-mail debe ser valido',
    ],
    checkbox: false,
    id: null,

}),

    methods: {
        eliminarPersonaje(id){
            let obj={id};
            store.dispatch("deletePersonajes",obj).then(()=>{
                store.dispatch("getPersonajes");
            });
        },
        crearPersonaje(){
            let obj = {
                nombre: this.nombre,
                apellido: this.apellido,
                edad: this.edad,
                email: this.email
            };
            store.dispatch("setPersonajes", obj).then(() => {
                store.dispatch("getPersonajes");
                //Al darle agregar, eliminar información del formato
                this.$refs.form.reset();
                /*this.nombre="";
                this.apellido="";
                this.edad="";
                this.email="";*/
            });
        },

        actualizarPersonaje(id){
            let obj = {
                id: id,
                nombre: this.nombre,
                apellido: this.apellido,
                edad: this.edad,
                email: this.email
            };
            store.dispatch("updatePersonajes", obj).then(() => {
                store.dispatch("getPersonajes");
                //Al darle agregar, eliminar información del formulario
                this.$refs.form.reset();
                this.id=null;
                /*this.nombre="";
                this.apellido="";
                this.edad="";
                this.email="";*/
            });
        },

        btnActualizarPersonaje(id, nombre, apellido, edad, email){
            this.id=id;
            this.nombre=nombre;
            this.apellido=apellido;
            this.edad=edad;
            this.email=email;
        },
        btnCancelar(){
            this.id=null;
            this.$refs.form.reset();
        },

        validate (){
            this.$refs.form.validate()
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
        this.$refs.form.resetValidation()
        },
    },
    created: () => {
        //accede a las acciones del store
        store.dispatch("getPersonajes");
    },
    computed: {
        personajes: () => {
            return store.state.personajes;
        }
    }

};
</script>

<style>

</style>