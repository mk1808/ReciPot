import enIcon from '../../../assets/images/lang/en.png';
import plIcon from '../../../assets/images/lang/pl.png';
import { setLangEN, setLangPL } from '../../../config/i18n';

function LanguageSelect() {

    return (
        <div className='mx-auto language-select'>
            <img src={plIcon} className='plIcon' alt="plFlag" onClick={setLangPL} />
            <img src={enIcon} className='enIcon' alt="enFlag" onClick={setLangEN} />
        </div>
    )
}

export default LanguageSelect;