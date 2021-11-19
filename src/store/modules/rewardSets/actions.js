import RewardSetsAPI from '../../../api/RewardSetsAPI';
export default {
    getRewardSets() {
        new RewardSetsAPI()
            .getAll()
            .then(resp => {
                console.log(resp)
            })
            .catch((err) => {
              console.log(err.response)
            });
    },
    deleteRewardSets(setId)
    {
        new RewardSetsAPI()
        .delete(setId)
        .then(resp => {
            console.log(resp)
        })
        .catch((err) => {
          console.log(err.response)
        });

    }
};
