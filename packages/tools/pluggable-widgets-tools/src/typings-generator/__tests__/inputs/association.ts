export const associationInput = `<?xml version="1.0" encoding="utf-8"?>
<widget id="mendix.mywidget.MyWidget" needsEntityContext="true" offlineCapable="true" pluginWidget="true"
        xmlns="http://www.mendix.com/widget/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../xsd/widget.xsd">
    <properties>
        <propertyGroup caption="General">
            <property key="reference" type="association" universeDataSource="optionsSource">
                <caption>Reference</caption>
                <description/>
            </property>
             <property key="optionsSource" type="datasource" isList="true" required="false">
                <caption>Universe Data source</caption>
                <description />
            </property>
            <property key="displayValue" dataSource="optionsSource" type="attribute">
                <caption>Display value</caption>
                <description>Display value</description>
                <attributeTypes>
                    <attributeType name="String"/>
                </attributeTypes>
            </property>
        </propertyGroup>
    </properties>
</widget>`;

export const associationInputNative = `<?xml version="1.0" encoding="utf-8"?>
<widget id="mendix.mywidget.MyWidget" needsEntityContext="true" offlineCapable="true" pluginWidget="true" supportedPlatform="Native"
        xmlns="http://www.mendix.com/widget/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../xsd/widget.xsd">
    <properties>
        <propertyGroup caption="General">
            <property key="reference" type="association" universeDataSource="optionsSource">
                <caption>Reference</caption>
                <description/>
            </property>
             <property key="optionsSource" type="datasource" isList="true" required="false">
                <caption>Universe Data source</caption>
                <description />
            </property>
            <property key="displayValue" dataSource="optionsSource" type="attribute">
                <caption>Display value</caption>
                <description>Display value</description>
                <attributeTypes>
                    <attributeType name="String"/>
                </attributeTypes>
            </property>
        </propertyGroup>
    </properties>
</widget>`;
