
import { useContext, useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import UserDetailsForm from './UserDetailsForm';
import filesApi from '../../api/FilesApi';
import statisticsApi from '../../api/StatisticsApi';
import usersApi from '../../api/UsersApi';
import MyHeader from '../../components/basicUi/MyHeader';
import StatisticCircle from '../../components/complex/StatisticCircle';
import './styles.scss';
import { UserContextType, UsersContext, UsersDispatchContext } from '../../context/UserContext';
import { AppUser, Response, UserStatisticsDto } from '../../data/types';
import useAlerts from '../../hooks/useAlerts';
import { initFormSave } from '../../utils/FormInputUtils';

function UserDetails() {
    const { t } = useTranslation();
    const [userStatistics, setUserStatistics] = useState<UserStatisticsDto>();
    const user = useContext(UsersContext);
    const usersDispatchContext = useContext(UsersDispatchContext);
    const alerts = useAlerts();
    const formSave = initFormSave<AppUser>();

    useEffect(() => {
        statisticsApi.getUserStatistics((response: Response<UserStatisticsDto>) => setUserStatistics(response.value));
    }, [user])

    formSave.onSubmit = function (userFormValue: any) {
        if (userFormValue.avatarImage) {
            saveUserAvatar(userFormValue);
        } else {
            editUser(userFormValue);
        }
    }

    formSave.onSuccess = function (response: any) {
        alerts.showSuccessAlert(t("p.userSuccessfullyEdited"));
        usersDispatchContext({
            type: UserContextType.Refresh
        });
    }

    formSave.onError = function () {
        alerts.showErrorAlert(t("p.defaultError"));
    }

    function saveUserAvatar(userFormValue: any) {
        filesApi.saveFile(userFormValue.avatarImage, saveFileResponse => onUserAvatarSaved(userFormValue, saveFileResponse), formSave.onError)
    }

    function onUserAvatarSaved(userFormValue: any, saveFileResponse: any) {
        const PREFIX = "/api/files/";
        userFormValue.avatarImageSrc = PREFIX + saveFileResponse.value.id;
        editUser(userFormValue);
    }

    function editUser(userFormValue: any) {
        usersApi.updateUser(user?.id || "", userFormValue, formSave.onSuccess, formSave.onError);
    }

    return (
        <div className='user-details-page py-5'>
            <div className='mx-auto px-4 pb-4 basic-container basic-container-border'>
                <MyHeader title={t('p.userDetailsHeader')} />
                {renderUserStatistics()}
                <hr />
                <UserDetailsForm formSave={formSave} user={user} />
            </div>
        </div>
    );

    function renderUserStatistics() {
        return userStatistics && (
            <Stack direction="horizontal" gap={5} className='flex-wrap justify-content-center my-5 align-items-start'>
                {renderStatistic('p.createdRecipesCount', userStatistics?.createdRecipesCount)}
                {renderStatistic('p.commentedRecipesCount', userStatistics?.commentedRecipesCount)}
                {renderStatistic('p.ratedRecipesCount', userStatistics?.ratedRecipesCount)}
                {renderStatistic('p.userRecipeCollectionsCount', userStatistics?.userRecipeCollectionsCount)}
                {renderStatistic('p.recipesInUserRecipeCollectionsCount', userStatistics?.recipesInUserRecipeCollectionsCount)}
            </Stack>
        );
    }

    function renderStatistic(label: string, value?: number) {
        return (
            <div className='col-lg-3 col-sm-4 col-8'>
                <StatisticCircle value={String(value)} size={150} ringSize={30} label={t(label)} />
            </div>
        )
    }
}

export default UserDetails;