# Line chart

The line chart widget renders a scalable line graph based on static and dynamic data sets. A static data set contains
all data points for a single line, whilst a dynamic data set contains the data points for multiple lines, which allows
a dynamic number of lines to be displayed in a chart.

## Usage

1. Drag the line chart widget onto a native page.
1. Configure one or more lines for the widget:

    Static data set:

    1. Select static as data set.
    1. Configure a data source that provides the data points for one line.
    1. Configure an X and Y attribute.

    Dynamic data set:

    1. Select dynamic as data set.
    1. Configure a data source that provides the data points for all lines.
    1. Select a group by attribute that will be used to group data points to create multiple lines.
    1. Configure an X and Y attribute.

1. When adding this widget inside a scroll container widget, make sure to apply a fixed height to the chart through styles or configure the chart size design property to square.
1. Run the Mendix application to check out the chart.

### Custom styling

The look and feel of the chart is fully customizable. Check out the
[Native Mobile Styling](https://docs.mendix.com/refguide/native-styling-refguide#11-26-line-chart) documentation for a full overview of
the available style customizations.
