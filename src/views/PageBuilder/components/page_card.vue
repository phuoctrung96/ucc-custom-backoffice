<template>
    <div>
        <b-card style="height: 600px">
            <b-card-body>
                <div style="height:300px;width:100%;overflow:hidden;">
                    <img
                        style="width:100%;"
                        :src="image"
                        alt="page thumbnail image"
                    />
                </div>
                <div class="d-flex justify-content-end">
                    <b-dropdown
                        variant="outline-secondary"
                        size="sm"
                        text="Actions"
                        class="mb-2"
                        style="margin-left:auto"
                    >
                        <b-dropdown-item-button @click="editAction"
                            >Edit</b-dropdown-item-button
                        >
                        <b-dropdown-item-button @click="deleteAction"
                            >Delete</b-dropdown-item-button
                        >
                        <b-dropdown-item-button
                            v-if="typeOfCard && typeOfCard === 'page'"
                            @click="handlePublishOrUnpublishAction"
                            >{{
                                toPublishOrToUnpublish
                            }}</b-dropdown-item-button
                        >
                    </b-dropdown>
                </div>

                <b-card-title>
                    <router-link :to="to">
                        <div class="card--page--title">{{ name }}</div>
                    </router-link></b-card-title
                >
                <b-card-sub-title class="mb-2">{{ title }}</b-card-sub-title>
                <b-card-text>
                    {{
                        description.length > 50
                            ? description.slice(0, 50) + '...'
                            : description
                    }}
                </b-card-text>
                <b-card-text
                    v-if="status === 'published'"
                    class="d-flex align-items-end justify-content-end"
                >
                    <b-button
                        :href="publishedUrl"
                        target="blank"
                        class="btn-sm"
                        pill
                        variant="outline-brand"
                        >Visit page</b-button
                    ></b-card-text
                >
            </b-card-body>

            <b-card-footer>
                <b-badge
                    v-if="typeOfCard === 'page'"
                    v-b-tooltip.hover
                    :title="
                        status === 'published' && publishedOn
                            ? `Published on:
                    ${new Date(publishedOn).toDateString()}`
                            : null
                    "
                    class="mr-3"
                    pill
                    :variant="statusVariant"
                    >{{ status }}
                </b-badge>

                <span
                    >last update: {{ new Date(updatedAt).toDateString() }}</span
                >
            </b-card-footer>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'page-card-component',
    components: {},
    computed: {
        statusVariant() {
            let variant = '';

            switch (this.status) {
                case 'draft':
                    variant = 'secondary';
                    break;

                case 'published':
                    variant = 'success';
                    break;

                case 'unpublished':
                    variant = 'danger';
                    break;
            }

            return variant;
        },
        toPublishOrToUnpublish() {
            console.log(this.image);
            return this.status === 'draft' || this.status === 'unpublished'
                ? 'Publish'
                : 'Unpublish';
        }
    },
    methods: {
        handlePublishOrUnpublishAction() {
            this.toPublishOrToUnpublish === 'Publish'
                ? this.publishAction()
                : this.unpublishAction();
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        publishedOn: {
            type: String,
            required: false
        },
        publishedUrl: {
            type: String,
            required: false
        },
        status: {
            type: String,
            required: false
        },
        updatedAt: {
            type: String,
            required: false
        },
        to: {
            type: Object,
            required: true
        },
        editAction: {
            type: Function,
            required: true
        },
        deleteAction: {
            type: Function,
            required: true
        },
        publishAction: {
            type: Function,
            required: false
        },
        unpublishAction: {
            type: Function,
            required: false
        },
        typeOfCard: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    }
};
</script>
