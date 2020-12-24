# Bar chart

The bar chart widget renders a horizontal bar graph based on static and dynamic data sets. A static data set contains
data points for a single bar series, whilst a dynamic data set requires a "group by" attribute to be configured to group 
series based on a certain attribute value, producing potentially multiple bar series. Based on the configuration, bar 
series can be grouped or stacked.

## Usage

1. Drag the bar chart widget onto a native page.
1. Select the presentation mode (default: "Grouped").
1. Configure one or more bar series for the widget:

    Static data set:

    1. Select static as data set.
    1. Configure a data source that provides the data points for one bar series.
    1. Give the series a name.
    1. Configure an X and Y attribute.

    Dynamic data set:

    1. Select dynamic as data set.
    1. Configure a data source that provides the data points for multiple bar series.
    1. Configure a "group by" attribute to group data points to create multiple bar series.
    1. Give the series a name.
    1. Configure an X and Y attribute.

1. Select which sort order is preferable for your data sets (default: "Ascending").
1. Select whether bars should have labels for X-axis values (default: "Yes").
1. Select whether the legend should be shown (default: "Yes").
1. Configure X and Y axis labels.
1. When adding this widget inside a scroll container widget, make sure to apply a fixed height to the chart through styles or configure the chart size design property to square.
1. Run the Mendix application to check out the chart.

### Custom styling

The look and feel of the chart is fully customizable. Check out the
[Native Mobile Styling](https://docs.mendix.com/refguide/native-styling-refguide#11-27-bar-chart) documentation for a full overview of
the available style customizations.
