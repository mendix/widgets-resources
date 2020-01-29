# Carousel

### Styling

Main object has to have two objects called `cardLayout` and `fullWidthLayout`. These will be applied automatically
depending on selected layout in properties.

```
export myCarouselStyle = {
    cardLayout: ...LayoutStyle,
    fullWidthLayout: ...LayoutStyle
}

```

#### LayoutStyle

| Style Key                                                                                | Description                                                                                                                                                 |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| container?: ViewStyle                                                                    | Styles the view surrounding the carousel widget\. For best results, make sure to give a fixed "height"                                                      |
| slideItem?: ViewStyle + \{ inactiveSlideOpacity?: number, \inactiveSlideScale?: number\} | Styles the view surrounding each slide\. Extra styles called "inactiveSlideOpacity" and "inactiveSlideScale", will allow inactive slides smaller and faded. |
| pagination?: Pagination                                                                  | Styles pagination container, dots, active dots and text                                                                                                     |
| indicator: \{ color: string\}                                                            | Styles the loading indicator which will be shown while the carousel is loading                                                                              |

#### Pagination

| Style Key                                                                                            | Description                                                                                                                        |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| container: ViewStyle                                                                                 | Styles the main view around pagination                                                                                             |
| activeDotStyle: ViewStyle + \color?: string                                                          | Styles the current page's pagination dot\.                                                                                         |
| dotStyle: ViewStyle + \{inactiveOpacity?: number; \inactiveScale?: number; \inactiveColor?: string}; | Styles all the pagination dots\. "inactiveOpacity", "inactiveScale", "inactiveColor attributes allows you to style inactive dots\. |
| dotContainerStyle: ViewStyle                                                                         | Styles the main view around pagination dots                                                                                        |
| text: TextStyle                                                                                      | Will be applied when there is more than 5 elements in carousel and pagination buttons becomes text.                                |
