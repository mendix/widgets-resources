## How to release widgets & modules to the appstore (`./marketplaceRelease.js`)

#### Web Widgets
1. Trigger the "Create Web Release" action manually in GitHub with the argument containing the widget name. Eg: "accordion-web".
2. That's it! 
    - The content should now be released in GitHub.
    - The content should now be released in the MX Marketplace. Double check to verify.

#### Web Modules
1. Trigger the "Create Web Release" action manually in GitHub with the argument containing the module name. Eg "data-widgets".
2. That's it! 
    - The content should now be released in GitHub.
    - The content should now be released in the MX Marketplace. Double check to verify.

#### Atlas Core
1. Trigger the "Create Web Release" action manually in GitHub with the argument "atlas-core".
2. That's it!
    - The content should now be released in GitHub as a draft. Approve and publish it.
    - Then another GitHub action `MarketplaceRelease` will take care of releasing the module to the MX Marketplace. Double check to verify.

#### Native Modules
1. Make sure each changed widget has an appropriate change to it's `package.json` & `package.xml` (version bump) and changelog before releasing.
1. Each widget or module's (e.g. `mobile-resources-native` or `nanoflow-actions-native`) `minimumMXVersion` (`package.json`) should match the Mendix project (`NativeComponentsTestProject`) Studio Pro version.
1. On `master`, once all changes are merged, add a tag to the commit you want to create a release from. The tag should 
be formatted like ${PackageName}-v${Major}.${Minor}.${Patch}. The automation script uses the version part to bump the 
module's `package.json` version. Push this tag to GitHub, this will trigger a GitHub action.
    - Example: `mobile-resources-native-v3.0.0`
    - Example: `nanoflow-actions-native-v3.0.0`
1. That's it! 
    - The content should now be released in GitHub.
    - The content should now be released in the MX Marketplace. Double check to verify.

#### Hybrid Modules
1. Add a tag to the commit you want to create a release from. The tag should be formatted like ${PackageName}-v${Major}.${Minor}.${Patch}
    - Example: `mobile-resources-hybrid-v1.0.0`
1. That's it! 
    - The content should now be released in GitHub.
    - The content should now be released in the MX Marketplace. Double check to verify.

#### Atlas Native Content Module
1. Add a tag to the commit you want to create a release from. The tag should be formatted like ${PackageName}-v${Major}.${Minor}.${Patch}
    - Example: `atlas-content-native-v4.0.0`
1. That's it! 
    - The content should now be released in GitHub.
    - The content should now be released in the MX Marketplace. Double check to verify.
