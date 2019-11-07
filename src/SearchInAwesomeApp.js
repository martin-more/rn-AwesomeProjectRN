import {
  NativeModules,
  Platform
} from 'react-native';

import { Promise } from 'es6-promise';

requestCode = 0;


async function searchInAwesomeApp(formAsString) {

  const { StartActivity } = NativeModules;
  const action = "com.example.awesomeapp.SEARCH";
  const componentName = await StartActivity.resolveActivity(action);
  if (!componentName) {
    // TODO: send link to app store?
    throw new Error("Cannot resolve AwesomeApp activity. Did you install the AwesomeApp app?");
  }

  const form = JSON.parse(formAsString);
  const response = await StartActivity.startActivityForResult(
    ++requestCode,
    action,
    { content: form });

  console.log('got someting from StartActivity: %', JSON.stringify(response) );
  if (response.resultCode !== StartActivity.OK) {
    throw new Error('Invalid result from sign activity.');
  }

  return response.data;  
};

export default searchInAwesomeApp;