<template>
    <div class="content">
        <Nav />
        <div class="container mt-3">
            <p class="lead text-center">Recent activity</p>
            <Loading :isLoading="loading" />

            <b-row class="justify-content-center">
                <b-col md="10">
                    <b-row>
                        <b-col md="6">
                            <router-link :to="{ name: 'PageBuilder/pages' }">
                                <b-card class="card--page">
                                    <p class="lead card--page--body">
                                        <b class="">{{ numOfPages }}</b>
                                        pages created
                                    </p>
                                </b-card>
                            </router-link>
                        </b-col>
                        <b-col md="6">
                            <router-link :to="{ name: 'PageBuilder/newPage' }">
                                <b-card class="card--page">
                                    <p class="lead card--page--body">
                                        <b class="">{{ numOfTemplates }}</b>
                                        templates available
                                    </p>
                                </b-card>
                            </router-link>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import Loading from '../../components/Loading';
import Nav from './components/nav';

export default {
    name: 'page-builder-home',
    components: { Loading, Nav },
    data: () => ({
        loading: false,
        pages: [],
        templates: []
    }),
    computed: {
        numOfPages() {
            return this.pages.length;
        },
        numOfTemplates() {
            return this.templates.length;
        }
    },
    methods: {
        async getLandingPages() {
            try {
                const { result } = await this.$store.dispatch(
                    'getLandingPages'
                );
                return result.result;
            } catch (error) {
                console.log(error);
            }
        },
        async getLandingPageTemplates() {
            try {
                const { result } = await this.$store.dispatch(
                    'getLandingPageTemplates'
                );

                return result.result;
            } catch (error) {
                console.log(error);
            }
        }
    },
    async mounted() {
        this.loading = true;

        try {
            const pages = await this.getLandingPages();
            if (pages instanceof Array) {
                this.pages = pages;
            } else {
                throw new Error(
                    `Expects ${pages} to be instance of Array but got ${typeof pages} instead`
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.loading = false;
        }

        try {
            const templates = await this.getLandingPageTemplates();

            if (templates instanceof Array) {
                this.templates = templates;
            } else {
                throw new Error(
                    `Expects ${templates} to be instance of Array but got ${typeof templates} instead`
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.loading = false;
        }
    }
};
</script>
