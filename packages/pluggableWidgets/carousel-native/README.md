# Carousel

### Styling

Main object has to have two objects called `cardLayout` and `fullWidthLayout`. These will be applied automatically
depending on selected layout in properties.

```
export myCarouselStyle = {
    container: ViewStyle  // Styles the view surrounding the carousel widget. For best results, make sure to give a fixed "height"
    cardLayout: ...LayoutStyle,
    fullWidthLayout: ...LayoutStyle
}
```

#### LayoutStyle

| Style Key                                               | Description                                                                                    |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| slideItem?: ViewStyle                                   | Styles the view surrounding each slide, including inactive slides.                             |
| inactiveSlideItem?: { opacity?: number, scale?: number} | "inactiveSlideOpacity" and "inactiveSlideScale", will allow inactive slides smaller and faded. |
| indicator: { color: string}                             | Styles the loading indicator which will be shown while the carousel is loading                 |
| pagination?: Pagination                                 | Styles pagination container, dots, active dots and text                                        |

#### Pagination

| Style Key                                                                         | Description                                                                                                    |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| container: ViewStyle                                                              | Styles the main view around pagination, regardless of text or dot.                                             |
| dotStyle: ViewStyle + color?: string                                              | Styles all the pagination dots.                                                                                |
| inactiveDotStyle: ViewStyle + {opacity?: number; scale?: number; color?: string}; | Additional styles for inactive dots. Will be merged with dotStyle.                                             |
| dotContainerStyle: ViewStyle                                                      | Styles the view around individual pagination dots                                                              |
| text: TextStyle                                                                   | Will be applied when there is more than 5 elements in carousel and pagination buttons becomes text like "1/5". |
