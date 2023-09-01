import { useReducer, useState } from "react";
import CustomModal from "../../../../components/basicUi/CustomModal";
import MyInput from "../../../../components/basicUi/MyInput";
import { checkIfAllValid, checkInputValidity, getEmptyForm, getEmptyFormSave, getNewState, inputAttributes, preventFurtherAction } from "../../../../utils/FormInputUtils";
import { Form } from "react-bootstrap";
import { FormSave, MyForm } from "../../../../data/utilTypes";
import { useTranslation } from "react-i18next";

function AddRecipeFilterDialog({ showModal, handleClose }: { showModal: boolean, handleClose: any }) {
    const { t } = useTranslation();
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, getEmptyForm());
    const formSave: FormSave = getEmptyFormSave();

    formSave.onSubmit = function (formValue: any) {
        console.log(formValue)
    }

    formSave.onSuccess = function () {

    }

    formSave.onError = function () {

    }
    function handleSubmit(event: any) {
        const form = myForm;
        console.log(form)

        if (checkIfAllValid(event, myForm)) {
            formSave.onSubmit(myForm.formValue);
            console.log('valid')
        } else {
            console.log('invalid')
        }
        preventFurtherAction(event);
    };

    function formReducer(state: any, action: any) {
        return getNewState(state, action, action.value, checkInputValidity);
    };

    function myHandleSubmit() {
        handleClose();
        console.log("ciag dalszy")
    }
    return (
        <CustomModal shouldShow={showModal} handleClose={handleClose} handleSubmit={myHandleSubmit} title={'p.recipeFilterSave'}>
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return (
            <>
            <>Zapisanie filtra umożliwia łatwy dostęp do wyfiltrowanych przepisów w przyszłości.</>
                {renderForm()}
            </>
        )
    }

    function renderFilterNameInput() {
        return (
            <MyInput
                {...inputAttributes("newFilterName", myForm, dispatchForm)}
                placeholder={t('p.newFilterNameInput')}
                label={t('p.newFilterNameInput')}
                required
            />
        )
    }

    function renderForm() {
        return (
            <Form noValidate validated={true} onSubmit={handleSubmit} className="mt-3 text-start">
                {renderFilterNameInput()}

            </Form>
        )
    }

}

export default AddRecipeFilterDialog;