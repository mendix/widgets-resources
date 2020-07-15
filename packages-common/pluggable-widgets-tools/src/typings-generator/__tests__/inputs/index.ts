export const contentGroup = `<?xml version="1.0" encoding="utf-8"?>
<widget id="mendix.mywidget.MyWidget" needsEntityContext="true" offlineCapable="true" pluginWidget="true" supportedPlatform="Web"
        xmlns="http://www.mendix.com/widget/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../xsd/widget.xsd">
    <properties>
        <propertyGroup caption="General">
            <propertyGroup caption="Values">
                <property key="valueAttribute" type="attribute" required="false">
                    <caption>Value attribute</caption>
                    <description>The attribute that contains the mywidget value</description>
                    <attributeTypes>
                        <attributeType name="String"/>
                        <attributeType name="Enum"/>
                        <attributeType name="Integer"/>
                        <attributeType name="Decimal"/>
                        <attributeType name="Long"/>
                    </attributeTypes>
                </property>
                <property key="mywidgetValue" type="string" required="false">
                    <caption>Default value</caption>
                    <description>The mywidget value shown when no value is provided via the attribute</description>
                </property>
                <property key="valueExpression" type="expression" required="false">
                    <caption>Expression value</caption>
                    <description/>
                    <returnType type="String"/>
                </property>
                <property key="valueExpressionDecimal" type="expression" required="false">
                    <caption>Expression decimal value</caption>
                    <description/>
                    <returnType type="Decimal"/>
                </property>
                <property key="file" type="file">
                    <caption>File</caption>
                    <description />
                </property>
            </propertyGroup>
            <propertyGroup caption="Appearance">
                <property key="bootstrapStyle" type="enumeration" defaultValue="default">
                    <caption>MyWidget style</caption>
                    <description>The appearance of the mywidget</description>
                    <enumerationValues>
                        <enumerationValue key="default">Default</enumerationValue>
                        <enumerationValue key="primary">Primary</enumerationValue>
                        <enumerationValue key="success">Success</enumerationValue>
                        <enumerationValue key="info">Info</enumerationValue>
                        <enumerationValue key="inverse">Inverse</enumerationValue>
                        <enumerationValue key="warning">Warning</enumerationValue>
                        <enumerationValue key="danger">Danger</enumerationValue>
                    </enumerationValues>
                </property>
                <property key="mywidgetType" type="enumeration" required="true" defaultValue="badge">
                    <caption>Type</caption>
                    <description>Render it as either a badge or a color label</description>
                    <enumerationValues>
                        <enumerationValue key="badge">Badge</enumerationValue>
                        <enumerationValue key="label">Label</enumerationValue>
                    </enumerationValues>
                </property>
                <property key="tries" type="integer" required="false">
                    <caption>Number of tries</caption>
                    <description />
                </property>
                <property key="amount" type="decimal" required="false">
                    <caption>The amount of stuff</caption>
                    <description />
                </property>
                <property key="image" type="image" required="false">
                    <caption>Image</caption>
                    <description />
                </property>
            </propertyGroup>
            <propertyGroup caption="Common">
                <systemProperty key="Name"/>
            </propertyGroup>
        </propertyGroup>
        <propertyGroup caption="Events">
            <property key="onClickAction" type="action" required="false">
                <caption>On click action</caption>
                <description>Action to trigger when button / label is clicked</description>
            </property>
            <property key="onChange" type="action" required="false">
                <caption>On change action</caption>
                <description>Action to trigger when button / label is clicked</description>
            </property>
            <property key="actions" type="object" isList="true">
                <caption>Actions</caption>
                <description />
                <properties>
                    <propertyGroup caption="General">
                        <property key="name" type="string">
                            <caption>Action name</caption>
                            <description />
                        </property>
                        <property key="enabled" type="boolean">
                            <caption>Is action enabled?</caption>
                            <description />
                        </property>
                    </propertyGroup>
                    <propertyGroup caption="Events">
                        <property key="action" type="action">
                            <caption>Action</caption>
                            <description />
                        </property>
                    </propertyGroup>
                    <propertyGroup caption="Image">
                        <property key="image" type="image">
                            <caption>Image</caption>
                            <description />
                        </property>
                    </propertyGroup>
                 </properties>
            </property>
        </propertyGroup>
        <propertyGroup caption="System Properties">
            <systemProperty key="Label"></systemProperty>
            <systemProperty key="TabIndex"></systemProperty>
        </propertyGroup>
    </properties>
</widget>`;

