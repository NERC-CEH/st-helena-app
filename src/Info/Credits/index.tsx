import { Header, Main, Page, Section } from 'common/flumens';
import { Trans as T } from 'react-i18next';
import cehLogo from './images/cehLogo.png';
import shriLogo from './images/shriLogo.png';
import euLogo from './images/euLogo.jpg';
import BESTLogo from './images/BESTLogo.png';
import plantNetLogo from './images/PlantNetLogo.svg';
import './styles.scss';

const { P, H } = Section;

export default () => (
  <Page id="credits">
    <Header title="Credits" />
    <Main id="credits">
      <div className="sponsors">
        <div className="row">
          <div className="image-wrapper">
            <img src={cehLogo} alt="UK Centre for Ecology & Hydrology" />
          </div>
          <div className="image-wrapper">
            <img src={shriLogo} alt="St Helena Research Institute" />
          </div>
        </div>
        <div className="row">
          <div className="image-wrapper">
            <img src={BESTLogo} alt="" />
          </div>
          <div className="image-wrapper">
            <img src={euLogo} alt="" />
          </div>
        </div>
      </div>

      <Section>
        <p className="logo">
          <img src={plantNetLogo} />
        </p>
        <P>
          The image-based plant species identification service used, is based on
          the Pl@ntNet recognition api, regularly updated and accessible through
          the <a href="https://my.plantnet.org">Pl@ntNet website</a>.
        </P>
      </Section>

      <Section>
        <H>
          We are very grateful for all the people that helped to create this
          app:
        </H>
        <P skipTranslation className="credits">
          <span>
            <b>David Roy</b> (UKCEH)
          </span>
          <span>
            <b>Karolis Kazlauskis</b> (Flumens)
          </span>
          <span>
            <b>Vilius Stankaitis</b> (Flumens)
          </span>
          <span>
            <b>John van Breda</b> (Biodiverse IT)
          </span>
          <span>
            <b>Jim Bacon</b> (UKCEH)
          </span>
          <span>
            <b>Selene Gough</b> (SHRI)
          </span>
          <span>
            <b>Rebecca Cairns-Wicks</b> (SHRI)
          </span>
          <span>
            <b>Roger Key</b>
          </span>
          <span>
            <b>Alan Gray</b> (UKCEH)
          </span>
          <span>
            <b>Timm Karisch</b> (Museum für Naturkunde und Vorgeschichte Dessau)
          </span>
          <span>
            <b>Quentin Cronk</b> (UBC)
          </span>
          <span>
            <b>Liza Fowler</b> (SHNT)
          </span>
          <span>
            <b>Natasha Stevens</b> (SHNT)
          </span>
          <span>
            <b>Vanessa Thomas-Williams</b> (ENRP)
          </span>
          <span>
            <b>Rosalie Peters</b> (ENRP)
          </span>
          <span>
            <b>Julie Balchin</b> (ENRP)
          </span>
          <span>
            <b>Martina Leo</b> (ENRP)
          </span>
          <span>
            <b>Devlin Yon</b> (SHG)
          </span>
          <span>
            <b>Jodie Scipio Constantine</b> (SHG)
          </span>
        </P>
      </Section>
      <Section>
        <P>
          App was funded by <a href="https://www.best2plus.org/">BEST 2.0+</a>.
          The BEST 2.0+ project has received funding from the European Union.
        </P>

        <P>
          This App was produced with the financial support of the European
          Union. Its contents are the sole responsibility of and do not
          necessarily reflect the views of the European Union.
        </P>
      </Section>
      <Section>
        <H skipTranslation>
          <T>Welcome screen credits</T>:
        </H>
        <P skipTranslation className="credits">
          <span>Rebecca Cairns-Wicks</span>
        </P>
      </Section>

      <Section>
        <H>Icons were made by</H>
        <P skipTranslation className="credits">
          Hanna Hickling (St Helena),{' '}
          <a
            href="https://www.flaticon.com/authors/nhor-phai"
            title="Nhor Phai"
          >
            Nhor Phai
          </a>
          ,{' '}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </P>
      </Section>
    </Main>
  </Page>
);
