// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
    baseUrl: 'http://localhost:8080/api',
 // baseUrl : 'https://api.englishguru.tv:8080/api',
 // baseUrl : 'http://ec2-52-16-21-139.eu-west-1.compute.amazonaws.com:8080/api',
  s3Url: 'https://tutor-profile.s3.eu-west-2.amazonaws.com',
  region: 'eu-west-1',
  userPoolId: 'eu-west-1_1DLWvciGX',
  userPoolWebClientId: '73lvfgo4glmuvcfjvqoan7uvjt'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
