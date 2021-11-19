<template>
    <div class="content">
        <div class="traffic-routes">
            <div class="py-4">
                <h4 class="text-brand">Traffic Routes</h4>
            </div>

            <b-card>
                <div
                    class="d-flex align-items-center py-3"
                    style="padding-left: 40px; padding-right: 30px"
                >
                    <div class="d-flex align-items-center">
                        <span class="text-brand mr-3 flex-grow">Order by</span>
                        <div>
                            <b-form-select
                                @change="sortTrafficRoute"
                                v-model="selectedOrderByOption"
                            >
                                <option selected value="dateCreated">
                                    Date Created
                                </option>
                                <option value="status">Status</option>
                                <option value="utmCampaign">
                                    UTM Campaign
                                </option>
                            </b-form-select>
                        </div>
                    </div>
                    <div class="d-flex align-items-center ml-auto">
                        <router-link :to="{ name: 'AddNewTrafficRoute' }">
                            <div class="mr-5">
                                <b-link
                                    class="mr-3"
                                    @click="refreshTrafficRoutes"
                                >
                                    <img
                                        src="../../../assets/icons/refresh_icon.svg"
                                    />
                                </b-link>
                                <img
                                    src="../../../assets/icons/add_circle_icon.svg"
                                />
                                <span
                                    class="text-brand ml-3"
                                    style="
                                        text-decoration: underline;
                                        font-size: 18px;
                                        line-height: 22px;
                                    "
                                    >Add Route</span
                                >
                            </div>
                        </router-link>
                    </div>
                </div>

                <b-table
                    hover
                    id="traffic-routes"
                    :fields="fieldsForTrafficRoutes"
                    :items="itemsForTrafficRoutes"
                    :per-page="perPageForTrafficRoutes"
                    :current-page="currentPageForTrafficRoutes"
                    caption-top
                    responsive
                    head-variant="light"
                    @row-clicked="handleClickTrafficRoutesTableRow"
                    ref="traffictable"
                >
                    <template v-slot:cell(title)="data">
                        <div class="pl-2">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(shortenedLink)="data">
                        <div
                            class="
                                d-flex
                                justify-content-between
                                align-items-center
                            "
                        >
                            <span class="pt-1"
                                >{{ 'https://' + data.value }}
                            </span>
                            <button
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Copy to cliboard"
                                @click="doCopy('https://' + data.value)"
                                class="btn btn-sm btn-primary-outline"
                            >
                                <img
                                    src="../../../assets/icons/emailtemplates/CopyIcon.svg"
                                />
                            </button>
                        </div>
                    </template>
                    <template v-slot:cell(utmCampaign)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                    <template v-slot:cell(createdAt)="data">
                        <div class="text-center">
                            {{ dayjs(data.value).format('DD/MM/YYYY') }}
                        </div>
                    </template>
                    <template v-slot:cell(redirects)="data">
                        <div class="text-center">
                            {{ data.value }}
                        </div>
                    </template>
                    <template v-slot:cell(status)="data">
                        <div
                            class="
                                d-flex
                                align-items-center
                                justify-content-center
                            "
                        >
                            <div
                                class="status-dot mr-1"
                                v-bind:class="{
                                    published: data.value === 'published',
                                    unpublished: data.value === 'unpublished',
                                    draft: data.value === 'draft',
                                }"
                            ></div>
                            <span class="ml-1">{{ data.value }}</span>
                        </div>
                    </template>
                    <template v-slot:cell(action)="data">
                        <div
                            class="
                                d-flex
                                align-items-center
                                justify-content-end
                            "
                        >
                            <b-link
                                class="action-icon mr-2"
                                @click.prevent="
                                    showChartForRoute(data.item._id)
                                "
                                data-toggle="tooltip"
                                title="Show Chart"
                            >
                                <span class="default">
                                    <svg
                                        id="Livello_1"
                                        data-name="Livello 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 150 150"
                                    >
                                        <g
                                            id="noun_growth_3025764-2"
                                            data-name="noun growth 3025764-2"
                                        >
                                            <g
                                                id="Raggruppa_1052-2"
                                                data-name="Raggruppa 1052-2"
                                            >
                                                <rect
                                                    id="Rettangolo_1524-2"
                                                    data-name="Rettangolo 1524-2"
                                                    x="11.92"
                                                    y="93.52"
                                                    width="25.62"
                                                    height="46.47"
                                                    style="fill: #4d505d"
                                                />
                                                <rect
                                                    id="Rettangolo_1525-2"
                                                    data-name="Rettangolo 1525-2"
                                                    x="53.57"
                                                    y="68.63"
                                                    width="25.62"
                                                    height="71.36"
                                                    style="fill: #4d505d"
                                                />
                                                <path
                                                    id="Tracciato_867-2"
                                                    data-name="Tracciato 867-2"
                                                    d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                    style="fill: #4d505d"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                                <span class="hover">
                                    <svg
                                        id="Livello_1"
                                        data-name="Livello 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 150 150"
                                    >
                                        <g
                                            id="noun_growth_3025764-2"
                                            data-name="noun growth 3025764-2"
                                        >
                                            <g
                                                id="Raggruppa_1052-2"
                                                data-name="Raggruppa 1052-2"
                                            >
                                                <rect
                                                    id="Rettangolo_1524-2"
                                                    data-name="Rettangolo 1524-2"
                                                    x="11.92"
                                                    y="93.52"
                                                    width="25.62"
                                                    height="46.47"
                                                    style="fill: #f49848"
                                                />
                                                <rect
                                                    id="Rettangolo_1525-2"
                                                    data-name="Rettangolo 1525-2"
                                                    x="53.57"
                                                    y="68.63"
                                                    width="25.62"
                                                    height="71.36"
                                                    style="fill: #f49848"
                                                />
                                                <path
                                                    id="Tracciato_867-2"
                                                    data-name="Tracciato 867-2"
                                                    d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                    style="fill: #f49848"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                                <span class="active">
                                    <svg
                                        id="Livello_1"
                                        data-name="Livello 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 150 150"
                                    >
                                        <g
                                            id="noun_growth_3025764-2"
                                            data-name="noun growth 3025764-2"
                                        >
                                            <g
                                                id="Raggruppa_1052-2"
                                                data-name="Raggruppa 1052-2"
                                            >
                                                <rect
                                                    id="Rettangolo_1524-2"
                                                    data-name="Rettangolo 1524-2"
                                                    x="11.92"
                                                    y="93.52"
                                                    width="25.62"
                                                    height="46.47"
                                                    style="fill: #fff"
                                                />
                                                <rect
                                                    id="Rettangolo_1525-2"
                                                    data-name="Rettangolo 1525-2"
                                                    x="53.57"
                                                    y="68.63"
                                                    width="25.62"
                                                    height="71.36"
                                                    style="fill: #fff"
                                                />
                                                <path
                                                    id="Tracciato_867-2"
                                                    data-name="Tracciato 867-2"
                                                    d="M138.08,48.22H120.8v91.87H95.1V48.22H78L108,9.91Z"
                                                    style="fill: #fff"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                            </b-link>

                            <b-link
                                class="action-icon mr-2"
                                @click="editRow(data)"
                                data-toggle="tooltip"
                                title="Edit Row"
                            >
                                <span class="default">
                                    <svg
                                        id="Livello_1"
                                        data-name="Livello 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 150 150"
                                    >
                                        <g
                                            id="Raggruppa_1053"
                                            data-name="Raggruppa 1053"
                                        >
                                            <path
                                                id="Tracciato_767-2"
                                                data-name="Tracciato 767-2"
                                                d="M60.27,113.16l2.57-2.57L39.41,87.09,92.26,34.24a12.48,12.48,0,0,1,17.64,0h0l5.86,5.86a12.48,12.48,0,0,1,0,17.64h0ZM57,116.45a12.34,12.34,0,0,1-8.1,3H32.7a2.1,2.1,0,0,1-2.11-2.11h0V101.05a12.64,12.64,0,0,1,3-8.1Z"
                                                style="
                                                    fill: #4d505d;
                                                    fill-rule: evenodd;
                                                "
                                            />
                                        </g>
                                    </svg>
                                </span>
                                <span class="hover">
                                    <svg
                                        id="Livello_1"
                                        data-name="Livello 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 150 150"
                                    >
                                        <g
                                            id="Raggruppa_1053"
                                            data-name="Raggruppa 1053"
                                        >
                                            <path
                                                id="Tracciato_767-2"
                                                data-name="Tracciato 767-2"
                                                d="M60.27,113.16l2.57-2.57L39.41,87.09,92.26,34.24a12.48,12.48,0,0,1,17.64,0h0l5.86,5.86a12.48,12.48,0,0,1,0,17.64h0ZM57,116.45a12.34,12.34,0,0,1-8.1,3H32.7a2.1,2.1,0,0,1-2.11-2.11h0V101.05a12.64,12.64,0,0,1,3-8.1Z"
                                                style="
                                                    fill: #f49848;
                                                    fill-rule: evenodd;
                                                "
                                            />
                                        </g>
                                    </svg>
                                </span>
                                <span class="active">
                                    <svg
                                        id="Livello_1"
                                        data-name="Livello 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 150 150"
                                    >
                                        <g
                                            id="Raggruppa_1053"
                                            data-name="Raggruppa 1053"
                                        >
                                            <path
                                                id="Tracciato_767-2"
                                                data-name="Tracciato 767-2"
                                                d="M60.27,113.16l2.57-2.57L39.41,87.09,92.26,34.24a12.48,12.48,0,0,1,17.64,0h0l5.86,5.86a12.48,12.48,0,0,1,0,17.64h0ZM57,116.45a12.34,12.34,0,0,1-8.1,3H32.7a2.1,2.1,0,0,1-2.11-2.11h0V101.05a12.64,12.64,0,0,1,3-8.1Z"
                                                style="
                                                    fill: #fff;
                                                    fill-rule: evenodd;
                                                "
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </b-link>

                            <b-link
                                class="action-icon mr-2"
                                @click="removeRow(data)"
                                data-toggle="tooltip"
                                title="Delete Route"
                            >
                                <span class="default">
                                    <svg
                                        id="Livello_1"
                                        data-name="Livello 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 150 150"
                                    >
                                        <g
                                            id="Raggruppa_1054"
                                            data-name="Raggruppa 1054"
                                        >
                                            <path
                                                id="Tracciato_763-2"
                                                data-name="Tracciato 763-2"
                                                d="M112.11,30.15H88a9.69,9.69,0,0,0-9.6-9.68H71.94a9.69,9.69,0,0,0-9.67,9.68H38.18a9.69,9.69,0,0,0-9.68,9.6v1.41A1.81,1.81,0,0,0,30.29,43h89.37a1.81,1.81,0,0,0,1.83-1.79V39.75a9.27,9.27,0,0,0-8.95-9.59Z"
                                                style="fill: #4d505d"
                                            />
                                            <path
                                                id="Tracciato_764-2"
                                                data-name="Tracciato 764-2"
                                                d="M36.73,119.85a9.75,9.75,0,0,0,9.68,9.68h57.77a9.75,9.75,0,0,0,9.68-9.68V49.43H36.73Zm47-48.77A4.33,4.33,0,0,1,88,66.73h0a4.38,4.38,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,88,112h0a4.38,4.38,0,0,1-4.34-4.35Zm-25.54,0a4.34,4.34,0,0,1,4.34-4.35h0a4.39,4.39,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,62.5,112h0a4.4,4.4,0,0,1-4.35-4.35Z"
                                                style="fill: #4d505d"
                                            />
                                        </g>
                                    </svg>
                                </span>
                                <span class="hover">
                                    <svg
                                        id="Livello_1"
                                        data-name="Livello 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 150 150"
                                    >
                                        <g
                                            id="Raggruppa_1054"
                                            data-name="Raggruppa 1054"
                                        >
                                            <path
                                                id="Tracciato_763-2"
                                                data-name="Tracciato 763-2"
                                                d="M112.11,30.15H88a9.69,9.69,0,0,0-9.6-9.68H71.94a9.69,9.69,0,0,0-9.67,9.68H38.18a9.69,9.69,0,0,0-9.68,9.6v1.41A1.81,1.81,0,0,0,30.29,43h89.37a1.81,1.81,0,0,0,1.83-1.79V39.75a9.27,9.27,0,0,0-8.95-9.59Z"
                                                style="fill: #f49848"
                                            />
                                            <path
                                                id="Tracciato_764-2"
                                                data-name="Tracciato 764-2"
                                                d="M36.73,119.85a9.75,9.75,0,0,0,9.68,9.68h57.77a9.75,9.75,0,0,0,9.68-9.68V49.43H36.73Zm47-48.77A4.33,4.33,0,0,1,88,66.73h0a4.38,4.38,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,88,112h0a4.38,4.38,0,0,1-4.34-4.35Zm-25.54,0a4.34,4.34,0,0,1,4.34-4.35h0a4.39,4.39,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,62.5,112h0a4.4,4.4,0,0,1-4.35-4.35Z"
                                                style="fill: #f49848"
                                            />
                                        </g>
                                    </svg>
                                </span>
                                <span class="active">
                                    <svg
                                        id="Livello_1"
                                        data-name="Livello 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 150 150"
                                    >
                                        <g
                                            id="Raggruppa_1054"
                                            data-name="Raggruppa 1054"
                                        >
                                            <path
                                                id="Tracciato_763-2"
                                                data-name="Tracciato 763-2"
                                                d="M112.11,30.15H88a9.69,9.69,0,0,0-9.6-9.68H71.94a9.69,9.69,0,0,0-9.67,9.68H38.18a9.69,9.69,0,0,0-9.68,9.6v1.41A1.81,1.81,0,0,0,30.29,43h89.37a1.81,1.81,0,0,0,1.83-1.79V39.75a9.27,9.27,0,0,0-8.95-9.59Z"
                                                style="fill: #fff"
                                            />
                                            <path
                                                id="Tracciato_764-2"
                                                data-name="Tracciato 764-2"
                                                d="M36.73,119.85a9.75,9.75,0,0,0,9.68,9.68h57.77a9.75,9.75,0,0,0,9.68-9.68V49.43H36.73Zm47-48.77A4.33,4.33,0,0,1,88,66.73h0a4.38,4.38,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,88,112h0a4.38,4.38,0,0,1-4.34-4.35Zm-25.54,0a4.34,4.34,0,0,1,4.34-4.35h0a4.39,4.39,0,0,1,4.35,4.35v36.57A4.35,4.35,0,0,1,62.5,112h0a4.4,4.4,0,0,1-4.35-4.35Z"
                                                style="fill: #fff"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </b-link>

                            <b-btn
                                variant="outline-brand"
                                @click="publishOrUnpublishRoute(data)"
                                style="width: 120px"
                            >
                                {{
                                    data.item.status === 'published'
                                        ? 'Unpublish'
                                        : 'Publish'
                                }}
                            </b-btn>
                        </div>
                    </template>
                </b-table>
                <div class="d-flex align-items-center justify-content-end pr-3 pl-3 border-top">
                    <div class="mr-3">
                        <span class="mr-3">Rows per page: </span>
                        <b-form-select
                            v-model="perPageForTrafficRoutes"
                            :options="rowsPerPageOptions"
                            style="width: 80px; height: 35px"
                        >
                        </b-form-select>
                    </div>

                    <b-pagination
                        v-model="currentPageForTrafficRoutes"
                        aria-controls="traffic-routes"
                        align="right"
                        :total-rows="
                            itemsForTrafficRoutes
                                ? itemsForTrafficRoutes.length
                                : 0
                        "
                        :per-page="perPageForTrafficRoutes"
                    ></b-pagination>
                </div>
            </b-card>
        </div>

        <div
            class="recent-redirects"
            v-bind:class="{
                hide: isShowRecentRedirectsTable === false,
                show: isShowRecentRedirectsTable === true,
            }"
        >
            <div class="py-4">
                <h4 class="text-brand">Recent Redirects</h4>
            </div>

            <b-card>
                <b-table
                    hover
                    id="recent-redirects"
                    :fields="fieldsForRecentRedirects"
                    :items="itemsForRecentRedirects"
                    :per-page="perPageForRecentRedirects"
                    :current-page="currentPageForRecentRedirects"
                    caption-top
                    responsive
                    head-variant="light"
                    ref="redirectstable"
                >
                    <template v-slot:cell(date)="data">
                        <div class="text-center">
                            {{
                                `${data.item.day}/${data.item.month}/${data.item.year} ${data.item.hour}:00`
                            }}
                        </div>
                    </template>
                    <template v-slot:cell(destinationUrl)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                    <template v-slot:cell(IPaddress)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                    <template v-slot:cell(publicIpCity)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                    <template v-slot:cell(browserName)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                    <template v-slot:cell(osName)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                    <template v-slot:cell(deviceModel)="data">
                        <div class="text-center">
                            {{ data.value || '-' }}
                        </div>
                    </template>
                </b-table>
            </b-card>
            <b-pagination
                v-model="currentPageForRecentRedirects"
                aria-controls="recent-redirects"
                align="right"
                :total-rows="recentRedirectsTotalLength"
                :per-page="perPageForRecentRedirects"
            ></b-pagination>
        </div>

        <b-card class="py-4 mt-3" v-if="isShowCharts">
            <div class="container">
                <div class="d-flex justify-content-between mb-5">
                    <div>
                        <span class="mr-2">Period:</span>
                        <date-range-picker
                            ref="picker"
                            :opens="open"
                            :locale-data="{
                                firstDay: 1,
                                format: 'dd/mm/yyyy',
                            }"
                            :showDropdowns="showDropdowns"
                            v-model="dateRange"
                            :linkedCalendars="linkedCalendars"
                            :dateFormat="dateFormat"
                        >
                        </date-range-picker>
                    </div>
                    <b-button type="button" variant="brand" @click="closeCharts"
                        >Close</b-button
                    >
                </div>
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <PieChart
                            v-if="browserDatasets"
                            :data="browserDatasets"
                            :options="options"
                        />
                    </div>
                    <div class="col-md-6 mb-2">
                        <LineChart
                            v-if="cityDatasets"
                            :data="cityDatasets"
                            :options="options"
                        />
                    </div>
                    <div class="col-md-6 mb-2">
                        <Doughnut
                            v-if="countryDatasets"
                            :data="countryDatasets"
                            :options="options"
                        />
                    </div>
                    <div class="col-md-6 mb-2">
                        <BarChart
                            v-if="monthDatasets"
                            :data="monthDatasets"
                            :options="options"
                        />
                    </div>
                </div>
            </div>
        </b-card>

        <DeleteConfirmModal
            :trafficRoute="selectedTrafficRoute"
            @confirm="confirmDeleteTrafficRoute"
        />
    </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

