## Maps Widget

### Since we don't want to push our API keys to the repo, we are using global gradle variables.

#### IOS

- Put your api key in to ApiKeys.xcconfig
- Do a clean build via `cmd + option + shift + K`
- Remove the app from your simulator to not face with caching issues

#### Android

- Create ~/.gradle/gradle.properties
- Add following line `GOOGLE_MAPS_API_KEY=YourRandomApiKey`


