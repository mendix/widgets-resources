package mendixsso.implementation.handlers;

import com.mendix.m2ee.api.IMxRuntimeRequest;
import com.mendix.m2ee.api.IMxRuntimeResponse;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.ISession;
import com.nimbusds.oauth2.sdk.ParseException;
import com.nimbusds.openid.connect.sdk.OIDCTokenResponse;
import mendixsso.implementation.SessionManager;
import mendixsso.implementation.UserManager;
import mendixsso.implementation.error.IncompatibleUserTypeException;
import mendixsso.implementation.error.UnauthorizedUserException;
import mendixsso.implementation.utils.ErrorUtils;
import mendixsso.implementation.utils.OpenIDUtils;
import mendixsso.proxies.UserProfile;
import system.proxies.User;


public class DefaultLoginHandler implements ILoginHandler {

    @Override
    public void onCompleteLogin(IContext context, UserProfile userProfile, OIDCTokenResponse oidcTokenResponse, String continuation, IMxRuntimeRequest req, IMxRuntimeResponse resp) {
        final User user;
        try {
            user = UserManager.findOrCreateUser(userProfile);
        } catch (UnauthorizedUserException e) {
            ErrorUtils.serveError(req, resp, ErrorUtils.ResponseType.UNAUTHORIZED, e.getUserFriendlyMessage(), e.getMessage(), true, null);
            return;
        } catch (IncompatibleUserTypeException e) {
            ErrorUtils.serveError(req, resp, ErrorUtils.ResponseType.INCOMPATIBLE_USER_TYPE_ERROR, e.getMessage(), false, e);
            return;
        } catch (Exception e) {
            ErrorUtils.serveError(req, resp, ErrorUtils.ResponseType.INTERNAL_SERVER_ERROR, "We failed to register your account in this app. Please try again later or contact the administrator of this app.", false, e);
            return;
        }

        try {
            SessionManager.createSessionForUser(context, resp, req, user, oidcTokenResponse);
            OpenIDUtils.redirectToIndex(req, resp, continuation);
        } catch (ParseException e) {
            ErrorUtils.serveError(req, resp, ErrorUtils.ResponseType.INTERNAL_SERVER_ERROR, "Unexpected IdP server response: " + e.getMessage(), false, e);
        } catch (Exception e) {
            ErrorUtils.serveError(req, resp, ErrorUtils.ResponseType.INTERNAL_SERVER_ERROR, "Failed to initialize session", false, e);
        }
    }

    @Override
    public void onAlreadyHasSession(IContext context, User user, ISession session, String uuid, String continuation, IMxRuntimeRequest req, IMxRuntimeResponse resp) {
        try {
            UserManager.authorizeUser(user, uuid);
        } catch (UnauthorizedUserException e) {
            ErrorUtils.serveError(req, resp, ErrorUtils.ResponseType.UNAUTHORIZED, e.getUserFriendlyMessage(), e.getMessage(), true, null);
            return;
        } catch (Exception e) {
            ErrorUtils.serveError(req, resp, ErrorUtils.ResponseType.INTERNAL_SERVER_ERROR, "We failed to register your account in this app. Please try again later or contact the administrator of this app.", false, e);
            return;
        }

        try {
            SessionManager.writeSessionCookies(session, resp);
            OpenIDUtils.redirectToIndex(req, resp, continuation);
        } catch (Exception e) {
            ErrorUtils.serveError(req, resp, ErrorUtils.ResponseType.INTERNAL_SERVER_ERROR, "Failed to initialize session", false, e);
        }
    }

}
