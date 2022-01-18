import fieldTypes from '../../constants/fieldTypesNew';

export const categories = {
  time: {
    name: 'time',
    labelId: 'TIME',
  },
  location: {
    name: 'location',
    labelId: 'LOCATION',
  },
  attributes: {
    name: 'attributes',
    labelId: 'ATTRIBUTES',
  },
  relationships: {
    name: 'relationships',
    labelId: 'RELATIONSHIPS',
  },
};

export default function useIndividualSearchSchemas() {
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
    {
      name: 'sightingDateRange',
      labelId: 'SIGHTING_DATE_RANGE',
      descriptionId: 'SIGHTING_DATE_RANGE_DESCRIPTION',
      category: categories.time.name,
      fieldType: fieldTypes.daterange,
      defaultValue: [null, null],
    },
    {
      name: 'birthDateRange',
      labelId: 'BIRTH_DATE_RANGE',
      descriptionId: 'BIRTH_DATE_RANGE_DESCRIPTION',
      category: categories.time.name,
      fieldType: fieldTypes.daterange,
      defaultValue: [null, null],
    },
    {
      name: 'deathDateRange',
      labelId: 'DEATH_DATE_RANGE',
      descriptionId: 'DEATH_DATE_RANGE_DESCRIPTION',
      category: categories.time.name,
      fieldType: fieldTypes.daterange,
      defaultValue: [null, null],
    },
    {
      name: 'location',
      labelId: 'LOCATION',
      descriptionId: 'LOCATION_DESCRIPTION',
      category: categories.location.name,
      fieldType: fieldTypes.area,
      defaultValue: null,
    },
    {
      name: 'sex',
      labelId: 'SEX',
      category: categories.attributes.name,
      fieldType: fieldTypes.select,
      choices: [
        {
          value: 'male',
          labelId: 'MALE',
        },
        {
          value: 'female',
          labelId: 'FEMALE',
        },
        {
          value: 'non-binary',
          labelId: 'NON_BINARY',
        },
        {
          value: 'unknown',
          labelId: 'UNKNOWN',
        },
      ],
      defaultValue: '',
    },
    {
      name: 'status',
      labelId: 'STATUS',
      descriptionId: 'STATUS_INDIVIDUALS_DESCRIPTION',
      category: categories.attributes.name,
      fieldType: fieldTypes.select,
      choices: [
        {
          value: 'alive',
          labelId: 'ALIVE',
        },
        {
          value: 'dead',
          labelId: 'DEAD',
        },
        {
          value: 'unknown',
          labelId: 'UNKNOWN',
        },
      ],
      defaultValue: '',
    },
    {
      name: 'name_contains',
      labelId: 'NAME_CONTAINS',
      descriptionId: 'NAME_CONTAINS_DESCRIPTION',
      category: categories.attributes.name,
      fieldType: fieldTypes.string,
      defaultValue: '',
    },
    {
      name: 'has_media',
      labelId: 'HAS_MEDIA',
      descriptionId: 'HAS_MEDIA_INDIVIDUALS_DESCRIPTION',
      category: categories.attributes.name,
      fieldType: fieldTypes.boolean,
      defaultValue: null,
    },
    {
      name: 'max_years_between_sightings',
      labelId: 'MAX_YEARS_BETWEEN_SIGHTINGS',
      descriptionId: 'MAX_YEARS_BETWEEN_SIGHTINGS_DESCRIPTION',
      category: categories.attributes.name,
      fieldType: fieldTypes.comparator,
      defaultValue: { comparator: '', value: '' },
    },
  ];
}
