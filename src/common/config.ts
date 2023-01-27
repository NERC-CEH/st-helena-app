import {
  Filesystem,
  Directory as FilesystemDirectory,
} from '@capacitor/filesystem';
import { isPlatform } from '@ionic/react';

const iRecordBackendUrl = 'https://irecord.org.uk';

// TODO: REMOVE WHEN BACKEND IS SET-UP
const backendUrl = process.env.APP_BACKEND_URL || 'https://irecord.org.uk';
// process.env.APP_BACKEND_URL || 'https://irecordsthelena.edu.sh/';

const indiciaUrl =
  process.env.APP_BACKEND_INDICIA_URL || 'https://warehouse1.indicia.org.uk';

const config = {
  version: process.env.APP_VERSION as string,
  build: process.env.APP_BUILD as string,
  feedbackEmail: 'apps%40ceh.ac.uk',

  environment: process.env.NODE_ENV as string,

  sentryDNS: process.env.APP_SENTRY_KEY as string,

  POSITIVE_THRESHOLD: 0.7,
  POSSIBLE_THRESHOLD: 0.2,

  map: {
    mapboxApiKey: process.env.APP_MAPBOX_MAP_KEY as string,
    osApiKey: process.env.APP_OS_MAP_KEY as string,
  },

  backend: {
    iRecordUrl: iRecordBackendUrl,
    url: backendUrl,
    websiteId: 118,
    clientId: process.env.APP_BACKEND_CLIENT_ID as string,
    clientPass: process.env.APP_BACKEND_CLIENT_PASS as string,

    recordsServiceURL: `${indiciaUrl}/index.php/services/rest/es-occurrences/_search`,

    mediaUrl: `${indiciaUrl}/upload/`,

    indicia: {
      url: indiciaUrl,
    },
  },

  dataPath: '',
};

(async function getMediaDirectory() {
  if (isPlatform('hybrid')) {
    const { uri } = await Filesystem.getUri({
      path: '',
      directory: FilesystemDirectory.Data,
    });
    config.dataPath = uri;
  }
})();

export default config;
