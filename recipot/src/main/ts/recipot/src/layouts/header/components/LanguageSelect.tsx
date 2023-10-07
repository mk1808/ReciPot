import plIcon from '../../../assets/images/lang/pl.png';
import enIcon from '../../../assets/images/lang/en.png';
import { useLangEN, useLangPL } from '../../../config/i18n';

function LanguageSelect() {

    return (
        <div className='mx-auto language-select'>
            <img src={plIcon} className='plIcon' onClick={useLangPL} />
            <img src={enIcon} className='enIcon' onClick={useLangEN} />
        </div>
    )
}

export default LanguageSelect;