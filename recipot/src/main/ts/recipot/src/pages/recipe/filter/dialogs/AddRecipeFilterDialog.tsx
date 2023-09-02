import { useReducer, useRef, useState } from "react";
import CustomModal from "../../../../components/basicUi/CustomModal";
import MyInput from "../../../../components/basicUi/MyInput";
import { checkIfAllValid, checkInputValidity, getEmptyForm, getEmptyFormSave, getNewState, inputAttributes, preventFurtherAction } from "../../../../utils/FormInputUtils";
import { Form } from "react-bootstrap";
import { FormSave, MyForm } from "../../../../data/utilTypes";
import { useTranslation } from "react-i18next";
import AddRecipeFilterForm from "./AddRecipeFilterForm";

function AddRecipeFilterDialog({ showModal, handleClose }: { showModal: boolean, handleClose: any }) {
    const { t } = useTranslation();
    const formSave: FormSave = getEmptyFormSave();
    let formValue1: any;
    const form = useRef<any>();
    let btn1: any;
    let form1: any;
    formSave.onSubmit = function (formValue: any) {
        formValue1 = formValue;
        //zapytanie do backendu 
        console.log("torest")
    }
    formSave.onSuccess = function () {

    }
    formSave.onError = function () {

    }
    function afterCLick() {
        console.log("afterCLick")
    }
    async function myHandleSubmit() {
        form.current.submifForm();

        /*handleClose();
        //   debugger;
        console.log("form dial")
        console.log(formValue1)
        console.log("ciag dalszy")
        console.log(btn1);
        form1[1].click();

        setTimeout(() => { console.log(formValue1) }, 3000)
        //console.log(val)

        //  btn1.click();
*/
    }

    function chnaged(btn: any, form: any) {
        btn1 = btn;
        form1 = form;
    }

    return (
        <CustomModal shouldShow={showModal} handleClose={handleClose} title={'p.recipeFilterSave'}
            handleSubmit={myHandleSubmit} >
            {renderContent()}
        </CustomModal>
    );

    function renderContent() {
        return (
            <>
                <span>{t('p.recipeFilterSaveInfo')}</span>
                <AddRecipeFilterForm formSave={formSave} chnaged={chnaged} ref={form}></AddRecipeFilterForm>
            </>
        )
    }





}

export default AddRecipeFilterDialog;