//import Vue from 'vue';

export default {
    ADD_CLASS_REQUEST_BODY(state, payload) {
        Object.assign(state.addClassRequestBody, payload);
        console.log("request body",state.addClassRequestBody)
    },

};
