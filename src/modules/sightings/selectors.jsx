import defaultProfile from '../../assets/defaultProfile.jpg';
import sightingImage from '../../assets/fluke.png';
import { selectRegions } from '../site/selectors';
import sightingSearchSchema, {
  sightingSearchCategories,
} from '../../constants/sightingSearchSchema';
import sightingSchema, {
  sightingCategories,
} from '../../constants/sightingSchema';
import fieldTypes from '../../constants/fieldTypes';

export const selectSightings = state => [
  {
    id: 'S-101',
    taxonomy: 'Grampus Griseus',
    submitter: 'bob',
    context: 'Research Effort',
    region: 'Indonesian Ocean',
    profile: defaultProfile,
    submissionDate: Date.now(),
    sightingDate: Date.now(),
    encounters: [
      {
        id: 'MK-4246',
        individual: {
          id: 'Teddy',
          profile: defaultProfile,
          names: [
            {
              name: 'Dorkus',
              label: 'Dorkus',
              userId: 'alice',
              orgId: null,
            },
          ],
          customFields: [
            {
              id: 12,
              label: 'diveDepth',
              value: 4.25,
            },
          ],
          sex: 'male',
          taxonomy: 'grampus griseus',
          timeOfBirth: null,
          timeOfDeath: null,
        },
        images: [
          {
            id: 111,
            status: 'detection-complete',
            statusMessage: 'Ready for matching',
            url: sightingImage,
            metadata: {
              width: 400,
              height: 632,
              filename: 'limburg.jpeg',
              contentType: 'image/jpeg',
            },
          },
          {
            id: 112,
            status: 'in-detection',
            statusMessage: '#7 in detection queue',
            url: sightingImage,
            metadata: {
              width: 400,
              height: 632,
              filename: 'domo.jpeg',
              contentType: 'image/jpeg',
            },
          },
          {
            id: 113,
            status: 'in-detection',
            statusMessage: '#14 in detection queue',
            url: sightingImage,
            metadata: {
              width: 400,
              height: 632,
              filename: 'glorbus.jpeg',
              contentType: 'image/jpeg',
            },
          },
          {
            id: 114,
            status: 'detection-error',
            statusMessage:
              'Error detecting individuals in this photograph',
            url: sightingImage,
            metadata: {
              width: 400,
              height: 632,
              filename: 'jobus.jpeg',
              contentType: 'image/jpeg',
            },
          },
        ],
        annotations: [
          {
            id: 'A-2481',
            status: 'matching-complete',
            date: 1588808202001,
            matchId: null,
            imageId: 112,
            parameters: {
              viewpoint: 'right',
              left: 5,
              top: 50,
              width: 85,
              height: 30,
              detectionConfidence: 0.949,
              theta: 0,
            },
            candidateMatches: [],
          },
          {
            id: 'A-MKV5',
            status: 'matching-complete',
            date: 1588808202001,
            matchId: null,
            imageId: 111,
            parameters: {
              viewpoint: 'right',
              left: 10,
              top: 40,
              width: 10,
              height: 10,
              detectionConfidence: 0.949,
              theta: 0,
            },
            candidateMatches: [],
          },
          {
            id: 'A-MKV6',
            status: 'matching-complete',
            date: 1588808202001,
            matchId: null,
            imageId: 111,
            parameters: {
              viewpoint: 'right',
              left: 5,
              top: 50,
              width: 85,
              height: 30,
              detectionConfidence: 0.949,
              theta: 0,
            },
            candidateMatches: [],
          },
        ],
      },
    ],
  },
  {
    id: 'S-105',
    taxonomy: 'Grampus Griseus',
    context: 'Research Effort',
    submitter: 'bob',
    region: 'Indonesian Ocean',
    profile: defaultProfile,
    submissionDate: Date.now(),
    sightingDate: Date.now(),
    encounters: [
      {
        id: 'MK-4246',
        individual: {
          id: 'WB-127',
          profile: defaultProfile,
          names: [
            {
              name: 'Dorkus',
              label: 'Dorkus',
              userId: 'alice',
              orgId: null,
            },
          ],
          customFields: [
            {
              id: 12,
              label: 'diveDepth',
              value: 4.25,
            },
          ],
          sex: 'male',
          taxonomy: 'grampus griseus',
          timeOfBirth: null,
          timeOfDeath: null,
        },
        images: [
          {
            id: 111,
            status: 'detection-complete',
            statusMessage: 'Ready for matching',
            url: sightingImage,
            metadata: {
              width: 400,
              height: 632,
              filename: 'limburg.jpeg',
              contentType: 'image/jpeg',
            },
          },
          {
            id: 112,
            status: 'in-detection',
            statusMessage: '#7 in detection queue',
            url: sightingImage,
            metadata: {
              width: 400,
              height: 632,
              filename: 'domo.jpeg',
              contentType: 'image/jpeg',
            },
          },
          {
            id: 113,
            status: 'in-detection',
            statusMessage: '#14 in detection queue',
            url: sightingImage,
            metadata: {
              width: 400,
              height: 632,
              filename: 'glorbus.jpeg',
              contentType: 'image/jpeg',
            },
          },
          {
            id: 114,
            status: 'detection-error',
            statusMessage:
              'Error detecting individuals in this photograph',
            url: sightingImage,
            metadata: {
              width: 400,
              height: 632,
              filename: 'jobus.jpeg',
              contentType: 'image/jpeg',
            },
          },
        ],
        annotations: [
          {
            id: 'A-2481',
            status: 'matching-complete',
            date: 1588808202001,
            matchId: null,
            imageId: 112,
            parameters: {
              viewpoint: 'right',
              left: 5,
              top: 50,
              width: 85,
              height: 30,
              detectionConfidence: 0.949,
              theta: 0,
            },
            candidateMatches: [],
          },
        ],
      },
    ],
  },
];

