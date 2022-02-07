package mendixsso.implementation;

import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.logging.ILogNode;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IMendixObject;
import mendixsso.implementation.error.IncompatibleUserTypeException;
import mendixsso.implementation.error.UnauthorizedUserException;
import mendixsso.implementation.utils.ForeignIdentityUtils;
import mendixsso.implementation.utils.MendixUtils;
import mendixsso.implementation.utils.OpenIDUtils;
import mendixsso.proxies.ForeignIdentity;
import mendixsso.proxies.UserProfile;
import mendixsso.proxies.microflows.Microflows;
import system.proxies.User;

import java.util.HashMap;

import static mendixsso.proxies.constants.Constants.getConsentToDeleteIncompatibleUsers;
import static mendixsso.proxies.constants.Constants.getLogNode;

public class UserManager {

    private UserManager() {
    }

    private static final ILogNode LOG = Core.getLogger(getLogNode());

    public static void authorizeUser(User user, String uuid) throws CoreException {
        final IContext c = Core.createSystemContext();
        c.startTransaction();
        try {
            LOG.debug("Re-authorizing user for existing session.");
            retrieveUserRolesAndCommitUser(c, user, uuid);

            c.endTransaction();
        } catch (Exception e) {
            LOG.warn(String.format("Authorizing the user with UUID '%s' has failed. Triggering rollback.", uuid));
            c.rollbackTransAction();
            throw e;
        }
    }

    public static User findOrCreateUser(UserProfile userProfile) throws CoreException {
        final IContext c = Core.createSystemContext();
        c.startTransaction();
        final String uuid = OpenIDUtils.extractUUID(userProfile.getOpenId());
        try {

            ForeignIdentity foreignIdentity = ForeignIdentityUtils.retrieveForeignIdentity(c, uuid);
            final User user;

            // Existing Foreign Identity
            if (foreignIdentity != null) {
                user = updateUser(c, userProfile, foreignIdentity);
                LOG.debug(String.format("User associated to the foreign identity with UUID %s has been updated.", uuid));
            }

            // New Foreign Identity
            else {
                final User systemUser = retrieveSystemUser(c, userProfile.getOpenId());
                if (systemUser != null) {
                    // Existing legacy user (ACS user)
                    final ForeignIdentity newForeignIdentity = ForeignIdentityUtils.createForeignIdentity(c, systemUser, uuid);
                    user = updateUser(c, userProfile, newForeignIdentity);
                    LOG.debug(String.format("Legacy user has been associated to a new foreign identity with UUID %s.", uuid));
                } else {
                    // Create a new user wih an associated foreign identity
                    user = createUserWithForeignIdentity(c, userProfile, uuid);
                    LOG.debug(String.format("New foreign identity with UUID %s has been created.", uuid));
                }
            }

            c.endTransaction();
            return user;
        } catch (Exception e) {
            LOG.warn("Find or create user for UUID '" + uuid + "' caught exception. Triggering rollback.");
            c.rollbackTransAction();
            throw e;
        }
    }

    private static User createUserWithForeignIdentity(IContext context, UserProfile userProfile, String uuid) throws CoreException {
        final IMendixObject mxNewUser = UserMapper.getInstance().createUser(context, userProfile, uuid);

        final boolean hasAccess = Core.microflowCall("MendixSSO.RetrieveUserRoles")
                .withParam("UserUUID", uuid)
                .withParam("User", mxNewUser)
                .execute(context);

        if (hasAccess) {
            final User user = User.initialize(context, mxNewUser);
            user.setPassword(OpenIDUtils.randomStrongPassword(48, 48, 7, 9, 6));
            user.commit();

            ForeignIdentityUtils.createForeignIdentity(context, user, uuid);
            return user;
        } else {
            throw new UnauthorizedUserException(uuid);
        }
    }

    private static User updateUser(IContext c, UserProfile userProfile, ForeignIdentity foreignIdentity) throws CoreException {
        final User user = foreignIdentity.getForeignIdentity_User();

        // because of a change to a new user entity type, it can happen that an old user of an incompatible type is provided
        if (!UserMapper.getInstance().isCompatibleUserType(user)) {
            if (!getConsentToDeleteIncompatibleUsers()) {
                // we do not have consent, in which case we throw an exception that is rendered to the end-user
                throw new IncompatibleUserTypeException(user.getMendixObject().getType());
            } else {
                // we have consent, so delete the old user...
                user.delete();
                // note: the foreign identity is deleted because of delete behavior

                // and create a fresh new user instead
                return createUserWithForeignIdentity(c, userProfile, foreignIdentity.getUUID());
            }
        }

        UserMapper.getInstance().updateUser(c, user, userProfile, foreignIdentity.getUUID());
        retrieveUserRolesAndCommitUser(c, user, foreignIdentity.getUUID());

        return user;
    }

    private static void retrieveUserRolesAndCommitUser(IContext c, User user, String uuid) throws CoreException {
        final boolean hasAccess = Microflows.retrieveUserRoles(c, user, uuid);
        if (hasAccess) {
            user.commit();
        } else {
            throw new UnauthorizedUserException(uuid);
        }
    }

    private static User retrieveSystemUser(IContext c, String openId) {
        return MendixUtils.retrieveSingleObjectFromDatabase(c, User.class, "//%s[%s = $name]",
                new HashMap<String, Object>() {{
                    put("name", openId);
                }},
                User.entityName,
                User.MemberNames.Name.toString()
        );
    }
}
