export const containmentInput = `<?xml version="1.0" encoding="utf-8"?>
<widget id="mendix.mywidget.MyWidget" needsEntityContext="true" offlineCapable="true" pluginWidget="true"
        xmlns="http://www.mendix.com/widget/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../xsd/widget.xsd">
    <properties>
        <propertyGroup caption="General">
            <property key="content" type="widgets" required="true">
                <caption>Content</caption>
                <description>Sample text input</description>
            </property>
        </propertyGroup>
        <propertyGroup caption="Actions">
            <property key="description" type="attribute">
                <caption>Action</caption>
                <description />
                <attributeTypes>
                    <attributeType name="String"/>
                </attributeTypes>    
            </property>
            <property key="action" type="action">
                <caption>Action</caption>
                <description />
            </property>
        </propertyGroup>
        <propertyGroup caption="System Properties">
            <systemProperty key="Label"></systemProperty>
            <systemProperty key="TabIndex"></systemProperty>
        </propertyGroup>
    </properties>
</widget>`;

export const containmentInputNative = `<?xml version="1.0" encoding="utf-8"?>
<widget id="mendix.mywidget.MyWidget" needsEntityContext="true" offlineCapable="true" pluginWidget="true" supportedPlatform="Native"
        xmlns="http://www.mendix.com/widget/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../xsd/widget.xsd">
    <properties>
         <propertyGroup caption="General">
            <property key="content" type="widgets" required="true">
                <caption>Content</caption>
                <description>Sample text input</description>
            </property>
        </propertyGroup>
        <propertyGroup caption="Actions">
            <property key="description" type="attribute">
                <caption>Action</caption>
                <description />
                <attributeTypes>
                    <attributeType name="String"/>
                </attributeTypes>    
            </property>
            <property key="action" type="action">
                <caption>Action</caption>
                <description />
            </property>
        </propertyGroup>
        <propertyGroup caption="System Properties">
            <systemProperty key="Label"></systemProperty>
            <systemProperty key="TabIndex"></systemProperty>
        </propertyGroup>
    </properties>
</widget>`;