export const selectRegionSchema = state => {
  const regionSchema = sightingSchema.find(
    item => item.name === 'region',
  );
  return { ...regionSchema, choices: selectRegions(state) };
};

export const selectRegionSearchSchema = state => {
  const regionSchema = sightingSearchSchema.find(
    item => item.name === 'region',
  );
  return { ...regionSchema, choices: selectRegions(state) };
};

export const selectSearchResults = state => selectSightings(state);

export const selectSightingSearchCategories = state => ({
  ...sightingSearchCategories,
});

export const selectSightingSearchSchema = state => {
  const categories = selectSightingSearchCategories(state);

  const regionSchema = selectRegionSearchSchema(state);
  const otherSchemas = sightingSearchSchema.filter(
    item => item.name !== 'region',
  );

  return [
    {
      name: 'species',
      labelId: 'SPECIES',
      category: categories.attributes.name,
      fieldType: fieldTypes.select,
      choices: [
        {
          value: 'delphinae',
          label: 'Delphinidae',
        },
        {
          value: 'grampus-griseus',
          label: 'Grampus Griseus',
        },
        {
          value: 'kogia-sima',
          label: 'Kogia Sima',
        },
        {
          value: 'Unknown',
          label: 'Unknown',
        },
      ],
      defaultValue: '',
    },
    regionSchema,
    ...otherSchemas,
  ];
};

export const selectSightingCategories = state => ({
  ...sightingCategories,
});

export const selectSightingSchema = state => {
  const categories = selectSightingCategories(state);

  const regionSchema = selectRegionSchema(state);
  const otherSchemas = sightingSchema.filter(
    item => item.name !== 'region',
  );

  return [
    {
      name: 'species',
      labelId: 'SPECIES',
      category: categories.general.name,
      fieldType: fieldTypes.select,
      choices: [
        {
          value: 'delphinae',
          label: 'Delphinidae',
        },
        {
          value: 'grampus-griseus',
          label: 'Grampus Griseus',
        },
        {
          value: 'kogia-sima',
          label: 'Kogia Sima',
        },
        {
          value: 'Unknown',
          label: 'Unknown',
        },
      ],
      required: true,
      defaultValue: '',
    },
    regionSchema,
    ...otherSchemas,
    {
      name: 'additionalMedia',
      labelId: 'ADDITIONAL_MEDIA',
      category: categories.general.name,
      fieldType: fieldTypes.file,
      defaultValue: null,
    },
    {
      name: 'diveDepth',
      labelId: 'DIVE_DEPTH',
      category: categories.sightingDetails.name,
      fieldType: fieldTypes.feetmeters,
      defaultValue: '',
    },
    {
      name: 'relationships',
      labelId: 'RELATIONSHIPS',
      descriptionId: 'RELATIONSHIPS_DESCRIPTION',
      category: categories.animal.name,
      fieldType: fieldTypes.relationships,
      choices: [
        {
          value: 'mother',
          labelId: 'MOTHER_OF',
        },
        {
          value: 'father',
          labelId: 'FATHER_OF',
        },
        {
          value: 'calf',
          labelId: 'CALF_OF',
        },
        {
          value: 'family',
          labelId: 'IN_A_FAMILY_WITH',
        },
        {
          value: 'group',
          labelId: 'IN_A_GROUP_WITH',
        },
      ],
      defaultValue: [],
    },
  ];
};
