package appcloudservices;

import java.io.IOException;
import java.util.List;

import system.proxies.User;
import appcloudservices.proxies.microflows.Microflows;
import static appcloudservices.proxies.constants.Constants.getLogNode;

import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.logging.ILogNode;
import com.mendix.m2ee.api.IMxRuntimeRequest;
import com.mendix.m2ee.api.IMxRuntimeResponse;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IMendixObject;
import com.mendix.systemwideinterfaces.core.ISession;
import com.mendix.systemwideinterfaces.core.IUser;

public class SessionInitializer {
	
	public static String USER_ENTITY = "System.User";
	public static String USER_ENTITY_NAME = "Name";
	public static String DEFAULT_MENDIX_USERNAME_ATTRIBUTE = "Name";
	public static final String XASID_COOKIE = "XASID";
	private static final String ORIGIN_COOKIE = "originURI";
	private static final ILogNode LOG = Core.getLogger(getLogNode());
	private static final String XAS_SESSION_ID = Core.getConfiguration().getSessionIdCookieName();
	
	/**
	 * Given a username, starts a new session for the user and redirects back to index.html. 
	 * If no matching account is found for the user, a new account will be created automatically. 
	 * @param resp
	 * @param req
	 * @param user
	 * @return 
	 * @throws CoreException
	 * @throws IOException 
	 * @throws NoSuchMethodException 
	 * @throws SecurityException 
	 */
	static public ISession createSessionForUser(IMxRuntimeResponse resp,
			IMxRuntimeRequest req, IUser user) throws Exception {
		
		LOG.info("User " + user.getName() + " authenticated. Starting session..");
		
		String sessionid = req.getCookie(XAS_SESSION_ID);
	
		ISession session = Core.initializeSession(user, sessionid);
		
		// Used to enable Single Sign Off request (from remote sso *server*); must only sign off user in a particular User Agent / Browser
		String ua = req.getHeader("User-Agent");
		session.setUserAgent(ua);
		
		if (LOG.isDebugEnabled())
			LOG.debug("Created session, fingerprint: " + OpenIDUtils.getFingerPrint(session));
		
		writeSessionCookies(resp, session);
		
		return session;
	}

	public static void writeSessionCookies(IMxRuntimeResponse resp,
			ISession session) {
		resp.addCookie(XAS_SESSION_ID, session.getId().toString(),"/" ,"" ,-1, true );
		resp.addCookie(XASID_COOKIE, "0." + Core.getXASId(),"/" ,"" ,-1, true);
		resp.addCookie(ORIGIN_COOKIE, "/" + OpenIDHandler.OPENID_CLIENTSERVLET_LOCATION + OpenIDHandler.LOGIN, "/", "", -1, false);
	}
	
	public static void redirectToIndex(IMxRuntimeResponse resp, String continuation)
	{
		resp.setStatus(IMxRuntimeResponse.SEE_OTHER);

		//no continuation provided, use index
		if (continuation == null)
			resp.addHeader("location", OpenIDHandler.INDEX_PAGE);
		else {
			if (continuation.trim().startsWith("javascript:")) {
				throw new IllegalArgumentException("Javascript injection detected!");
			} else if (!continuation.startsWith("http://") && !continuation.startsWith("https://")) {
				resp.addHeader("location", OpenIDUtils.APPLICATION_ROOT_URL + continuation);
			} else {
				resp.addHeader("location", continuation);
			}
		}
	}
	
	/**
	 * Finds a user account matching the given username. If not found the new account callback triggered.
	 * @param openID
	 * @return Newly created user or null. 
	 * @throws Throwable 
	 * @throws CoreException
	 */
	public static IUser findOrCreateUser(String openID) throws Throwable {
		IContext c = Core.createSystemContext();
		c.startTransaction();
		try {
			IUser user = findUser(c, openID);
			
			//Existing user
			if (user != null) {
				try {
					Microflows.invokeOnNonFirstLoginAppCloudUser(c, User.initialize(c, user.getMendixObject()));
				}
				catch(Exception e) {
					LOG.warn("Failed to update user roles for '" + openID + "', permissions for this user might be outdated", e);
				}
			}
			
			//New user
			else {
				String basemsg = "User '" + openID + "' does not exist in database. Triggering OnFirstLogin action... ";
				LOG.info(basemsg);
				
				//Expect user input here.
				// Create new user:
				Microflows.invokeOnFirstLoginAppCloudUser(c, openID);
				
				IUser newUser = findUser(c, openID);
				if (newUser != null) {
					LOG.info(basemsg + "Account created.");
					user = newUser;
				}
				
				else {
					LOG.info(basemsg + "No user was created. Rejecting the login request."); 
				}
			}
			
			c.endTransaction();
			return user;
		}
		catch (Throwable e) {
			LOG.warn("Find or create user for openID '" + openID + "' caught exception. Triggering rollback.");
			c.rollbackTransAction();
			throw e;
		}
	}
	
	private static IUser findUser(IContext c, String openID) throws CoreException {
		List<IMendixObject> userList = Core.retrieveXPathQuery(c, String.format("//%s[%s='%s']", USER_ENTITY, USER_ENTITY_NAME, openID));
		
		if (userList.size() > 0) {
			IMendixObject userObject = userList.get(0);
			String username = userObject.getValue(c, DEFAULT_MENDIX_USERNAME_ATTRIBUTE);
			if (LOG.isTraceEnabled())
				LOG.trace("Getting System.User using username: '" + username + "'");
			
			return Core.getUser(c, username);
		} else {
			return null;
		}
	}
}
