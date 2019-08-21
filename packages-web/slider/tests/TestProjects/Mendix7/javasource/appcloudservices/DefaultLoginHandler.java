package appcloudservices;
import java.io.IOException;

import appcloudservices.OpenIDHandler.ResponseType;

import com.mendix.core.CoreException;
import com.mendix.m2ee.api.IMxRuntimeRequest;
import com.mendix.m2ee.api.IMxRuntimeResponse;
import com.mendix.systemwideinterfaces.core.IUser;


public class DefaultLoginHandler implements ILoginHandler
{

	public void onCompleteLogin(String openId, String continuation, IMxRuntimeRequest req, IMxRuntimeResponse resp)
		throws CoreException, IllegalStateException, IOException
	{
		IUser user = null;
		try {
			user = SessionInitializer.findOrCreateUser(openId);
		}
		catch(Throwable e) {
			OpenIDHandler.error(resp, ResponseType.INTERNAL_SERVER_ERROR, "We failed to register your account in this app. Please try again later or contact the administrator of this app.", e);
			return;
		}
		
		if (user == null) { 
			OpenIDHandler.error(resp, ResponseType.UNAUTHORIZED, "Your account has not been authorized to use this application. ", null);
		} else if (user.getUserRoleNames().size() == 0) {
			OpenIDHandler.error(resp, ResponseType.UNAUTHORIZED, "Your account has not been authorized to use this application. No permissions for this app have been assigned to your account. ", null);
		} else {
			try {
				SessionInitializer.createSessionForUser(resp, req, user);
				SessionInitializer.redirectToIndex(resp, continuation);
			} catch (Exception e) {
				OpenIDHandler.error(resp, ResponseType.INTERNAL_SERVER_ERROR, "Failed to initialize session", e);
			}
		}
	}
	
	public void onCompleteAnonymousLogin(String continuation, IMxRuntimeRequest req, IMxRuntimeResponse resp)
			throws CoreException, IllegalStateException, IOException
	{
		try {
			/** Setting up guest sessions is not the responsibility of this module, but otherwise:
				if (Core.getConfiguration().getEnableGuestLogin()) {
					ISession session = Core.initializeGuestSession();
					SessionInitializer.writeSessionCookies(resp, session);
				}
			*/
			SessionInitializer.redirectToIndex(resp, continuation);
		} catch (Exception e) {
			OpenIDHandler.error(resp, ResponseType.INTERNAL_SERVER_ERROR, "Failed to initialize session", e);
		}
	}

}