export const content = `<?xml version="1.0" encoding="utf-8"?>
<widget id="mendix.mywidget.MyWidget" needsEntityContext="true" offlineCapable="true" pluginWidget="true" supportedPlatform="Web"
        xmlns="http://www.mendix.com/widget/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../xsd/widget.xsd">
    <name>MyWidget</name>
    <description>My widget description</description>
    <icon>iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABp1BMVEUAAABV//9mzP9LtP9Ms/9Jtv9NsvdJsfpLtPpJsfdJsfhJsvhJsvdKsvdJsPhKsPhJsfdJsPhJsfdIsfhJsfdIsPdJsfhJsfhJsPhJsPhIsfhIsPdJsPdKsPdKsfdNsvdOsvdPs/dQs/dRtPdStPdTtPdUtfdWtvdXtvdauPdcuPdeufdeufhguvhiu/hju/hkvPhmvfhnvfhpvvhrv/huwPhvwfhxwfhywvhzwvh4xfl5xfl6xfl8xvl9xvl9x/mByPmCyfmFyvmGyvmJzPmKzPmLzfmNzvqPzvqQz/qT0PqU0PqU0fqX0vqY0vqa0/qe1fqg1vqj1/uk1/un2fup2vut2/uv3Puw3Puw3fuz3vu13/u23/u34Pu44Pu64fu64fy84vy94vy+4/y/4/zD5fzE5fzG5vzH5vzI5/zK6PzL6PzR6/zT7P3U7P3V7f3W7f3Y7v3Z7v3c8P3e8f3f8f3g8f3i8v3l8/3l9P3n9P3r9v7t9/7u9/7v+P7w+P7x+f7y+f70+v71+v74/P75/P76/f77/f78/f78/v79/v7+/v7////6dMsRAAAAG3RSTlMAAwURGxwhMTNic3SEh4iVp7XBzejt7vH5/f6PsMNWAAABsklEQVR4AWIYfGAUjIJRMAqYuYREJKWJAqLCPGwY+jnFpEkBEryMqPr5pEkFgkwo9kuTDviR/S9GhgFSHAgDuKXJAQIIA4TIMkAcEY4i0mQBVrgBkuQZwA43QJo8wIFhQEhEOIBQOutHJozDOP5Crp4e1RhkJ0tKGJFd6oNEdtmJyEIzpaZl5nrRZgaHM/2Pf5/vwXXfyagXgG93bwSAlEolowLMm9w83gibhXH2gKKVdD67gTnWjwCk+VVjMQS4suSnnjMLRVFc9sAHvAX2A9fySaXNBMbEZVUWscaHIMRuqwBgD8hDEbnsRmfjUKJkAQZGCTlO/xWBwIADQLIZBlY441MvfoF1xlFS/4fy+bzXKh4dgNJE7L3eh3tmtuWa+AMcMIY3dgUvZQpGEYmMw2kD7HC+R29UqyoXLaBd0QZxzgXgikLLDSqJTKU5HOcS0MsbA9jPqtwCRvXm2eorBbNIJBw3KJ9O4Yl+AAXdnyaLt7PWN3jRWLvzmAVp94zO5+n41/onfo/UpExxZqI0O7NQr0DhIq9Io7hQpbRYp7hiobRqo6ByFcNWuY6CUTAKRgEAo8X0lBD3V30AAAAASUVORK5CYII=</icon>
    <properties>
        <property key="valueAttribute" type="attribute" required="false">
            <caption>Value attribute</caption>
            <category>General</category>
            <description>The attribute that contains the mywidget value</description>
            <attributeTypes>
                <attributeType name="String"/>
                <attributeType name="Enum"/>
                <attributeType name="Integer"/>
                <attributeType name="Decimal"/>
                <attributeType name="Long"/>
            </attributeTypes>
        </property>
        <property key="mywidgetValue" type="string" required="false">
            <caption>Default value</caption>
            <category>General</category>
            <description>The mywidget value shown when no value is provided via the attribute</description>
        </property>
        <property key="valueExpression" type="expression" required="false">
            <caption>Expression value</caption>
            <category>General</category>
            <description/>
            <returnType type="String"/>
        </property>
        <property key="valueExpressionDecimal" type="expression" required="false">
            <caption>Expression decimal value</caption>
            <category>General</category>
            <description/>
            <returnType type="Decimal"/>
        </property>
        <property key="file" type="file">
            <caption>File</caption>
            <category>General</category>
            <description />
        </property>
        <property key="bootstrapStyle" type="enumeration" defaultValue="default">
            <caption>MyWidget style</caption>
            <category>Display</category>
            <description>The appearance of the mywidget</description>
            <enumerationValues>
                <enumerationValue key="default">Default</enumerationValue>
                <enumerationValue key="primary">Primary</enumerationValue>
                <enumerationValue key="success">Success</enumerationValue>
                <enumerationValue key="info">Info</enumerationValue>
                <enumerationValue key="inverse">Inverse</enumerationValue>
                <enumerationValue key="warning">Warning</enumerationValue>
                <enumerationValue key="danger">Danger</enumerationValue>
            </enumerationValues>
        </property>
        <property key="mywidgetType" type="enumeration" required="true" defaultValue="badge">
            <caption>Type</caption>
            <category>Display</category>
            <description>Render it as either a badge or a color label</description>
            <enumerationValues>
                <enumerationValue key="badge">Badge</enumerationValue>
                <enumerationValue key="label">Label</enumerationValue>
            </enumerationValues>
        </property>
        <property key="tries" type="integer" required="false">
            <caption>Number of tries</caption>
            <category>Display</category>
            <description />
        </property>
        <property key="amount" type="decimal" required="false">
            <caption>The amount of stuff</caption>
            <category>Display</category>
            <description />
        </property>
        <property key="image" type="image" required="false">
            <caption>Image</caption>
            <category>Display</category>
            <description />
        </property>
        <property key="onClickAction" type="action" required="false">
            <caption>On click action</caption>
            <category>Events</category>
            <description>Action to trigger when button / label is clicked</description>
        </property>
        <property key="onChange" type="action" required="false">
            <caption>On change action</caption>
            <category>Events</category>
            <description>Action to trigger when button / label is clicked</description>
        </property>
        <property key="actions" type="object" isList="true">
            <caption>Actions</caption>
            <category>Events</category>
            <description />
            <properties>
                <property key="name" type="string">
                    <caption>Action name</caption>
                    <category>General</category>
                    <description />
                </property>
                <property key="enabled" type="boolean">
                    <caption>Is action enabled?</caption>
                    <category>General</category>
                    <description />
                </property>
                <property key="action" type="action">
                    <caption>Action</caption>
                    <category>Events</category>
                    <description />
                </property>
                <property key="image" type="image">
                    <caption>Image</caption>
                    <category>Events</category>
                    <description />
                </property>
            </properties>
        </property>
    </properties>
</widget>`;
export const contentGroupNative = `<?xml version="1.0" encoding="utf-8"?>
<widget id="mendix.mywidget.MyWidget" needsEntityContext="true" offlineCapable="true" pluginWidget="true" supportedPlatform="Native"
        xmlns="http://www.mendix.com/widget/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../xsd/widget.xsd">
    <properties>
        <propertyGroup caption="General">
            <propertyGroup caption="Values">
                <property key="valueAttribute" type="attribute" required="false">
                    <caption>Value attribute</caption>
                    <description>The attribute that contains the mywidget value</description>
                    <attributeTypes>
                        <attributeType name="String"/>
                        <attributeType name="Enum"/>
                        <attributeType name="Integer"/>
                        <attributeType name="Decimal"/>
                        <attributeType name="Long"/>
                    </attributeTypes>
                </property>
                <property key="mywidgetValue" type="string" required="false">
                    <caption>Default value</caption>
                    <description>The mywidget value shown when no value is provided via the attribute</description>
                </property>
                <property key="valueExpression" type="expression" required="false">
                    <caption>Expression value</caption>
                    <description/>
                    <returnType type="String"/>
                </property>
                <property key="valueExpressionDecimal" type="expression" required="false">
                    <caption>Expression decimal value</caption>
                    <description/>
                    <returnType type="Decimal"/>
                </property>
                <property key="file" type="file">
                    <caption>File</caption>
                    <description />
                </property>
            </propertyGroup>
            <propertyGroup caption="Appearance">
                <property key="bootstrapStyle" type="enumeration" defaultValue="default">
                    <caption>MyWidget style</caption>
                    <description>The appearance of the mywidget</description>
                    <enumerationValues>
                        <enumerationValue key="default">Default</enumerationValue>
                        <enumerationValue key="primary">Primary</enumerationValue>
                        <enumerationValue key="success">Success</enumerationValue>
                        <enumerationValue key="info">Info</enumerationValue>
                        <enumerationValue key="inverse">Inverse</enumerationValue>
                        <enumerationValue key="warning">Warning</enumerationValue>
                        <enumerationValue key="danger">Danger</enumerationValue>
                    </enumerationValues>
                </property>
                <property key="mywidgetType" type="enumeration" required="true" defaultValue="badge">
                    <caption>Type</caption>
                    <description>Render it as either a badge or a color label</description>
                    <enumerationValues>
                        <enumerationValue key="badge">Badge</enumerationValue>
                        <enumerationValue key="label">Label</enumerationValue>
                    </enumerationValues>
                </property>
                <property key="tries" type="integer" required="false">
                    <caption>Number of tries</caption>
                    <description />
                </property>
                <property key="amount" type="decimal" required="false">
                    <caption>The amount of stuff</caption>
                    <description />
                </property>
                <property key="image" type="image" required="false">
                    <caption>Image</caption>
                    <description />
                </property>
            </propertyGroup>
            <propertyGroup caption="Common">
                <systemProperty key="Name"/>
            </propertyGroup>
        </propertyGroup>
        <propertyGroup caption="Events">
            <property key="onClickAction" type="action" required="false">
                <caption>On click action</caption>
                <description>Action to trigger when button / label is clicked</description>
            </property>
            <property key="onChange" type="action" required="false">
                <caption>On change action</caption>
                <description>Action to trigger when button / label is clicked</description>
            </property>
            <property key="actions" type="object" isList="true">
                <caption>Actions</caption>
                <description />
                <properties>
                    <propertyGroup caption="General">
                        <property key="name" type="string">
                            <caption>Action name</caption>
                            <description />
                        </property>
                        <property key="enabled" type="boolean">
                            <caption>Is action enabled?</caption>
                            <description />
                        </property>
                    </propertyGroup>
                    <propertyGroup caption="Events">
                        <property key="action" type="action">
                            <caption>Action</caption>
                            <description />
                        </property>
                    </propertyGroup>
                    <propertyGroup caption="Image">
                        <property key="image" type="image">
                            <caption>Image</caption>
                            <description />
                        </property>
                    </propertyGroup>
                 </properties>
            </property>
        </propertyGroup>
        <propertyGroup caption="System Properties">
            <systemProperty key="Label"></systemProperty>
            <systemProperty key="TabIndex"></systemProperty>
        </propertyGroup>
    </properties>
</widget>`;

