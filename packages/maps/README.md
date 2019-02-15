## Maps Widget

### Since we don't want to push our API keys to the repo, we are using global gradle variables.

#### IOS

- Put your api key in to ApiKeys.xcconfig
- Do a clean build via `cmd + option + shift + K`
- Remove the app from your simulator to not face with caching issues

#### Android

- Create `google-maps-api-key` file in `android/app` and put your api key in the file as only context. No quotes needed.


