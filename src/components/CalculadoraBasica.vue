<template>
  <v-container>
      <!--Importar un componente en otro-->
        <encabezado/>
      <!--Título-->
        <v-row>
          <v-col class="text-center">
            <h1>Calculadora Básica</h1>
          </v-col>
        </v-row>
      <!--Espacio añadir valores numericos (n1 y n2)-->
        <v-row>
          <v-col>
      <!--lenguaje Vue: <input type="number" v-model="n1" />-->
            <v-text-field
            label="Número 1"
            :rules="rules"
            hide-details="auto"
            v-model="n1"
            ></v-text-field>
          </v-col>
          <v-col>
      <!--lenguaje Vue: <v-input type="number" v-model="n2"/>-->
            <v-text-field 
            label="Número 2"
            :rules="rules"
            hide-details="auto"
            v-model="n2"
            ></v-text-field>
          </v-col>
        </v-row>
      <br/>
      <!--Botón Sumar-->
      <!--lenguaje Vue: <button @click="suma()">Sumar</button>-->
      <!--El botón tiene que estar conectado con el método que desea realizar-->
      <v-row>
        <v-col class="text-center">
          <v-btn
            color="primary"
            elevation="13"
            rounded
            small
            @click="suma()"
          >Sumar</v-btn>
        </v-col>
      
      <!--lenguaje Vue: <button @click="resta()">Restar</button>-->
        <v-col class="text-center">
          <v-btn
            color="primary"
            elevation="13"
            rounded
            small
            @click="resta()"
          >Restar</v-btn>
        </v-col>
        <!--lenguaje Vue: <button @click="multiplicar()">Multiplicar</button>-->
        <v-col class="text-center">
          <v-btn
            color="primary"
            elevation="13"
            rounded
            small
            @click="multiplicar()"
          >Multiplicar</v-btn>
        </v-col>
        <!--lenguaje Vue: <button @click="dividir()">Dividir</button>-->
        <v-col class="text-center">
          <v-btn
            color="primary"
            elevation="13"
            rounded
            small
            @click="dividir()"
          >Dividir</v-btn>
        </v-col>       
      </v-row>
      <br/>
      <!--Interpolación-->
      <span>{{ respuesta }}</span>
  </v-container>
</template>

<script>
import Encabezado from './Encabezado.vue';

//Estructura de la calculadora
export default {
  components: { Encabezado },
    name: 'calculadoraBasica',
    data:()=>{
        return{
            n1: null,
            n2: null,
            respuesta:"",
            //Las reglas y validaciones que debe cumplir debe ir dentro de la estructura del data
            rules: [
                value => !!value || 'Requerido.',
                value => (value && value.length >= 3) || 'Min 3 caracteres',
            ],
        }
    },
    methods:{
        suma(){
            this.respuesta=parseInt(this.n1) + parseInt(this.n2);
        },
        resta(){
            this.respuesta=parseInt(this.n1) - parseInt(this.n2);
        },
        multiplicar(){
            this.respuesta=parseInt(this.n1) * parseInt(this.n2);
        },
        dividir(){
          if(this.n2==0){
            alert("No es un número");
          }else{
            this.respuesta=parseInt(this.n1) / parseInt(this.n2);
          }
        }   
    }
}
</script>

<style>

</style>