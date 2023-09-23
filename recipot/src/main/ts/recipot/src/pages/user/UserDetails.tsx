
import MyHeader from '../../components/basicUi/MyHeader';
import StatisticCircle from '../../components/complex/StatisticCircle';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import { Stack } from 'react-bootstrap';
import { Response, UserStatisticsDto } from '../../data/types';
import UserDetailsForm from './UserDetailsForm';
import { getEmptyFormSave } from '../../utils/FormInputUtils';
import { useContext, useEffect, useState } from 'react';
import { UsersContext, UsersDispatchContext } from '../../context/UserContext';
import usersApi from '../../api/UsersApi';
import { showErrorAlert, showSuccessAlert } from '../../utils/RestUtils';
import { AlertsDispatchContext } from '../../context/AlertContext';
import statisticsApi from '../../api/StatisticsApi';

function UserDetails() {
    const { t } = useTranslation();
    const user = useContext(UsersContext).user;
    const usersDispatchContext = useContext(UsersDispatchContext);
    const alertsDispatchContext = useContext(AlertsDispatchContext);
    const [userStatistics, setUserStatistics] = useState<UserStatisticsDto>();

    useEffect(() => {
        statisticsApi.getUserStatistics((response: Response<UserStatisticsDto>) => setUserStatistics(response.value));
    }, [user])

    const formSave: any = getEmptyFormSave();
    formSave.onSubmit = function (userFormValue: any) {
        usersApi.updateUser(user?.id || "", userFormValue, formSave.onSuccess, formSave.onError);
    }
    formSave.onSuccess = function (response: any) {
        showSuccessAlert(t("p.userSuccessfullyEdited"), alertsDispatchContext);
        usersDispatchContext(
            { type: "refresh" }
        )
    }
    formSave.onError = function () {
        showErrorAlert(t("p.defaultError"), alertsDispatchContext);
    }

    return (
        <div className='mx-auto my-5 p-4 user-details-page basic-container basic-container-border'>
            <MyHeader title={t('p.userDetailsHeader')}></MyHeader>
            {renderUserStatistics()}
            <hr />
            <UserDetailsForm formSave={formSave} user={user} />
        </div>
    );

    function renderUserStatistics() {
        return userStatistics && (
            <Stack direction="horizontal" gap={5} className='flex-wrap justify-content-center'>
                {renderStatistic('p.createdRecipesCount', userStatistics?.createdRecipesCount)}
                {renderStatistic('p.commentedRecipesCount', userStatistics?.commentedRecipesCount)}
                {renderStatistic('p.ratedRecipesCount', userStatistics?.ratedRecipesCount)}
                {renderStatistic('p.userRecipeCollectionsCount', userStatistics?.userRecipeCollectionsCount)}
                {renderStatistic('p.recipesInUserRecipeCollectionsCount', userStatistics?.recipesInUserRecipeCollectionsCount)}
            </Stack>
        );
    }

    function renderStatistic(label: string, value?: number) {
        return <div className='col-3'><StatisticCircle value={String(value)} size={150} ringSize={30} label={t(label)} /></div>
    }
}

export default UserDetails;