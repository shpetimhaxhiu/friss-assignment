import axios from "axios";

const state = {
    formulas: [],
    makes: [],
    models: [],
}
const getters = {
    allFormulas: (state) => state.formulas,
    allMakes: (state) => state.makes,
    allModels: (state) => state.models,
}
const actions = {
    async fetchFormulas({ commit }) {
        const response = await axios.get('http://localhodst:3000/formulas/')
        commit("setFormulas", response.data)
    },
    async addFormula({ commit }, formula) {
        const response = await axios.post('http://localhost:3000/formulas/', formula)
        commit('newFormula', response.data);
    },
    async deleteFormula({ commit }, id) {
        await axios.delete(`http://localhost:3000/formulas/${id}`);
        commit('removeFormula', id);
    },
    async fetchMakes({ commit }) {
        const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
        // console.log(response.data);
        commit("setMakes", response.data.Results);
    },
    async fetchModels({ commit }, id) {
        const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${id}?format=json`)
        commit("setModels", response.data.Results);
    }
}
const mutations = {
    setFormulas: (state, formulas) => (state.formulas = formulas),
    setMakes: (state, makes) => (state.makes = makes),
    setModels: (state, models) => (state.models = models),
    newFormula: (state, formula) => state.formulas.unshift(formula),
    removeFormula: (state, id) => state.formulas = state.formulas.filter(formula => formula.id !== id)
}

export default {
    state,
    getters,
    actions,
    mutations
}