"use strict";

const buildUrl = require("build-url");
const axios = require("axios");
const { Client } = require("@googlemaps/google-maps-services-js");
const googleMapsClient = new Client({});
const googleApiKey = "" // Please set your Google Place API Key here

module.exports = {
	name: "jenosize",
	actions: {
		autocompletePlaces: {
			rest: {
				method: "GET",
				path: "/autocomplete-places",
			},
			params: {
				keyword: { type: "string" },
				sessionToken: { type: "string" },
				googleKey: { type: "string" },
			},
			async handler(ctx) {
				const res = this.getPlaces(
					ctx.params.keyword,
					ctx.params.sessionToken,
					ctx.params.googleKey
				);
				return res;
			},
		},
		restaurants: {
			rest: {
				method: "GET",
				path: "/restaurants",
			},
			params: {
				placeId: { type: "string" },
				sessionToken: { type: "string" },
				googleKey: { type: "string" },
			},
			async handler(ctx) {
				const res = this.getRestaurants(
					ctx.params.placeId,
					ctx.params.sessionToken,
					ctx.params.googleKey
				);
				return res;
			},
		},
	},

	methods: {
		async getPlaces(keyword, sessionToken, googleKey) {
			return await googleMapsClient
				.placeAutocomplete({
					params: {
						key: googleApiKey,
						input: keyword,
						language: "th",
						sessiontoken: sessionToken,
						types: "(cities)",
					},
					timeout: 5000, // milliseconds
				})
				.then((r) => {
					return r.data.predictions;
				})
				.catch((e) => {
					console.log(e.response.data.error_message);
					throw new Error(e.response.data.error_message);
				});
		},
		async getRestaurants(placeId, sessionToken, googleKey) {
			const placeDetail = await this.getPlaceDetails(
				placeId,
				sessionToken,
				googleApiKey
			);
			if (!placeDetail) {
				return [];
			}

			const key = googleApiKey;
			const location = placeDetail.geometry.location;
			const radius = 16000;
			const sensor = false;
			const types = "restaurant";
			const keyword = "fast";

			return await googleMapsClient
				.placesNearby({
					params: {
						key: key,
						location: location,
						radius: radius,
						sensor: sensor,
						types: types,
						keyword: keyword,
					},
					timeout: 5000, // milliseconds
				})
				.then((r) => r.data.results);
		},
		async getPlaceDetails(placeId, sessionToken, googleKey) {
			return await googleMapsClient
				.placeDetails({
					params: {
						key: googleApiKey,
						place_id: placeId,
						fields: ["geometry"],
						sessiontoken: sessionToken,
					},
					timeout: 5000, // milliseconds
				})
				.then((r) => {
					return r.data.result;
				})
				.catch((e) => {
					console.log(e.response.data.error_message);
					throw new Error(e.response.data.error_message);
				});
		},
	},
};
