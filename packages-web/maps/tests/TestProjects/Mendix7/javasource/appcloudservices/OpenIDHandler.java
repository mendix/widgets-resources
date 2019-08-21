package appcloudservices;

import static appcloudservices.OpenIDUtils.APPLICATION_ROOT_URL;
import static appcloudservices.OpenIDUtils.getFingerPrint;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;
import org.openid4java.association.AssociationSessionType;
import org.openid4java.consumer.ConsumerManager;
import org.openid4java.consumer.InMemoryConsumerAssociationStore;
import org.openid4java.consumer.InMemoryNonceVerifier;
import org.openid4java.consumer.VerificationResult;
import org.openid4java.discovery.DiscoveryInformation;
import org.openid4java.discovery.Identifier;
import org.openid4java.message.AuthRequest;
import org.openid4java.message.ParameterList;

import appcloudservices.proxies.constants.Constants;

import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.externalinterface.connector.RequestHandler;
import com.mendix.logging.ILogNode;
import com.mendix.m2ee.api.IMxRuntimeRequest;
import com.mendix.m2ee.api.IMxRuntimeResponse;
import com.mendix.systemwideinterfaces.core.ISession;
import org.openid4java.discovery.DiscoveryException;

public class OpenIDHandler extends RequestHandler {

	public enum ResponseType {
		INTERNAL_SERVER_ERROR("Internal Server Error", IMxRuntimeResponse.INTERNAL_SERVER_ERROR),
		UNAUTHORIZED("Unauthorized", IMxRuntimeResponse.UNAUTHORIZED);

		String title;
		int status;
		ResponseType(String title, int httpStatus) {
			this.title = title;
			this.status = httpStatus;
		}
	}

	public static String OPENID_CLIENTSERVLET_LOCATION = "openid/";
	public static String FALLBACK_LOGINPAGE = "/login.html";
	public static String INDEX_PAGE = "/index.html";
	public static boolean SINGLESIGNOFF_ENABLED = true;

	public static final String CONTINUATION_PARAM = "continuation";
	public static final String IMMEDIATE_PARAM = "immediate";

	public static String INTERNAL_SERVER_ERROR_MESSAGE =
			"<!-- putting IE6-7 in quirks mode -->" +
					"<!doctype html>" +
					"<html class=\"anonymous\">" +
					"    <head>" +
					"        <title>Mendix App Platform</title>" +
					"        <meta charset=\"utf-8\">" +
					"        <!-- keeping IE8-9 in standards mode -->" +
					"        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">" +
					"        <meta name=\"robots\" content=\"noindex, nofollow\">" +
					"        <link rel=\"stylesheet\" href=\"https://home.mendix.com/muxbar/styles/muxnav.css\">" +
					"    </head>" +
					"    <body class=\"muxnav-enabled\">" +
					"        <table class=\"anonymous-box-wrapper\" style=\"text-align: center\">" +
					"            <tr>" +
					"                <td class=\"anonymous-logo-wrapper\"><img src=\"https://home.mendix.com/ui/theme-mxid/images/login/logo.png\" alt=\"Mendix\"></td>" +
					"            </tr>" +
					"            <tr>" +
					"                <td class=\"noside_nodewrapper\"><div class=\"mx-text-h1\">{{title}}</div></td>" +
					"            </tr>" +
					"            <tr>" +
					"                <td class=\"noside_nodewrapper\"><div class=\"mx-text-h3\"><p>{{message}}</p></div></td>" +
					"            </tr>" +
					"            <tr>" +
					"                <td class=\"noside_nodewrapper\"><div class=\"mx-text-h3\"><p><a href=\"/openid/login\">Try again</a> or contact your app administrator if this problem persists</p></div></td>" +
					"            </tr>" +
					"        </table>" +
					"    </body>" +
					"</html>";

	private static final String CALLBACK = "callback";
	public static final String LOGIN = "login";
	private static final String FORCE_LOGOFF = "force_logoff";
	public static final String LOGOFF = "logoff";

	private static final String OPENID_PROVIDER = Constants.getOpenIdProvider();
	private static final boolean OPENID_ENABLED = Constants.getOpenIdEnabled();

	private static final String OPENID_RETURN_URL = APPLICATION_ROOT_URL + OPENID_CLIENTSERVLET_LOCATION + CALLBACK;
	private static final String OPENID_LOGOFF_URL = APPLICATION_ROOT_URL + OPENID_CLIENTSERVLET_LOCATION + FORCE_LOGOFF;

