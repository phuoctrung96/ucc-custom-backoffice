import RewardClassesAPI from '../../../api/RewardClassesAPI';
export default {
    addRewardClassPoints(context) {
        new RewardClassesAPI()
            .create(context.getters.getPointsRequestBody)
            .then(resp => {
                console.log('points class added',resp)
            })
            .catch((err) => {
              console.log(err.response)
            });
    },
    getRewardClasses() {
        new RewardClassesAPI()
            .getAll()
            .then(resp => {
                console.log(resp)
            })
            .catch((err) => {
              console.log(err.response)
            });
    },
    deleteRewardClass(classId)
    {
        new RewardClassesAPI()
        .delete(classId)
        .then(resp => {
            console.log(resp)
        })
        .catch((err) => {
          console.log(err.response)
        });

    }
};
