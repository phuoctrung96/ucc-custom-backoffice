<template>
    <div>
        <b-card no-body style="margin-bottom: 15px; align-items: center;background-color: #EAEAEA">
            <b-card-body style="padding: 0">
                <div
                    v-if="image"
                    style="width: 224px; height: 227px;"
                    class="d-flex flex-center"
                >
                    <img
                        style="height: 112px; width: 180px"
                        class="img-thumbnail"
                        :src="image"
                    />
                </div>
            </b-card-body>
        </b-card>
        <div class="rowSpace">
            <div>
                <p>
                    <router-link :to="to">
                        <p class="mb-5 card-title">{{ name }}</p>
                    </router-link>
                </p>
                <p class="font-size-0-8 mb-5">{{ subject }}</p>
            </div>
            <b-dropdown
                variant="link"
                size="sm"
                class="align-self-start"
                no-caret
            >
                <template #button-content>
                    <fa-icon class="text-secondary" icon="ellipsis-h" />
                </template>
                <b-dropdown-item-button @click="editAction"
                    >Edit</b-dropdown-item-button
                >
                <b-dropdown-item-button @click="deleteAction"
                    >Delete</b-dropdown-item-button
                >
            </b-dropdown>
        </div>
        <span class="font-size-0-8"
            >last update: {{ new Date(updatedAt).toDateString() }}</span
        >
    </div>
</template>

<script>
export default {
    name: 'email-card-component',
    components: {},
    computed: {},
    methods: {},
    props: {
        name: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        updatedAt: {
            type: String,
            required: false
        },
        editAction: {
            type: Function,
            required: true
        },
        deleteAction: {
            type: Function,
            required: true
        },
        to: {
            type: Object,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    }
};
</script>

<style lang="css" scoped>
.card-img-top {
    height: 250px !important;
}
.font-size-0-8 {
    font-size: 12px;
}
.rowSpace {
    display: flex;
    flex: 1;
    justify-content: space-between;
}
.card-title {
    font-size: 12px;
    color: #333333;
    font-weight: 700;
    overflow: hidden !important;
    text-overflow: ellipsis;
}
.mb-5 {
    margin-bottom: 0px !important;
}
.flex-center {
    justify-content: center;
    align-items: center;
}
</style>
