package mendixsso.implementation.utils;

import com.mendix.core.Core;
import com.mendix.systemwideinterfaces.MendixRuntimeException;
import com.mendix.systemwideinterfaces.core.IDataType;

import java.util.Map;

class MicroflowParameter {

    private final String name;
    private final String type;
    private final boolean isMendixObject;
    private final boolean isInputParameter;
    private final boolean isSubClassOfSystemUser;
    private static final String TYPE_COMPARISON_ERROR_MESSAGE = "Actual type: '%s', expected type: '%s'.";
    private static final String TYPE_INHERITANCE_COMPARISON_ERROR_MESSAGE = "Actual type: '%s', expected type: derived from '%s'.";
    private static final String INVALID_INPUT_PARAMETER_TYPE_ERROR_MESSAGE = "Invalid input parameter type for parameter '%s' in the '%s' microflow. ";
    private static final String INVALID_RETURN_PARAMETER_TYPE_ERROR_MESSAGE = "Invalid return parameter type in the '%s' microflow. ";
    private static final String SYSTEM_USER = "System.User";

    MicroflowParameter(String name, String type, boolean isMendixObject, boolean isInputParameter, boolean isSubClassOfSystemUser) {
        this.name = name;
        this.type = type;
        this.isMendixObject = isMendixObject;
        this.isInputParameter = isInputParameter;
        this.isSubClassOfSystemUser = isSubClassOfSystemUser;
    }

    public void validate(String microflowName, Map<String, IDataType> inputParameters, IDataType returnType) {
        final IDataType dataType = getDataType(microflowName, inputParameters, returnType);

        if (this.isMendixObject) {
            validateDataType(microflowName, dataType);
            validateIfSubClassOfSystemUser(microflowName, dataType);
        } else {
            if (!dataType.toString().equals(this.type)) {
                throw new MendixRuntimeException(String.format("Invalid parameter type for parameter '%s' in the '%s' microflow. " +
                        TYPE_COMPARISON_ERROR_MESSAGE, this.name, microflowName, dataType.toString(), this.type));
            }
        }
    }

    private IDataType getDataType(String microflowName, Map<String, IDataType> inputParameters, IDataType returnType) {
        if (!this.isInputParameter) {
            return returnType;
        }

        if (!inputParameters.containsKey(this.name)) {
            throw new MendixRuntimeException(String.format("Missing input parameter in the '%s' microflow. " +
                    "Expected parameter: '%s'", microflowName, this.name));
        }
        return inputParameters.get(this.name);
    }

    private void validateDataType(String microflowName, IDataType dataType) {
        if (!dataType.isNothing() && dataType.isMendixObject() && dataType.toString().equals(this.type)) {
            return;
        }

        final String errorMessage;
        if (this.isInputParameter) {
            errorMessage = String.format(INVALID_INPUT_PARAMETER_TYPE_ERROR_MESSAGE +
                    TYPE_COMPARISON_ERROR_MESSAGE, this.name, microflowName, dataType.toString(), this.type);
        } else {
            errorMessage = String.format(INVALID_RETURN_PARAMETER_TYPE_ERROR_MESSAGE +
                    TYPE_COMPARISON_ERROR_MESSAGE, microflowName, dataType.toString(), this.type);
        }
        throw new MendixRuntimeException(errorMessage);
    }

    private void validateIfSubClassOfSystemUser(String microflowName, IDataType dataType) {
        if (!this.isSubClassOfSystemUser) {
            return;
        }

        final String objectType = dataType.getObjectType();
        if (objectType != null && Core.isSubClassOf(SYSTEM_USER, objectType)) {
            return;
        }

        final String errorMessage;
        if (this.isInputParameter) {
            errorMessage = String.format(INVALID_INPUT_PARAMETER_TYPE_ERROR_MESSAGE +
                    TYPE_INHERITANCE_COMPARISON_ERROR_MESSAGE, this.name, microflowName, objectType, SYSTEM_USER);
        } else {
            errorMessage = String.format(INVALID_RETURN_PARAMETER_TYPE_ERROR_MESSAGE +
                    TYPE_INHERITANCE_COMPARISON_ERROR_MESSAGE, microflowName, objectType, SYSTEM_USER);
        }
        throw new MendixRuntimeException(errorMessage);
    }
}
