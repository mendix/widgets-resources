# Shrinking header

Please see [Shrinking header]() in the Mendix documentation for details.

## TODOS

1. Position "sticky" behaviour breaks when navigating from another page in the Mendix application. This is due to the css rule `overflow-x: hidden` which is applied to `div class="mx-placeholder" />`.

    The solution is to iterate through all ancestor elements and remove this rule. If encountered, the rule can maybe be applied to the body. Discuss with the teach lead why this overflow rule is set at all.
1. Remove shrunk class widget config property.
1. Create a shrinking header that resizes while scrolling.