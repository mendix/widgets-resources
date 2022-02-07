package mendixsso.implementation.utils;

import com.mendix.core.Core;
import com.mendix.systemwideinterfaces.core.IDataType;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UserMapperMicroflowsValidator {

    private UserMapperMicroflowsValidator(){
    }

    public static String validateMicroflows(String createMicroflowName, String updateMicroflowName) {
        final IDataType userEntityType = Core.getReturnType(createMicroflowName);
        final List<MicroflowParameter> microflowParameters = buildMicroflowParameters(userEntityType.toString());

        validateMicroflow(createMicroflowName, microflowParameters);

        microflowParameters.add(new MicroflowParameter("User", userEntityType.toString(), true, true, true));
        validateMicroflow(updateMicroflowName, microflowParameters);

        return userEntityType.toString();
    }

    private static void validateMicroflow(String microflowName, List<MicroflowParameter> microflowParameters) {
        final Map<String, IDataType> inputParameters = Core.getInputParameters(microflowName);
        final IDataType returnType = Core.getReturnType(microflowName);
        for (MicroflowParameter microflowParameter : microflowParameters) {
            microflowParameter.validate(microflowName, inputParameters, returnType);
        }
    }

    private static List<MicroflowParameter> buildMicroflowParameters(String userEntityType) {
        final List<MicroflowParameter> microflowParameters = new ArrayList<>();
        microflowParameters.add(new MicroflowParameter("UUID", "String", false, true, false));
        microflowParameters.add(new MicroflowParameter("UserProfile", "MendixSSO.UserProfile", true, true, false));
        microflowParameters.add(new MicroflowParameter("User", userEntityType, true, false, true));
        return microflowParameters;
    }

}