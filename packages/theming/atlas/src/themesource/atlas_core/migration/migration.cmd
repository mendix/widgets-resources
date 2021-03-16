@ECHO OFF
IF EXIST ..\..\..\theme_atlas2\ (
    ECHO The folder 'theme_atlas2' already exists in the project folder, please rename and rerun this tool.
) ELSE IF EXIST theme.zip (
    MOVE ..\..\..\theme ..\..\..\theme_atlas2
    mkdir ..\..\..\theme
    tar -xf theme.zip -C ..\..\..\theme
    CLS
    ECHO Migration tool ran successfully, please continue with the other steps of the migration documentation.
) ELSE (
    ECHO No 'theme.zip' file could be found inside the migration folder. If the file is present with a different name, change it to 'theme.zip'. Otherwise, please download Atlas again from Marketplace.
)

pause
