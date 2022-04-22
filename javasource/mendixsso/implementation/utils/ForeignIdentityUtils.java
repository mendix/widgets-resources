package mendixsso.implementation.utils;

import com.mendix.core.CoreException;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.ISession;
import mendixsso.proxies.ForeignIdentity;
import system.proxies.User;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

public class ForeignIdentityUtils {

    private ForeignIdentityUtils() {
    }

    private static final Set<String> UUID_LOCKS = new HashSet<>();

    public static void lockForeignIdentity(String uuid) throws InterruptedException {
        synchronized (UUID_LOCKS) {
            while (UUID_LOCKS.contains(uuid))
                UUID_LOCKS.wait();
            UUID_LOCKS.add(uuid);
        }
    }

    public static void unlockForeignIdentity(String uuid) {
        synchronized (UUID_LOCKS) {
            UUID_LOCKS.remove(uuid);
            UUID_LOCKS.notifyAll();
        }
    }

    public static ForeignIdentity retrieveForeignIdentity(IContext context, ISession session) {
        return MendixUtils.retrieveSingleObjectFromDatabase(context, ForeignIdentity.class, "//%s[%s = $userId]",
                new HashMap<String, Object>() {{
                    put("userId", session.getUser(context).getMendixObject().getId());
                }},
                ForeignIdentity.entityName,
                ForeignIdentity.MemberNames.ForeignIdentity_User.toString()
        );
    }

    public static ForeignIdentity retrieveForeignIdentity(IContext c, String uuid) {
        return MendixUtils.retrieveSingleObjectFromDatabase(c, ForeignIdentity.class, "//%s[%s = $uuid]",
                new HashMap<String, Object>() {{
                    put("uuid", uuid);
                }},
                ForeignIdentity.entityName,
                ForeignIdentity.MemberNames.UUID.toString()
        );
    }

    public static ForeignIdentity createForeignIdentity(IContext c, User user, String uuid) throws CoreException {
        final ForeignIdentity foreignIdentity = new ForeignIdentity(c);
        foreignIdentity.setUUID(uuid);
        foreignIdentity.setForeignIdentity_User(user);
        foreignIdentity.commit();

        return foreignIdentity;
    }
}
