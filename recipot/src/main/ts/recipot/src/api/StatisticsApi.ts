import restClient from "./RestClient";
import { GeneralStatisticsDto, Response, UserStatisticsDto } from "../data/types";

function StatisticsApi() {
    const PREFIX = '/statistics';

    const getGeneralStatistics = (onSuccess: (response: Response<GeneralStatisticsDto>) => any, onError?: (response: Response<GeneralStatisticsDto>) => any) => {
        restClient.get(`${PREFIX}/general`, onSuccess, onError)
    }
    const getUserStatistics = (onSuccess: (response: Response<UserStatisticsDto>) => any, onError?: (response: Response<UserStatisticsDto>) => any) => {
        restClient.get(`${PREFIX}/user`, onSuccess, onError)
    }

    return { getGeneralStatistics, getUserStatistics }
}

const statisticsApi = StatisticsApi();
export default statisticsApi;