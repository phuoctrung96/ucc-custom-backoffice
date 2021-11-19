// import Vue from 'vue';
import LandingPagesAPI from '../../../api/LandingPagesAPI';
// import LeaderboardTransformer from '../../../transformers/LeaderboardTransformer';

export default {
    getAllLandingPages({ commit }) {
        new LandingPagesAPI().getAll({}).then(resp => {
            console.log({ resp });
            commit('SET_LANDING_PAGES', resp.result);
        });
    }
};
