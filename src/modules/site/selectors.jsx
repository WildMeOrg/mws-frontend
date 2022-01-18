import logoForBlackBackground from '../../assets/logo-for-black-bg.png';
import logoForWhiteBackground from '../../assets/logo-for-white-bg.png';
import splashVideo from '../../assets/splashvid.webm';
import shane from '../../assets/shane.jpg';

export const selectSiteSettingsNeedsFetch = state => state.needsFetch;

export const selectSiteSettings = state => ({
  siteName: 'Flukebook',
  private: true,
  needsSetup: false,
  googleApiKey: '',
  tagline: 'A.I. for Cetacean Research',
  exploreTagline:
    'Explore the world’s largest open database of cetacean sightings.',
  testimonial:
    'Sperm whales roam so vastly that no one research group can study them across their range. PhotoID as a tool for conservation and research finds power in numbers and international, inter-institutional collaboration. Flukebook enables us to do this easily.',
  testimonialAuthor: 'Shane Gero',
  testimonialAuthorCredentials: 'The Dominica Sperm Whale Project',
  testimonialAuthorImage: shane,
  splashVideo,
  lightBackgroundLogo: {
    name: 'Screen Shot 2020-04-14 at 1.23.28 PM.png',
    type: 'image/png',
    response: {
      uploadURL: logoForBlackBackground,
    },
  },
  darkBackgroundLogo: {
    name: 'Screen Shot 2020-04-14 at 1.23.28 PM.png',
    type: 'image/png',
    response: {
      uploadURL: logoForWhiteBackground,
    },
  },
  sightingFields: [],
  individualFields: [],
  regions: [
    {
      name: 'Kenya',
      id: 'Kenya',
      defaultLatitude: 0,
      defaultLongitude: 38,
      locationID: [
        {
          name: 'Namunyak',
          id: 'Namunyak',
          description: 'Namunyak Wildlife Conservancy',
          defaultLatitude: 1.270203,
          defaultLongitude: 37.382723,
        },
        {
          name: 'Loisaba',
          id: 'Loisaba',
          defaultLatitude: 0.612208,
          defaultLongitude: 36.802823,
        },
        {
          name: 'Lewa',
          id: 'Lewa',
          defaultLatitude: 0.2,
          defaultLongitude: 37.41,
        },
        {
          name: 'Ol Pejeta',
          id: 'Ol Pejeta',
          defaultLatitude: 0,
          defaultLongitude: 37,
        },
      ],
    },
    {
      name: 'Niger',
      id: 'Niger',
      defaultLatitude: 17.638133,
      defaultLongitude: 9.766846,
    },
    {
      name: 'Chad',
      id: 'Chad',
      locationID: [
        {
          name: 'Zakouma',
          id: 'Zakouma',
          defaultLatitude: 10.847778,
          defaultLongitude: 19.647778,
        },
      ],
    },
    {
      name: 'Namibia',
      id: 'Namibia',
      defaultLatitude: -22,
      defaultLongitude: 17,
      locationID: [
        {
          name: 'North-western Namibia',
          id: 'North-western Namibia',
          defaultLatitude: -20.902437,
          defaultLongitude: 15.864258,
        },
      ],
    },
    {
      name: 'South Africa',
      id: 'South Africa',
      defaultLatitude: -30,
      defaultLongitude: 25,
    },
    {
      name: 'Tanzania',
      id: 'Tanzania',
      locationID: [
        {
          name: 'RNP',
          id: 'RNP',
          description: 'Ruaha National Park',
          defaultLatitude: -7.5,
          defaultLongitude: 35,
        },
        {
          name: 'SGR',
          id: 'SGR',
          description: 'Selous Game Reserve',
          defaultLatitude: -9,
          defaultLongitude: 37.5,
        },
      ],
    },
    {
      name: 'Uganda',
      id: 'Uganda',
      locationID: [
        {
          name: 'Lake Mburo',
          id: 'Lake Mburo',
          defaultLatitude: -0.627778,
          defaultLongitude: 30.966667,
        },
        {
          name: 'Kidepo Valley',
          id: 'Kidepo Valley',
          defaultLatitude: 3.9,
          defaultLongitude: 33.85,
        },
      ],
    },
  ],
});

export const selectSiteName = state => {
  const settings = selectSiteSettings(state);
  return settings.siteName;
};

export const selectRegions = state => {
  const settings = selectSiteSettings(state);
  return settings.regions;
};

export const selectLogos = state => {
  const siteSettings = selectSiteSettings(state);
  return {
    white: siteSettings.darkBackgroundLogo.response.uploadURL,
    black: siteSettings.lightBackgroundLogo.response.uploadURL,
  };
};

export const selectTermsAndConditions = state => `The rights to images on Wildbook are held by the contributors of those images. Wild Me reserves only the right to use these images as training data for new computer vision algorithms.
  
  The rights to images on Wildbook are held by the contributors of those images. Wild Me reserves only the right to use these images as training data for new computer vision algorithms.
  
  The rights to images on Wildbook are held by the contributors of those images. Wild Me reserves only the right to use these images as training data for new computer vision algorithms.
  
  The rights to images on Wildbook are held by the contributors of those images. Wild Me reserves only the right to use these images as training data for new computer vision algorithms.
  
  The rights to images on Wildbook are held by the contributors of those images. Wild Me reserves only the right to use these images as training data for new computer vision algorithms.
  
  The rights to images on Wildbook are held by the contributors of those images. Wild Me reserves only the right to use these images as training data for new computer vision algorithms.
  
  The rights to images on Wildbook are held by the contributors of those images. Wild Me reserves only the right to use these images as training data for new computer vision algorithms.
  
  The rights to images on Wildbook are held by the contributors of those images. Wild Me reserves only the right to use these images as training data for new computer vision algorithms.
  
  The rights to images on Wildbook are held by the contributors of those images. Wild Me reserves only the right to use these images as training data for new computer vision algorithms.
  
  The rights to images on Wildbook are held by the contributors of those images. Wild Me reserves only the right to use these images as training data for new computer vision algorithms.
  
  The rights to images on Wildbook are held by the contributors of those images. Wild Me reserves only the right to use these images as training data for new computer vision algorithms.`;