export const contentNative = `<?xml version="1.0" encoding="utf-8"?>
<widget id="mendix.mywidget.MyWidget" needsEntityContext="true" offlineCapable="true" pluginWidget="true" supportedPlatform="Native"
        xmlns="http://www.mendix.com/widget/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../xsd/widget.xsd">
    <name>MyWidget</name>
    <description>My widget description</description>
    <icon>iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABp1BMVEUAAABV//9mzP9LtP9Ms/9Jtv9NsvdJsfpLtPpJsfdJsfhJsvhJsvdKsvdJsPhKsPhJsfdJsPhJsfdIsfhJsfdIsPdJsfhJsfhJsPhJsPhIsfhIsPdJsPdKsPdKsfdNsvdOsvdPs/dQs/dRtPdStPdTtPdUtfdWtvdXtvdauPdcuPdeufdeufhguvhiu/hju/hkvPhmvfhnvfhpvvhrv/huwPhvwfhxwfhywvhzwvh4xfl5xfl6xfl8xvl9xvl9x/mByPmCyfmFyvmGyvmJzPmKzPmLzfmNzvqPzvqQz/qT0PqU0PqU0fqX0vqY0vqa0/qe1fqg1vqj1/uk1/un2fup2vut2/uv3Puw3Puw3fuz3vu13/u23/u34Pu44Pu64fu64fy84vy94vy+4/y/4/zD5fzE5fzG5vzH5vzI5/zK6PzL6PzR6/zT7P3U7P3V7f3W7f3Y7v3Z7v3c8P3e8f3f8f3g8f3i8v3l8/3l9P3n9P3r9v7t9/7u9/7v+P7w+P7x+f7y+f70+v71+v74/P75/P76/f77/f78/f78/v79/v7+/v7////6dMsRAAAAG3RSTlMAAwURGxwhMTNic3SEh4iVp7XBzejt7vH5/f6PsMNWAAABsklEQVR4AWIYfGAUjIJRMAqYuYREJKWJAqLCPGwY+jnFpEkBEryMqPr5pEkFgkwo9kuTDviR/S9GhgFSHAgDuKXJAQIIA4TIMkAcEY4i0mQBVrgBkuQZwA43QJo8wIFhQEhEOIBQOutHJozDOP5Crp4e1RhkJ0tKGJFd6oNEdtmJyEIzpaZl5nrRZgaHM/2Pf5/vwXXfyagXgG93bwSAlEolowLMm9w83gibhXH2gKKVdD67gTnWjwCk+VVjMQS4suSnnjMLRVFc9sAHvAX2A9fySaXNBMbEZVUWscaHIMRuqwBgD8hDEbnsRmfjUKJkAQZGCTlO/xWBwIADQLIZBlY441MvfoF1xlFS/4fy+bzXKh4dgNJE7L3eh3tmtuWa+AMcMIY3dgUvZQpGEYmMw2kD7HC+R29UqyoXLaBd0QZxzgXgikLLDSqJTKU5HOcS0MsbA9jPqtwCRvXm2eorBbNIJBw3KJ9O4Yl+AAXdnyaLt7PWN3jRWLvzmAVp94zO5+n41/onfo/UpExxZqI0O7NQr0DhIq9Io7hQpbRYp7hiobRqo6ByFcNWuY6CUTAKRgEAo8X0lBD3V30AAAAASUVORK5CYII=</icon>
    <properties>
        <property key="valueAttribute" type="attribute" required="false">
            <caption>Value attribute</caption>
            <category>General</category>
            <description>The attribute that contains the mywidget value</description>
            <attributeTypes>
                <attributeType name="String"/>
                <attributeType name="Enum"/>
                <attributeType name="Integer"/>
                <attributeType name="Decimal"/>
                <attributeType name="Long"/>
            </attributeTypes>
        </property>
        <property key="mywidgetValue" type="string" required="false">
            <caption>Default value</caption>
            <category>General</category>
            <description>The mywidget value shown when no value is provided via the attribute</description>
        </property>
        <property key="valueExpression" type="expression" required="false">
            <caption>Expression value</caption>
            <category>General</category>
            <description/>
            <returnType type="String"/>
        </property>
        <property key="valueExpressionDecimal" type="expression" required="false">
            <caption>Expression decimal value</caption>
            <category>General</category>
            <description/>
            <returnType type="Decimal"/>
        </property>
        <property key="file" type="file">
            <caption>File</caption>
            <category>General</category>
            <description />
        </property>
        <property key="bootstrapStyle" type="enumeration" defaultValue="default">
            <caption>MyWidget style</caption>
            <category>Display</category>
            <description>The appearance of the mywidget</description>
            <enumerationValues>
                <enumerationValue key="default">Default</enumerationValue>
                <enumerationValue key="primary">Primary</enumerationValue>
                <enumerationValue key="success">Success</enumerationValue>
                <enumerationValue key="info">Info</enumerationValue>
                <enumerationValue key="inverse">Inverse</enumerationValue>
                <enumerationValue key="warning">Warning</enumerationValue>
                <enumerationValue key="danger">Danger</enumerationValue>
            </enumerationValues>
        </property>
        <property key="mywidgetType" type="enumeration" required="true" defaultValue="badge">
            <caption>Type</caption>
            <category>Display</category>
            <description>Render it as either a badge or a color label</description>
            <enumerationValues>
                <enumerationValue key="badge">Badge</enumerationValue>
                <enumerationValue key="label">Label</enumerationValue>
            </enumerationValues>
        </property>
        <property key="tries" type="integer" required="false">
            <caption>Number of tries</caption>
            <category>Display</category>
            <description />
        </property>
        <property key="amount" type="decimal" required="false">
            <caption>The amount of stuff</caption>
            <category>Display</category>
            <description />
        </property>
        <property key="image" type="image" required="false">
            <caption>Image</caption>
            <category>Display</category>
            <description />
        </property>
        <property key="onClickAction" type="action" required="false">
            <caption>On click action</caption>
            <category>Events</category>
            <description>Action to trigger when button / label is clicked</description>
        </property>
        <property key="onChange" type="action" required="false">
            <caption>On change action</caption>
            <category>Events</category>
            <description>Action to trigger when button / label is clicked</description>
        </property>
        <property key="actions" type="object" isList="true">
            <caption>Actions</caption>
            <category>Events</category>
            <description />
            <properties>
                <property key="name" type="string">
                    <caption>Action name</caption>
                    <category>General</category>
                    <description />
                </property>
                <property key="enabled" type="boolean">
                    <caption>Is action enabled?</caption>
                    <category>General</category>
                    <description />
                </property>
                <property key="action" type="action">
                    <caption>Action</caption>
                    <category>Events</category>
                    <description />
                </property>
                <property key="image" type="image">
                    <caption>Image</caption>
                    <category>Events</category>
                    <description />
                </property>
            </properties>
        </property>
    </properties>
</widget>`;
