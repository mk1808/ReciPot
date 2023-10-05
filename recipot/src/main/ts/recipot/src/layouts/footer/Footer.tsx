import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';
import { FaCopyright, FaGithub } from 'react-icons/fa6';
import Tooltip from '../../components/basicUi/Tooltip';
import { Stack } from 'react-bootstrap';
import recipotIcon from '../../assets/images/logo2.png';
import './../styles.scss';

function Footer() {
  const { t } = useTranslation();

  function getYear() {
    return new Date().getFullYear();
  }

  return (
    <Card className='footer'>
      <Card.Body>
        <Stack direction='horizontal' className='justify-content-center align-items-center fs-5'>
          {renderCopyright()}
          {renderAuthors()}
        </Stack >
      </Card.Body>
    </Card>
  );

  function renderCopyright() {
    return (
      <>
        <img src={recipotIcon} alt="Recipot logo" height={60} className='recipot-logo' />
        <FaCopyright className='mx-2' />
        {getYear()}
      </>
    )
  }

  function renderAuthors() {
    return (
      <Stack direction='horizontal' className='ms-3'>
        <span className='mx-2'>{t('p.authors')}:</span>
        {renderWithGithubAndTooltip('Monika Kordoń', 'https://github.com/mk1808')}
        <span className='mx-2'>&</span>
        {renderWithGithubAndTooltip('Marek Czopor', 'https://github.com/marqos12')}
      </Stack>
    )
  }

  function renderWithGithubAndTooltip(author: string, gitHubUrl: string) {
    return (
      <a href={gitHubUrl} target='_blank' rel='noreferrer'>
        <Tooltip placement="top" title={t('p.githubProfile')}>
          {author} <FaGithub />
        </Tooltip>
      </a>
    )
  }
}

export default Footer;