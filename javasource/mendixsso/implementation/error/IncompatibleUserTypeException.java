package mendixsso.implementation.error;

import mendixsso.implementation.UserMapper;

public class IncompatibleUserTypeException extends RuntimeException {

    public IncompatibleUserTypeException(String actualType) {
        super(String.format("Error while trying to update your user: the provided type is of an incompatible type, " +
                        "namely '%s', but expected is '%s' as configured in microflow '%s'. " +
                        "This usually happens when your user has not been properly migrated. Please consult the MendixSSO documentation.",
                actualType,
                UserMapper.getInstance().getUserEntityType(),
                UserMapper.getInstance().getUpdateUserMicroflowName()));
    }

}