	private DiscoveryInformation discovered;
	private List<?> discoveries;
	private ConsumerManager manager;
	private static final ILogNode LOG = Core.getLogger(Constants.getLogNode());

	private boolean started = false;
	public static ILoginHandler loginHandler = new DefaultLoginHandler();

	public OpenIDHandler() {
		if (!OPENID_ENABLED) {
			LOG.info("NOT starting OpenId handler, disabled by configuration");
		} else {
			reconnectToMxID();
		}
	}

	private void reconnectToMxID() {
		LOG.info("Starting OpenId handler ... OpenIDReturnURL = " + OPENID_RETURN_URL + "; OpenIdProvider: " + OPENID_PROVIDER);
		try {

			manager = new ConsumerManager();
			manager.setAssociations(new InMemoryConsumerAssociationStore());
			manager.setNonceVerifier(new InMemoryNonceVerifier(5000));
			manager.setMinAssocSessEnc(AssociationSessionType.DH_SHA256);
			manager.getRealmVerifier().setEnforceRpId(true);

			discoveries = manager.discover(OPENID_PROVIDER);
			discovered = manager.associate(discoveries);

			started = true;
			LOG.info("Starting OpenId handler ... DONE");

		} catch (DiscoveryException e) {
			LOG.error("Failed to discover OpenId service: " + e.getMessage(), e);
		}
	}

	private static final Set<String> OPENID_LOCKS = new HashSet<String>();

	public static void lockOpenID(String openID) throws InterruptedException {
		synchronized (OPENID_LOCKS) {
			while (OPENID_LOCKS.contains(openID))
				OPENID_LOCKS.wait();
			OPENID_LOCKS.add(openID);
		}
	}

	public static void unlockOpenID(String openID) {
		synchronized (OPENID_LOCKS) {
			OPENID_LOCKS.remove(openID);
			OPENID_LOCKS.notifyAll();
		}
	}

	/**
	 * Handles openId related requests. Two requests are supported:
	 * 'openid/login': tries to setup a new user session. (Note: does not check if there is already a session)
	 * 'openid/callback': used by the openId provider to confirm the identity of the current user
	 */
	@Override
	public void processRequest(IMxRuntimeRequest req, IMxRuntimeResponse resp,
							   String path) throws Exception {

		//always force expiration on this handler!
		resp.addHeader("Expires", "0");

		if (LOG.isDebugEnabled())
			LOG.debug("Incoming request: " + path + " fingerprint: " + getFingerPrint(req));

		if (!OPENID_ENABLED) {
			LOG.info("NOT handling SSO request, disabled by configuration, redirecting to login.html");
			redirect(resp, FALLBACK_LOGINPAGE);
			return;
		}

		if (!started) {
			reconnectToMxID();
		}

		if (!started) {
			LOG.error("NOT handling SSO request, could not connect to MxID 2.0, redirecting to login.html");
			redirect(resp, FALLBACK_LOGINPAGE);
			return;
		}

		try {
			if (LOGOFF.equalsIgnoreCase(path)) {
				logoff(req, resp); //requesting Single Sign Off (from client)
			} else if (FORCE_LOGOFF.equalsIgnoreCase(path)) {
				forceLogoff(req, resp); //requesting Single Sign Off (from server)
			} else if (LOGIN.equalsIgnoreCase(path)) {
				login(req, resp); //requesting authorization
			} else if (CALLBACK.equalsIgnoreCase(path)) {
				callback(req, resp); //redirect from open id provider
			} else {
				error(resp, ResponseType.INTERNAL_SERVER_ERROR, "Unsupported request '" + path + "'", null);
			}
		} catch (Exception e) {
			error(resp, ResponseType.INTERNAL_SERVER_ERROR, "An unexpected exception occurred while handling request " + path, e);
		}
	}

