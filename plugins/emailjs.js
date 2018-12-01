import Vue from 'vue';
import {init, send} from 'emailjs-com';

init("user_jE0c6kVZb9tPJm89jqCMF");

Vue.prototype.$email = send;