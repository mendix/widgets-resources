# Progress bar

Displays a progress bar

## Features

-   Show percentage of progress based on value
-   Render bar types: plain, striped or animated stripes
-   Bar bootstrap colors: success, info, warning or danger

## Dependencies

Mendix 7.4

## Demo project

https://progressbar-demo.mxapps.io/

## Usage

Place the widget in the context of an object that has attributes for value and maximum value. If attribute `value` is
not set, the `Value static` will be used to calculate the progress.

Progress percentage is calculated as follows:

    (value / maximumValue) * 100

If the maximum value attribute is not set, the maximum default value is set to `Maximum value static`.

Depending on the specified bootstrap style (primary, success, info, warning, danger), the progress bar can appear in the
associated colors.

For negative progress values, the bar is drawn from right to left.