	private void callback(IMxRuntimeRequest req, IMxRuntimeResponse resp) throws Exception {
		LOG.debug("Callback from OpenID provider, evaluating..");

		HttpServletRequest origreq = req.getHttpServletRequest();

		//verification request?
		if (origreq.getMethod().equals("HEAD")) {
			handleHeadRequest(resp);
		} else if (req.getHeader("Accept") != null && req.getHeader("Accept").contains("application/xrds+xml")) {
			handleXrds(resp);
		} else {
			ParameterList openidResp = new ParameterList(origreq.getParameterMap());

			String mxid2Continuation = req.getParameter("mxid2.continuation");
			detectContinuationJsInjection(mxid2Continuation);

			String mode = openidResp.getParameter("openid.mode").getValue();
			if ("setup_needed".equalsIgnoreCase(mode)) {
				/*
				 * original request mode is immediate, because checkid setup would not have returned id_res without verified ID. 
				 * Return to return url, but without identity.
				 * 
				 * @See http://openid.net/specs/openid-authentication-2_0.html#negative_assertions
				 */
				if (LOG.isDebugEnabled())
					LOG.debug("Immediate authentication responded with setup_needed. Assuming that the app should continue as anonymous. ");

				loginHandler.onCompleteAnonymousLogin(mxid2Continuation, req, resp);
			} else if ("id_res".equals(mode)) {
				handleIdRes(req, resp, origreq, openidResp, mxid2Continuation);
			} else if ("cancel".equals(mode)) {
				LOG.warn("OpenId login failed: cancelled");
				resp.setStatus(IMxRuntimeResponse.UNAUTHORIZED);
				error(resp, ResponseType.UNAUTHORIZED, "OpenId login failed. Please try again later.", null);
			} else
				throw new IllegalStateException("Unexpected OpenID callback mode: " + mode);
		}
	}

	private void handleXrds(IMxRuntimeResponse resp) throws IOException {
		LOG.info("Found local discovery of RP return_url endpoint.");

		resp.setContentType("application/xrds+xml; charset=UTF-8");
		resp.getWriter().write(
				"<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
						"<xrds:XRDS xmlns:xrds=\"xri://$xrds\" xmlns=\"xri://$xrd*($v*2.0)\"" +
						" xmlns:openid=\"http://openid.net/xmlns/1.0\">" +
						"<XRD>" +
						"<Service>" +
						"<Type>http://specs.openid.net/auth/2.0/return_to</Type>" +
						"<URI>" + OPENID_RETURN_URL + "</URI>" +
						"</Service>" +
						"</XRD>" +
						"</xrds:XRDS>");
		resp.getWriter().close();
	}

