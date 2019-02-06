## Maps Widget

### Since we don't want to push our API keys to the repo, we are using global gradle variables.

* Create ~/.gradle/gradle.properties
* Add following line `GOOGLE_MAPS_API_KEY=YourRandomApiKeyPlaceHolder`

* for ios
  * Product -> Scheme -> Edit Scheme (Make sure its DeveloperApp) -> Run -> Environment Variables -> Add `GOOGLE_MAPS_API_KEY` with your value


