package mendixsso.implementation.handlers;

import com.mendix.m2ee.api.IMxRuntimeRequest;
import com.mendix.m2ee.api.IMxRuntimeResponse;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.ISession;
import com.nimbusds.openid.connect.sdk.OIDCTokenResponse;
import mendixsso.proxies.UserProfile;
import system.proxies.User;


interface ILoginHandler {

    void onCompleteLogin(IContext context, UserProfile openId, OIDCTokenResponse oidcTokenResponse, String continuation, IMxRuntimeRequest req, IMxRuntimeResponse resp);

    void onAlreadyHasSession(IContext context, User user, ISession session, String uuid, String continuation, IMxRuntimeRequest req, IMxRuntimeResponse resp);

}