	private void handleHeadRequest(IMxRuntimeResponse resp) {
		LOG.debug("Callback from OpenID provider, evaluating.. HEAD request not supported, ignoring.");
		resp.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED); //405 - Method Not Allowed
	}

	private void handleIdRes(IMxRuntimeRequest req, IMxRuntimeResponse resp, HttpServletRequest origreq,
							 ParameterList openidResp, String mxid2Continuation) throws Exception {
		// extract the receiving URL from the HTTP request
		StringBuffer receivingURL = new StringBuffer(OPENID_RETURN_URL);

		String queryString = origreq.getQueryString();
		if (queryString != null && queryString.length() > 0)
			receivingURL.append("?").append(origreq.getQueryString());

		// verify the response
		LOG.info("[OpenID Verify Response] receivingurl: " + receivingURL + "; to: " + openidResp.getParameter("openid.return_to"));
		VerificationResult verification = manager.verify(receivingURL.toString(), openidResp, discovered);

		// examine the verification result and extract the verified identifier
		Identifier verified = verification.getVerifiedId();

		if (verified != null) {
			String userId = verified.getIdentifier();
			lockOpenID(userId);
			try {
				loginHandler.onCompleteLogin(userId, mxid2Continuation, req, resp);
			} finally {
				unlockOpenID(userId);
			}
		} else {
			LOG.warn("OpenId authentication failed: " + verification.getStatusMsg());
			resp.setStatus(IMxRuntimeResponse.UNAUTHORIZED);
			error(resp, ResponseType.UNAUTHORIZED, "OpenId authentication request failed. Please try again later.", null);
		}
	}

	private void login(IMxRuntimeRequest req, IMxRuntimeResponse resp) throws Exception {
		String continuation = req.getParameter(CONTINUATION_PARAM);
		detectContinuationJsInjection(continuation);

		//special case 1: already a valid session, do not bother with a new login
		ISession session = this.getSessionFromRequest(req);
		if (session != null && !session.getUser().isAnonymous()) {

			//Logout old session and initialize new session. This will allow for role changes to take effect.
			String userId = session.getUser().getName();
			lockOpenID(userId);
			try {
				loginHandler.onCompleteLogin(userId, continuation, req, resp);
				Core.logout(session);
			} finally {
				unlockOpenID(userId);
			}
		} else if (!started) {
			//special case 2: no OpenID provider discovered
			LOG.warn("OpenId handler is in state 'NOT STARTED'. Falling back to default login.html");
			redirect(resp, FALLBACK_LOGINPAGE);
		} else {
			LOG.debug("Incoming login request, redirecting to OpenID provider");

			AuthRequest authReq = manager.authenticate(discovered, OPENID_RETURN_URL);
			authReq.setImmediate("true".equalsIgnoreCase(req.getParameter(IMMEDIATE_PARAM)));

			String url = authReq.getDestinationUrl(true);

			//MWE: publish the url which can be used to sign off
			if (SINGLESIGNOFF_ENABLED)
				url += "&mxid2.logoffcallback=" +  OpenIDUtils.urlEncode(OPENID_LOGOFF_URL);

			if (continuation != null)
				url += "&mxid2.continuation=" +  OpenIDUtils.urlEncode(continuation);

			redirect(resp, url);
		}
	}

	private void forceLogoff(IMxRuntimeRequest req, IMxRuntimeResponse resp) {
		String username = req.getParameter("openid");
		String fingerprint = req.getParameter("fingerprint");

		if (SINGLESIGNOFF_ENABLED)
			forceSessionLogoff(username, fingerprint);
		else
			LOG.warn("Received force_logoff request, but single sign off is not unabled in the configuration!");

		resp.setStatus(IMxRuntimeResponse.OK);
		resp.setContentType("text/plain");
	}

	private void logoff(IMxRuntimeRequest req, IMxRuntimeResponse resp) throws CoreException {
		if (SINGLESIGNOFF_ENABLED) {
			resp.addCookie(getSessionCookieName(), "", "/", "", 0, true);
			resp.addCookie(SessionInitializer.XASID_COOKIE, "", "/", "", 0, true);
			resp.setStatus(IMxRuntimeResponse.SEE_OTHER);
			resp.addHeader("location", OPENID_PROVIDER + "/../" + LOGOFF);
		} else {
			ISession ses = this.getSessionFromRequest(req);
			if (ses != null) {
				Core.logout(ses);
			}
			redirect(resp, INDEX_PAGE);
		}
	}

	private void detectContinuationJsInjection(String url) {
		if (url != null && url.trim().startsWith("javascript:"))
			throw new IllegalArgumentException("Javascript injection detected in parameter '" + CONTINUATION_PARAM + "'");
	}

	private void forceSessionLogoff(String username, String fingerprint) {
		String basemsg = String.format("Received logoff request for '%s' with fingerprint '%s'... ", username, fingerprint);
		LOG.debug(basemsg);

		List<ISession> sessionsOfThisUser = new ArrayList<>();
		for (ISession session : Core.getActiveSessions()) {
			if (session.getUser() != null &&
					session.getUser().getName() != null &&
					session.getUser().getName().equals(username))
				sessionsOfThisUser.add(session);
		}

		if (sessionsOfThisUser.isEmpty())
			LOG.debug(basemsg + "IGNORING. User has no active sessions");
		else {
			boolean found = false;
			for (ISession session : sessionsOfThisUser) {
				if (getFingerPrint(session).equals(fingerprint)) {
					Core.logout(session);
					found = true;
				}
			}

			if (found)
				LOG.info(basemsg + "SUCCESS. Session removed.");
			else
				LOG.warn(basemsg + "FAILED. User has active sessions but none matches the provided fingerprint. ");
		}
	}

	public static void error(IMxRuntimeResponse resp, ResponseType responseType, String message, Throwable e) throws IOException {
		resp.setStatus(responseType.status);
		resp.getWriter().write(
				INTERNAL_SERVER_ERROR_MESSAGE
						.replace("{{message}}", StringEscapeUtils.escapeHtml(message))
						.replace("{{title}}", StringEscapeUtils.escapeHtml(responseType.title))
		);
		if (e != null)
			LOG.error("Error while handling OpenID request: " + responseType.title + ":\n" + message + ": " + e.getMessage(), e);
		else
			LOG.error("Error while handling OpenID request: " + responseType.title + ":\n" + message);
	}

	private void redirect(IMxRuntimeResponse resp, String url) {
		resp.setStatus(IMxRuntimeResponse.SEE_OTHER);
		resp.addHeader("location", url);
	}
}
