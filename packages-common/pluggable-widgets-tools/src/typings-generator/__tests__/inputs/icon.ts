export const iconInput = `<?xml version="1.0" encoding="utf-8"?>
<widget id="mendix.mywidget.MyWidget" needsEntityContext="true" offlineCapable="true" pluginWidget="true"
        xmlns="http://www.mendix.com/widget/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../xsd/widget.xsd">
    <properties>
        <propertyGroup caption="Events">
            <property key="icons" type="object" isList="true">
                <caption>Icons</caption>
                <description />
                <properties>
                    <propertyGroup caption="Icons">
                        <property key="firstIcon" type="icon">
                            <caption>First icon</caption>
                            <description />   
                        </property>
                        <property key="secondIcon" type="icon">
                            <caption>Second Icon</caption>
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

export const iconInputNative = `<?xml version="1.0" encoding="utf-8"?>
<widget id="mendix.mywidget.MyWidget" needsEntityContext="true" offlineCapable="true" pluginWidget="true" supportedPlatform="Native"
        xmlns="http://www.mendix.com/widget/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../xsd/widget.xsd">
    <properties>
        <propertyGroup caption="Events">
            <property key="icons" type="object" isList="true">
                <caption>Icons</caption>
                <description />
                <properties>
                    <propertyGroup caption="Icons">
                        <property key="firstIcon" type="icon">
                            <caption>First icon</caption>
                            <description />   
                        </property>
                        <property key="secondIcon" type="icon">
                            <caption>Second Icon</caption>
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
