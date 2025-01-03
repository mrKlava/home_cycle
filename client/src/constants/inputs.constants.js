const INPUTS = {
  /* USER */
  'FIRSTNAME': {
    'PLACEHOLDER': 'First name',
    'LABEL': 'First name'
  },
  'LASTNAME': {
    'PLACEHOLDER': 'Last name',
    'LABEL': 'Last name'
  },
  'EMAIL': {
    'PLACEHOLDER': 'Email',
    'LABEL': 'Email',
  },
  'COUNTRY': {
    'PLACEHOLDER': 'Country',
    'LABEL': 'Country'
  },
  'CITY': {
    'PLACEHOLDER': 'City',
    'LABEL': 'Country'
  },
  'ADDRESS_ONE': {
    'PLACEHOLDER': 'Address',
    'LABEL': 'Address First Line'
  },
  'ADDRESS_TWO': {
    'PLACEHOLDER': 'Apartment',
    'LABEL': 'Address Second Line'
  },
  'ZIP_CODE': {
    'PLACEHOLDER': 'Post code',
    'LABEL': 'Post code'
  },
  'PASSWORD': {
    'PLACEHOLDER': 'Password',
    'LABEL': 'Password'
  },
  /* BIKE */
  'BIKE': {
    'NICKNAME': {
      'PLACEHOLDER': 'Name',
      'TYPE': "text",
      'LABEL': 'Name'
    },
    'TYPE': {
      'PLACEHOLDER': 'Bike type',
      'TYPE': "select",
      'LABEL': 'Select type',
    },
    'ELECTRIC': {
      'PLACEHOLDER': true,
      'TYPE': "checkbox",
      'LABEL': 'Is it electric',
    },
    'NOTES': {
      'PLACEHOLDER': 'Few words about the bike',
      'TYPE': "textarea",
      'LABEL': 'Notes',
    },
    'MANUFACTURE': {
      'PLACEHOLDER': 'Bike manufacture',
      'TYPE': "select",
      'LABEL': 'Select Manufacturer',
    },
    'MODEL': {
      'PLACEHOLDER': 'Bike model',
      'TYPE': "text",
      'LABEL': 'Bike model',
    },
  },
  /* INTERVENTIONS */
  'INTERVENTION': {
    'BIKE': {
      'PLACEHOLDER': 'Select Bike',
      'TYPE': "select",
      'LABEL': 'Bike',
    },
    'DESCRIPTION': {
      'PLACEHOLDER': 'Few words about what you need',
      'TYPE': "textarea",
      'LABEL': 'Description',
    },
    'TECHNICIAN': {
      'PLACEHOLDER': 'Select technician',
      'TYPE': "select",
      'LABEL': 'Technician',
    },
  },
};

Object.freeze(INPUTS);

export default INPUTS;