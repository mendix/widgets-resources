## How to release widgets & modules to the appstore (`./marketplaceRelease.js`)

#### Web Widgets
1. Create a release in GitHub
1. Add a tag to the commit you want to create a release from. The tag should be formatted like ${PackageName}-v${Major}.${Minor}.${Patch}
    - Example: `maps-web-v2.0.2`
1. That's it! 
    - The content should now be released in GitHub.
    - The content should now be released in the MX Marketplace. Double check to verify.

#### Web Modules
1. Add a tag to the commit you want to create a release from. The tag should be formatted like ${PackageName}-v${Major}.${Minor}.${Patch}
    - Example: `nanoflow-actions-web-v2.0.0`
1. That's it! 
    - The content should now be released in GitHub.
    - The content should now be released in the MX Marketplace. Double check to verify.

#### Atlas Core
2. Trigger the "Create Web Release" action manually in GitHub with the argument "atlas-core".
3. That's it!
    - The content should now be released in GitHub as a draft. Approve and publish it.
    - Then another GitHub action `MarketplaceRelease` will take care of releasing the module to the MX Marketplace. Double check to verify.

#### Native Modules
1. Make sure a new widget is used on a page in the module and commit your changes, so it's included in the module when it's exported.
1. Make sure each changed widget has an appropriate change to it's package.json (version bump) and changelog.
1. Add a tag to the commit you want to create a release from. The tag should be formatted like ${PackageName}-v${Major}.${Minor}.${Patch}
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
