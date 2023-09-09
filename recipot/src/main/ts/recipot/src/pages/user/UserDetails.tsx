
import MyHeader from '../../components/basicUi/MyHeader';
import StatisticCircle from '../../components/complex/StatisticCircle';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import { Stack } from 'react-bootstrap';
import { UserStatisticsDto } from '../../data/types';
import UserDetailsForm from './UserDetailsForm';
import { FormSave } from '../../data/utilTypes';
import { getEmptyFormSave } from '../../utils/FormInputUtils';
import { useContext, useEffect } from 'react';
import { UsersContext, UsersDispatchContext } from '../../context/UserContext';

function UserDetails() {
    const { t } = useTranslation();
    const user = useContext(UsersContext).user;
    const usersDispatchContext = useContext(UsersDispatchContext);
    const userStatistics: UserStatisticsDto = {
        commentedRecipesCount: 12,
        createdRecipesCount: 20,
        ratedRecipesCount: 40,
        recipesInUserRecipeCollectionsCount: 55,
        userRecipeCollectionsCount: 18
    };

    const formSave: FormSave = getEmptyFormSave();
    formSave.onSubmit = function (userFormValue: any) {
        console.log(userFormValue)
    }
    formSave.onSuccess = function () {
        usersDispatchContext(
            { type: "refresh" }
        )
    }
    formSave.onError = function () {

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
        return (
            <Stack direction="horizontal" gap={5} className='flex-wrap justify-content-center'>
                {renderStatistic(userStatistics.createdRecipesCount, 'p.createdRecipesCount')}
                {renderStatistic(userStatistics.commentedRecipesCount, 'p.commentedRecipesCount')}
                {renderStatistic(userStatistics.ratedRecipesCount, 'p.ratedRecipesCount')}
                {renderStatistic(userStatistics.userRecipeCollectionsCount, 'p.userRecipeCollectionsCount')}
                {renderStatistic(userStatistics.recipesInUserRecipeCollectionsCount, 'p.recipesInUserRecipeCollectionsCount')}
            </Stack>
        );
    }

    function renderStatistic(value: number, label: string) {
        return <div className='col-3'><StatisticCircle value={String(value)} size={150} ringSize={30} label={t(label)} /></div>
    }
}

export default UserDetails;