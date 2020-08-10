## Timeline

Use Timeline to create vertical list of events with icons next to it.

## Usage

#### Choosing the render type

For the sake of simplicity, there are two modes available to create timeline: Basic and Custom.

With basic mode you can quickly select title, description and an icon to have the fastest results.

With custom mode you can freely model everything which will be shown in the timeline. Including Icon, Day divider, Title, Event Date/Time or Content.

#### Selecting a data source

Simply select a data source which will be used in the widget. Since timeline widget will try to group the events, make sure there is a DateTime attribute in the entity itself.

#### Selecting event date time attribute

**Timeline will use this attribute to group events based on the date.** If you are using basic mode, values of this field will be used as divider and Time which will be shown nex to the title, based on date / time format of the current language.

#### Showing day divider

For both custom and basic mode, you can opt for showing the day divider by using this control. Removing divider will make timeline look like one single flow.

#### Adding events

##### Basic Mode

Simply select Title, Description and Icon from the connected data source entity. You may use glyphicons and images for the icon itself. If icon is not provided, it will be shown as circle with background color specified in `.timeline-icon-circle`

##### Custom Mode

Timeline will generate 5 drop zones for Icon, Divider, Title, Event Date Time and Content. Since none of these fields are required, feel free to create your own timeline widget with any combinations.
