import plIcon from '../../../assets/images/lang/pl.png';
import enIcon from '../../../assets/images/lang/en.png';
import { setLangEN, setLangPL } from '../../../config/i18n';

function LanguageSelect() {

    return (
        <div className='mx-auto language-select'>
            <img src={plIcon} className='plIcon' onClick={setLangPL} />
            <img src={enIcon} className='enIcon' onClick={setLangEN} />
        </div>
    )
}

export default LanguageSelect;