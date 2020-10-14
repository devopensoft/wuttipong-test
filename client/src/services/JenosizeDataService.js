import http from "../http-common";

const getAutocomplete = (keyword, sessionToken, googleKey) => {
  const params = new URLSearchParams();
  params.append("keyword", keyword);
  params.append("sessionToken", sessionToken);
  params.append("googleKey", googleKey);
  return http.get("/jenosize/autocomplete-places", {params});
};

const getNearbyRestaruants = (placeId, sessionToken, googleKey) => {
  const params = new URLSearchParams();
  params.append("placeId", placeId);
  params.append("sessionToken", sessionToken);
  params.append("googleKey", googleKey);
  return http.get(`/jenosize/restaurants`, {params});
};

export default {
  getAutocomplete,
  getNearbyRestaruants,
};