import dayjs from 'dayjs';

import DeleteConfirmModal from './DeleteConfirmModal.vue';
import { mapGetters } from 'vuex';
import TrafficRoutesAPI from '../../../api/TrafficRoutesAPI';
import BarChart from './charts/Bar';
import LineChart from './charts/Line';
import PieChart from './charts/Pie';
import Doughnut from './charts/Doughnut';

import _ from 'lodash';
import { submitTrackingEvent } from '../../../services/TrackingService';

export default {
    name: 'traffic-routes-table',
    components: {
        DeleteConfirmModal,
        BarChart,
        LineChart,
        PieChart,
        Doughnut,
        DateRangePicker,
    },
    data: () => ({
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
        isShowCharts: false,
        browserDatasets: null,
        cityDatasets: null,
        countryDatasets: null,
        monthDatasets: null,
        selectedOrderByOption: 'dateCreated',
        selectedTrafficRoute: null,
        isShowRecentRedirectsTable: false,
        perPageForTrafficRoutes: 5,
        rowsPerPageOptions: [
            {value: 5, text: '5'},
            {value: 10, text: '10'},
            {value: 15, text: '15'},
            {value: 20, text: '20'},
            {value: 50, text: '50'},
            {value: 100, text: '100'}
        ],
        currentPageForTrafficRoutes: 1,
        fieldsForTrafficRoutes: [
            {
                key: 'title',
                sortable: false,
                label: 'TITLE',
                thStyle: { paddingLeft: '40px' },
            },
            {
                key: 'shortenedLink',
                sortable: false,
                label: 'SHORTENED LINK',
                thStyle: { textAlign: 'center' },
            },
            {
                key: 'utmCampaign',
                sortable: false,
                label: 'UTM CAMPAIGN',
                thStyle: { textAlign: 'center' },
            },
            {
                key: 'createdAt',
                sortable: false,
                label: 'DATE CREATED',
                thStyle: { textAlign: 'center' },
            },
            {
                key: 'redirects',
                sortable: false,
                label: 'REDIRECTS',
                thStyle: { textAlign: 'center' },
            },
            {
                key: 'status',
                sortable: false,
                label: 'STATUS',
                thStyle: { textAlign: 'center' },
            },
            { key: 'action', label: '' },
        ],
        perPageForRecentRedirects: 5,
        currentPageForRecentRedirects: 1,
        fieldsForRecentRedirects: [
            {
                key: 'date',
                sortable: false,
                label: 'DATE',
                thStyle: { paddingLeft: '40px' },
            },
            {
                key: 'destinationUrl',
                sortable: false,
                label: 'DESTINATION URL',
                thStyle: { textAlign: 'center' },
            },
            {
                key: 'IPaddress',
                sortable: false,
                label: 'IP ADDRESS',
                thStyle: { textAlign: 'center' },
            },
            {
                key: 'publicIpCity',
                sortable: false,
                label: 'CITY',
                thStyle: { textAlign: 'center' },
            },
            {
                key: 'browserName',
                sortable: false,
                label: 'BROWSER',
                thStyle: { textAlign: 'center' },
            },
            {
                key: 'osName',
                sortable: false,
                label: 'OS',
                thStyle: { textAlign: 'center' },
            },
            {
                key: 'deviceModel',
                sortable: false,
                label: 'DEVICE',
                thStyle: { textAlign: 'center' },
            },
        ],
        itemsForRecentRedirects: [],
        recentRedirectsTotalLength: 0,
        open: 'right',
        showDropdowns: true,
        linkedCalendars: true,
        selectedChartId: '',
    }),
    methods: {
        handleClickTrafficRoutesTableRow(item) {
            const routeId = item._id;
            this.selectedTrafficRoute = item;
            this.getChartData(routeId);
            this.getRedirectsData(routeId);
            for (var i = 0; i < this.itemsForTrafficRoutes.length; i++) {
                this.itemsForTrafficRoutes[i]._rowVariant = '';
            }
            item._rowVariant = 'active';

            this.isShowRecentRedirectsTable = true;
            this.isShowCharts = true;
            this.$refs.traffictable.refresh();
        },
        refreshTrafficRoutes() {
            this.$store.dispatch('getAllTrafficRoutes', {
                sort_by: this.selectedOrderByOption,
            });
            this.currentPageForTrafficRoutes = 1;
        },
        async publishOrUnpublishRoute(data) {
            const route = this.findRouteById(data.item._id);
            this.selectedTrafficRoute = route;

            if (data.item.status === 'published') {
                await this.$store
                    .dispatch(
                        'unpublishTrafficRoute',
                        this.selectedTrafficRoute._id
                    )
                    .then(() => {
                        // Send Tracking Event With UCC SDK
                        submitTrackingEvent(
                            'TRAFFIC-ROUTE-UNPUBLISHED',
                            { trafficRouteId: this.selectedTrafficRoute._id },
                            this.$store.getters['customerData']
                        );
                        this.$store.dispatch('getAllTrafficRoutes', {
                            sort_by: this.selectedOrderByOption,
                        })
                    });
            } else {
                await this.$store
                    .dispatch(
                        'publishTrafficRoute',
                        this.selectedTrafficRoute._id
                    )
                    .then(() => {
                        // Send Tracking Event With UCC SDK
                        submitTrackingEvent(
                            'TRAFFIC-ROUTE-PUBLISHED',
                            { trafficRouteId: this.selectedTrafficRoute._id },
                            this.$store.getters['customerData']
                        );
                        this.$store.dispatch('getAllTrafficRoutes', {
                            sort_by: this.selectedOrderByOption,
                        })
                    });
            }
        },
        showChartForRoute(id) {
            this.isShowCharts = true;
            this.isShowRecentRedirectsTable = false;

            if (this.isShowCharts && this.selectedChartId === id) {
                this.closeCharts();
                this.selectedChartId = '';
                return;
            }
            this.selectedChartId = id;

            const routeId = id;
            this.getChartData(routeId);
        },
        closeCharts() {
            this.isShowCharts = false;
        },
        findRouteById(id) {
            return this.itemsForTrafficRoutes.find((item) => item._id === id);
        },
        doCopy(text) {
            this.$copyText(text).then(
                () => {
                    this.$notify({
                        title: 'Copied',
                        type: 'success',
                    });
                },
                () => {
                    alert('Can not copy');
                }
            );
        },
        editRow(data) {
            const route = this.findRouteById(data.item._id);
            this.selectedTrafficRoute = route;
            this.$store.commit('SET_TRAFFICROUTE', this.selectedTrafficRoute);
            this.$router.push({
                name: 'EditTrafficRoute',
                params: { id: this.selectedTrafficRoute._id },
            });
        },
        removeRow(data) {
            const route = this.findRouteById(data.item._id);
            this.selectedTrafficRoute = route;
            this.$bvModal.show('delete-confirm-modal');
        },
        confirmDeleteTrafficRoute(value) {
            if (value) {
                this.itemsForTrafficRoutes = this.itemsForTrafficRoutes.filter(
                    (item) => item._id !== this.selectedTrafficRoute._id
                );
                this.isShowRecentRedirectsTable = false;
            }
        },
        stringToHslColor(str, s, l) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }

            const h = hash % 360;
            return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
        },
        async getChartData(routeId) {
            try {
                const { data } = await new TrafficRoutesAPI().getChartData(
                    routeId
                );

                const browserLabels = data['browser'].map((b) => b.browserName);
                const browserRedirects = data['browser'].map(
                    (b) => b.redirects
                );

                const cityLabels = data['city'].map((c) => c.publicIpCity);
                const cityRedirects = data['city'].map((c) => c.redirects);

                const countryLabels = data['country'].map(
                    (c) => c.publicIpCountry
                );
                const countryRedirects = data['country'].map(
                    (c) => c.redirects
                );

                const monthLabels = data['day'].map((c) => {
                    const today = new Date(c.year, c.month, c.day);
                    return today.toLocaleString('default', { month: 'long' });
                });
                const monthRedirects = data['day'].map((c) => c.redirects);

                const bgColor = [
                    '#FF8373',
                    '#A3A0FB',
                    '#55D8FE',
                    '#FFDA83',
                    '#FFA177',
                    '#39CB89',
                ];

                const browserDatasets = {
                    labels: browserLabels,
                    datasets: [
                        {
                            label: 'Browsers x Redirects',
                            data: browserRedirects,
                            backgroundColor: bgColor,
                            borderColor: bgColor,
                            borderWidth: 1,
                        },
                    ],
                };

                const cityDatasets = {
                    labels: cityLabels,
                    datasets: [
                        {
                            label: 'Cities x Redirects',
                            data: cityRedirects,
                            backgroundColor: bgColor,
                            borderColor: bgColor,
                            borderWidth: 1,
                        },
                    ],
                };

                const countryDatasets = {
                    labels: countryLabels,
                    datasets: [
                        {
                            label: 'Countries x Redirects',
                            data: countryRedirects,
                            backgroundColor: bgColor,
                            borderColor: bgColor,
                            borderWidth: 1,
                        },
                    ],
                };

                const monthDatasets = {
                    labels: _.uniq(monthLabels),
                    datasets: [
                        {
                            label: 'Month x Redirects',
                            data: monthRedirects,
                            backgroundColor: bgColor,
                            borderColor: bgColor,
                            borderWidth: 1,
                        },
                    ],
                };

                this.browserDatasets = browserDatasets;
                this.cityDatasets = cityDatasets;
                this.countryDatasets = countryDatasets;
                this.monthDatasets = monthDatasets;
            } catch (error) {
                throw new Error(error);
            }
        },
        async recentRedirectsPageChange(page) {
            await new TrafficRoutesAPI()
                .getRedirectsData(
                    this.selectedTrafficRoute._id,
                    this.perPageForRecentRedirects,
                    (page - 1) * this.perPageForRecentRedirects
                )
                .then((response) => {
                    this.itemsForRecentRedirects = response.data.data;
                    this.$refs.redirectstable.refresh();
                })
                .catch((err) => {});
        },
        async getRedirectsData(routeId) {
            try {
                const { data } = await new TrafficRoutesAPI().getRedirectsData(
                    routeId
                );
                this.recentRedirectsTotalLength = data.total;
                this.itemsForRecentRedirects = data.data;
            } catch (error) {
                throw new Error(error);
            }
        },
        dateFormat(classes, date) {
            if (!classes.disabled) {
                classes.disabled = date.getTime() < new Date();
            }
            return classes;
        },
        dayjs(...args) {
            return dayjs(...args);
        },
        sortTrafficRoute() {
            this.$store.dispatch('getAllTrafficRoutes', {
                sort_by: this.selectedOrderByOption,
            });
        },
    },
    async created() {
        this.$store.dispatch('getAllTrafficRoutes', {
            sort_by: this.selectedOrderByOption,
        });
    },
    computed: {
        ...mapGetters(['getAllTrafficRoutes']),
        itemsForTrafficRoutesLength() {
            const trafficRoutes = JSON.parse(
                JSON.stringify(this.getAllTrafficRoutes)
            );
            return trafficRoutes.length;
        },
        itemsForTrafficRoutes: {
            get: function () {
                return JSON.parse(JSON.stringify(this.getAllTrafficRoutes));
            },
            set: function (newValue) {},
        },
        dateRange() {
            const date = new Date();
            const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
            const endDate = new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                0
            );
            return { startDate, endDate };
        },
    },
    watch: {
        currentPageForRecentRedirects(page) {
            this.recentRedirectsPageChange(page);
        },
    },
};
</script>

