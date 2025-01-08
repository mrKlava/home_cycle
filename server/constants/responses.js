const RESPONSES = {
  'MESSAGES': {
    'USER_CREATED': 'User has been created',
    'LOGIN_SUCCESS': 'Successfully logged in',
    'LOGOUT_SUCCESS': 'Successfully logged out',
    'USER_CREATED': 'Successfully created user',
    
    'NO_COUNTRY': 'No country found',
    'NO_CITY': 'No city found',
    'NO_USER': 'No user found',
    'NO_INTERVENTION': 'No intervention found',
    'NO_COMMENT': 'No comments found',
    'NO_INVOICE': 'No invoice found',
    'NO_BIKE': 'No bike found',
    'NO_SERVICE': 'No services found',
    'NO_PRODUCT': 'No products found',
    
    'BIKE_CREATED': 'Bike was created',
    'BIKE_UPDATED': 'Bike was created',
    'BIKE_DELETED': 'Bike was deleted',
  },
  'ERRORS': {
    'INCORRECT_PASSWORD': 'Incorrect password',
    'INCORRECT_CREDENTIALS': 'Incorrect credentials',
    'PROVIDE_CREDENTIALS': 'Must provide email and password',

    'ERROR_MIDDLEWARE_CRASH': 'Error middleware crashed',

    'NOT_AUTHENTICATED': 'Not authenticated',
    'FAILED_JWT': 'Failed to authorize',
    
    'NO_PARAM': 'Param is missing',
    'MISSING_PARAM': 'Missing params',
    'USER_EXISTS': 'This email already is taken',

    'BIKE_CREATE_FAIL': 'Failed to create bike',
    'BIKE_UPDATE_FAIL': 'Failed to update bike',
  }
};

Object.freeze(RESPONSES);

export default RESPONSES;