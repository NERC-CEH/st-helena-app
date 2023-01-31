/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-unresolved */
import Image from '../../src/common/models/media';
import Sample from '../../src/common/models/sample';
import Occurrence from '../../src/common/models/occurrence';
import defaultConfig from '../../src/Survey/Default/config';
import defaultComplexConfig from '../../src/Survey/List/config';
import savedRecords from '../../src/common/models/savedSamples';
import images from './images.json';

const location = {
  accuracy: 1,
  latitude: -15.92566,
  longitude: -5.71913,
  source: 'map',
  name: 'Ruperts',
};

// @ts-ignore
async function makeSample(taxon, img) {
  const sample = await defaultConfig.create(Sample, Occurrence, taxon);

  sample.stopGPS();
  sample.attrs.location = { ...location };

  const [occ] = sample.occurrences;
  occ.attrs.stage = 'Adult';
  occ.attrs.number = '2-5';

  if (img) {
    const image = new Image({
      attrs: {
        data: img,
        thumbnail: img,
        type: 'jpg',
      },
    });
    occ.media.push(image);
  }

  await sample.save();

  savedRecords.push(sample);
  return sample;
}

/**
 * A helper util to set up dummy records for capturing screenshots.
 */
async function createSamples() {
  makeSample(
    {
      taxon: {
        array_id: 12186,
        common_names: ['10-spot Ladybird'],
        found_in_name: 'common_name',
        group: 27,
        scientific_name: 'Lathyrus tuberosus',
        species_id: 3,
        synonym: 'Fyfield Pea',
        warehouse_id: 113813,
      },
    },
    images.ladybird
  );
  let sample = await defaultComplexConfig.create(Sample, Occurrence, {});
  sample.stopGPS();
  sample.attrs.location = {
    accuracy: 500,
    gridref: 'SD7959',
    latitude: -15.92566,
    longitude: -5.71913,
    source: 'map',
    name: 'Jamestown',
  };
  let subSample = await defaultConfig.create(Sample, Occurrence, {
    taxon: {
      array_id: 12186,
      common_names: ['Wild Cherry'],
      found_in_name: 1,
      group: 27,
      scientific_name: 'Volucella inanis',
      species_id: 3,
      warehouse_id: 113813,
    },
  });
  subSample.stopGPS();
  subSample.occurrences[0].attrs.number = 1;
  sample.samples.push(subSample);
  subSample = await defaultConfig.create(Sample, Occurrence, {
    taxon: {
      array_id: 12186,
      common_names: ['Grey Squirrel'],
      found_in_name: 1,
      group: 27,
      scientific_name: 'Sciurus carolinensis',
      species_id: 3,
      warehouse_id: 113813,
    },
  });
  subSample.stopGPS();
  subSample.occurrences[0].attrs.number = 15;
  sample.samples.push(subSample);
  // sample.attrs.  = ['John Peterson'];
  await sample.save();
  savedRecords.push(sample);
  sample = await makeSample(
    {
      taxon: {
        probability: 0.9999999943019859,
        warehouse_id: 126090,
        scientific_name: 'Pterophorus wahlbergi',
        group: 115,
        common_names: ['Pterophorus wahlbergi', 'Pterophorus wahlbergis'],
        found_in_name: 0,
      },
    },
    images.flower1
  );

  sample.attrs.date = new Date(2022, 10, 29);
  sample.occurrences[0].attrs.number = '1';
  await sample.save();
  sample = await makeSample(
    {
      taxon: {
        array_id: 19501,
        species_id: 0,
        found_in_name: 0,
        warehouse_id: 89337,
        group: 73,
        scientific_name: 'Parus major',
        common_names: ['Ceterach haughtonii'],
      },
    },
    images.flower4
  );
  sample.metadata.taxa = 'birds';
  sample.occurrences[0].attrs.comment = 'Decreasing over last few years';
  sample.occurrences[0].attrs.identifiers = 'Flumens';
  sample.occurrences[0].attrs.stage = 'Pre-adult';
  sample.occurrences[0].attrs.number = 4;
  sample.occurrences[0].attrs.sex = 'Mixed';
  sample.occurrences[0].attrs.breeding = '01: Nesting habitat (H)';

  sample.attrs.date = new Date(2022, 10, 28);
  sample.attrs.location = {
    accuracy: 7,
    gridref: 'SD483663',
    latitude: 54.0902,
    longitude: -2.7918,
    name: 'Lancaster',
    source: 'map',
  };
  await sample.save();

  sample = await makeSample(
    {
      taxon: {
        probability: 0.9999082797882908,
        warehouse_id: 77755,
        scientific_name: 'Sciurus carolinensis',
        group: 150,
        common_names: ['Blushing Snail', 'Blushing Snail'],
        found_in_name: 0,
      },
    },
    images.snail
  );

  sample.occurrences[0].attrs.number = 4;
  sample.occurrences[0].stage = null;
  sample.occurrences[0].sex = 'Mixed';
  sample.attrs.date = new Date();
  sample.attrs.location = {
    accuracy: 500,
    latitude: -15.92566,
    longitude: -5.71913,
    source: 'map',
    name: 'Longwood',
  };

  sample.save();

  sample = await makeSample(
    {
      taxon: {
        array_id: 23850,
        species_id: 0,
        found_in_name: 0,
        warehouse_id: 94188,
        group: 104,
        scientific_name: 'Vanessa cardui',
        common_names: ['Painted lady', 'Painted lady'],
      },
    },
    images.bt
  );

  sample.occurrences[0].media[0].attrs.species = {
    classifier_id: '20098',
    classifier_version: 'v1',
    suggestions: [
      {
        probability: 0.9613855971952916,
        warehouse_id: 94622,
        scientific_name: 'Vanessa cardui',
        group: 104,
        common_names: ['Painted Lady', 'Painted Lady Butterfly'],
        found_in_name: 0,
      },
    ],
  };

  sample.occurrences[0].attrs.comment = 'Spotted laying eggs';
  sample.occurrences[0].attrs.stage = 'Egg';
  sample.occurrences[0].attrs.number = 29;
  sample.attrs.location = {
    accuracy: 1,
    latitude: -15.948911,
    longitude: -5.717981,
    source: 'map',
    name: "St Paul's",
  };
  await sample.save();

  sample = await defaultComplexConfig.create(Sample, Occurrence, {});

  sample.attrs.location = {
    accuracy: 500,
    latitude: -15.92566,
    longitude: -5.71913,
    source: 'map',
    name: 'Jamestown',
  };

  sample.attrs.recorders = ['Flumens'];

  subSample.stopGPS();

  subSample = await defaultConfig.create(Sample, Occurrence, {
    taxon: {
      array_id: 5716,
      species_id: 0,
      found_in_name: 0,
      warehouse_id: 171389,
      group: 73,
      scientific_name: 'Clangula hyemalis',
      common_names: ['Common waxbill'],
    },
  });

  let [occ] = (await subSample).occurrences || [];

  occ.metadata.verification = {};
  occ.metadata.verification.verification_status = 'V2';

  subSample.occurrences[0].attrs.number = 1;
  sample.samples.push(subSample);

  savedRecords.push(sample);

  sample.metadata.saved = true;
  sample.metadata.taxa = 'birds';
  sample.metadata.createdOn = 1669967944081;
  sample.metadata.syncedOn = 1669967944081;
  sample.metadata.updatedOn = 1669967944081;
  sample.save();

  subSample = await defaultConfig.create(Sample, Occurrence, {
    taxon: {
      array_id: 3704,
      species_id: 2,
      found_in_name: 1,
      warehouse_id: 247235,
      group: 73,
      scientific_name: 'Bubo bubo',
      common_names: ["Olson's petrel", "Olson's petrel"],
    },
  });

  subSample.occurrences[0].attrs.number = 1;

  [occ] = (await subSample).occurrences || [];

  occ.metadata.verification = {};
  occ.metadata.verification.verification_status = 'V2';

  sample.samples.push(subSample);

  subSample = await defaultConfig.create(Sample, Occurrence, {
    taxon: {
      array_id: 12186,
      common_names: ['Red fody'],
      found_in_name: 0,
      group: 27,
      scientific_name: 'Parus major',
      species_id: 3,
      warehouse_id: 113813,
    },
  });
  subSample.occurrences[0].attrs.number = 9;

  [occ] = (await subSample).occurrences || [];

  occ.metadata.verification = {};
  occ.metadata.verification.verification_status = 'C';
  occ.metadata.verification.verification_substatus = '3';

  sample.samples.push(subSample);

  subSample = await defaultConfig.create(Sample, Occurrence, {
    taxon: {
      array_id: 11500,
      species_id: 0,
      found_in_name: 1,
      warehouse_id: 230665,
      group: 73,
      scientific_name: 'Haliaeetus albicilla',
      common_names: ['Saint Helena plover', 'Saint Helena plover'],
    },
  });
  subSample.stopGPS();
  subSample.occurrences[0].attrs.number = 2;

  [occ] = (await subSample).occurrences || [];

  occ.metadata.verification = {};
  occ.metadata.verification.verification_status = 'R';

  sample.samples.push(subSample);

  const sample2 = makeSample(
    {
      taxon: {
        array_id: 7002,
        common_names: ['Painted Lady', 'Painted Lady Butterfly'],
        found_in_name: 0,
        group: 73,
        scientific_name: 'Vanessa cardui',
        species_id: 0,
        warehouse_id: 223342,
      },
    },
    images.ladybird2
  );

  // (await sample2).occurrences[0].media.pop();

  (await sample2).metadata.saved = true;

  // (await sample).metadata.taxa = 'birds';
  (await sample2).metadata.createdOn = 1670173930204;
  (await sample2).metadata.syncedOn = 1670173930204;
  (await sample2).metadata.updatedOn = 1670173930204;

  [occ] = (await sample2).occurrences || [];

  const image = new Image({
    attrs: {
      data: images.blueTit1,
      thumbnail: images.blueTit1,
      type: 'jpg',
    },
  });
  occ.media.push(image);

  occ.metadata.verification = {};
  occ.metadata.verification.verification_status = 'V2';

  sample.save();
}

// @ts-ignore
export default window.screenshotsPopulatePending = async () => {
  // wait till savedSamples is fully initialized
  // await savedRecords._init;

  // @ts-ignore
  const destroyAllSamples = savedRecords.map(sample => sample.destroy());
  await Promise.all(destroyAllSamples);

  createSamples();
};
