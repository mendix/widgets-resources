package mendixsso.implementation;

import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IMendixObject;
import mendixsso.implementation.utils.UserMapperMicroflowsValidator;
import mendixsso.proxies.UserProfile;
import system.proxies.User;

import java.util.HashMap;

public class UserMapper {

    private static UserMapper instance = null;
    private String createUserMicroflowName;
    private String updateUserMicroflowName;
    private String userEntityType;

    private UserMapper() {
    }

    public static UserMapper getInstance() {
        if (instance == null) {
            instance = new UserMapper();
        }
        return instance;
    }

    public void initialize(String createUserMicroflowName, String updateUserMicroflowName) {
        this.createUserMicroflowName = createUserMicroflowName;
        this.updateUserMicroflowName = updateUserMicroflowName;

        // Validator throws MendixRuntimeException when validation fails
        this.userEntityType = UserMapperMicroflowsValidator.validateMicroflows(createUserMicroflowName, updateUserMicroflowName);
    }

    public boolean isCompatibleUserType(User user) {
        return user.getMendixObject().getType().equalsIgnoreCase(userEntityType);
    }

    public String getUserEntityType() {
        return this.userEntityType;
    }

    public String getUpdateUserMicroflowName() {
        return this.updateUserMicroflowName;
    }

    IMendixObject createUser(IContext context, UserProfile userProfile, String uuid) throws CoreException {
        return Core.microflowCall(this.createUserMicroflowName)
                .withParam("UserProfile", userProfile.getMendixObject())
                .withParam("UUID", uuid)
                .execute(context);
    }

    void updateUser(IContext context, User user, UserProfile userProfile, String uuid) throws CoreException {
        Core.microflowCall(this.updateUserMicroflowName)
                .withParam("User", user.getMendixObject())
                .withParam("UserProfile", userProfile.getMendixObject())
                .withParam("UUID", uuid)
                .execute(context);
    }
}