<style lang="scss" scoped>
.disable--pointer {
    cursor: not-allowed !important;
}

.card {
    margin-bottom: 10px;
}

.card-body {
    padding: 0;
}

.hide {
    display: none;
}

.show {
    display: block;
}

.first-cell-overflow {
    padding-left: 27px;
}

.status-dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
}

.published {
    background: #9fe364 0% 0% no-repeat padding-box;
}

.unpublished {
    background: #c6c6c6 0% 0% no-repeat padding-box;
}

.draft {
    border: 1px solid #707070;
}

table {
    tbody {
        tr {
            .action-icon {
                width: 23px;
                .default {
                    display: block;
                }
                .hover,
                .active {
                    display: none;
                }
            }
            .action-icon:hover {
                .default,
                .active {
                    display: none;
                }
                .hover {
                    display: block;
                }
            }
            &.table-active {
                .action-icon {
                    .active {
                        display: block;
                    }
                    .default,
                    .hover {
                        display: none;
                    }
                }
            }
        }
    }
}

::v-deep {
    .b-dropdown {
        width: 226px;
    }

    .btn-outline-primary.dropdown-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
        box-shadow: none;
    }

    .btn-outline-primary:not(:disabled):not(.disabled):active {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .show > .btn-outline-primary.dropdown-toggle {
        color: #4e505d;
        background-color: #ffffff;
        border-color: #2f3380;
    }

    .dropdown-menu {
        padding: 0;
    }

    .dropdown-item {
        color: #4d4f5c !important;
        padding: 0.5rem 1.5rem;
        border-bottom: 1px solid #e9e9f0;
    }

    .dropdown-item:active {
        color: #ffffff !important;
        background-color: #2f3380;
    }
    .pagination.b-pagination {
        float: none;
    }
    .daterangepicker {
        .calendars {
            flex-wrap: nowrap;
        }
    }
}
</style>
