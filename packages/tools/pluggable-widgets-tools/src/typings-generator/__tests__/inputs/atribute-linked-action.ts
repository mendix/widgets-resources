export const attributeLinkedActionInput = `<?xml version="1.0" encoding="utf-8"?>
<widget id="mendix.mywidget.MyWidget" needsEntityContext="true" offlineCapable="true" pluginWidget="true"
        xmlns="http://www.mendix.com/widget/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../xsd/widget.xsd">
    <properties>
        <propertyGroup caption="General">
            <property key="collapsed" type="attribute" required="false" onChange="onToggleCollapsed">
                <caption>Collapsed</caption>
                <description />
                <attributeTypes>
                    <attributeType name="Boolean"/>
                </attributeTypes>
            </property>
            <property key="onToggleCollapsed" type="action">
                <caption>On change</caption>
                <description />
            </property>
        </propertyGroup>
        <propertyGroup caption="System Properties">
            <systemProperty key="Label"></systemProperty>
            <systemProperty key="TabIndex"></systemProperty>
        </propertyGroup>
    </properties>
</widget>`;

export const attributeNestedLinkedActionInput = `<?xml version="1.0" encoding="utf-8"?>
<widget id="mendix.mywidget.MyWidget" needsEntityContext="true" offlineCapable="true" pluginWidget="true"
        xmlns="http://www.mendix.com/widget/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../xsd/widget.xsd">
    <properties>
        <propertyGroup caption="General">
            <property key="onToggleCollapsed" type="action">
                <caption>On change</caption>
                <description />
            </property>
            <property key="datasourceProperties" type="object" isList="true">
                <caption>Data source properties</caption>
                <description />
                <properties>
                    <propertyGroup caption="PropertiesFirst">
                        <property key="collapsedFirst" type="attribute" required="false" onChange="onToggleCollapsed">
                            <caption>Collapsed</caption>
                            <description />
                            <attributeTypes>
                                <attributeType name="Boolean"/>
                            </attributeTypes>
                        </property>
                        <property key="onToggleCollapsed" type="action">
                            <caption>On change</caption>
                            <description />
                        </property>
                    </propertyGroup>
                    <propertyGroup caption="PropertiesSecond">
                        <property key="collapsedSecond" type="attribute" required="false" onChange="../onToggleCollapsed">
                            <caption>Collapsed</caption>
                            <description />
                            <attributeTypes>
                                <attributeType name="Boolean"/>
                            </attributeTypes>
                        </property>
                        <property key="onToggleCollapsedSecond" type="action">
                            <caption>On change</caption>
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
