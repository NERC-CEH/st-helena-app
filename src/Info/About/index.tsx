import { Page, Main, Header, Section } from '@flumens';
import './styles.scss';

const { P, H } = Section;

const About = () => (
  <Page id="about">
    <Header title="About" />
    <Main id="about">
      <Section>
        <P>
          iRecord St Helena App enables you to get involved with biological
          recording. Contribute your species sightings with GPS acquired
          coordinates, descriptions and other information, thus providing
          scientists with important new biodiversity information that
          contributes to nature conservation, planning, research and education.
        </P>
      </Section>

      <Section>
        <P>
          Your data will be kept secure and will be regularly backed up.
          Automatic checks will be applied to your observations to help spot
          potential errors, and experts can review your sightings. All wildlife
          sightings for non-sensitive species are shared with other users and
          will be made available to National Recording Schemes and Local Record
          Centres.
          <ul>
            <li>Works fully offline</li>
            <li>
              Record all the wildlife you see - supports St Helena species
            </li>
            <li>Add new records with minimal effort</li>
            <li>Benefit from automatic data checks and review by experts</li>
            <li>Share your sightings with the recording community</li>
            <li>Contribute to science and conservation</li>
          </ul>
          Offered by: St Helena Research Institute
        </P>
      </Section>

      <Section>
        <H>App Development</H>
        <P>
          This app was hand crafted with love by
          <a href="https://flumens.io" style={{ whiteSpace: 'nowrap' }}>
            {' '}
            Flumens.
          </a>{' '}
          Agency specializing in building bespoke data oriented sollutions. For
          suggestions and feedback please do not hesitate to{' '}
          <a href="mailto:apps%40ceh.ac.uk?subject=iRecord%20App">contact us</a>
          .
        </P>
      </Section>
    </Main>
  </Page>
);

export default About;
