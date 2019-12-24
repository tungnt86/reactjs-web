import axios from 'axios';
import ApiConfig from "../configs/api";

export function fetchTrendingRepositories(language) {
    return axios.get(ApiConfig.API_SEARCH_REPOSITORIES, {
        params: {
            sort: "stars",
            order: "desc",
            q: "language:" + language
        }
    }).then(response => response)
        .catch(error => error);
}