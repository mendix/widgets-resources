package appcloudservices;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.axiom.util.base64.Base64Utils;
import org.apache.commons.lang.StringUtils;

import com.mendix.core.Core;
import com.mendix.m2ee.api.IMxRuntimeRequest;
import com.mendix.systemwideinterfaces.core.ISession;

public class OpenIDUtils {
	
	public static final String APPLICATION_ROOT_URL = Core.getConfiguration().getApplicationRootUrl() + (Core.getConfiguration().getApplicationRootUrl().endsWith("/")?"":"/");
	
	public static String urlEncode(String value) {
		try {
			return URLEncoder.encode(value, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
	}
	
	public static String base64Encode(byte[] bytes) {
		return Base64Utils.encode(bytes);
	}
	
	public static String getFingerPrint(IMxRuntimeRequest req)
	{
		String agent = req.getHeader("User-Agent");
		if (agent != null)
			return base64Encode(agent.getBytes());
		
		return "";
	}
	
	public static String getFingerPrint(ISession session)
	{
		String agent = session.getUserAgent();
		if (agent != null)
			return base64Encode(agent.getBytes());
		
		return "";
		
	}
	
	public static String getStringConstantValueOrDefault(String key, String defaultValue) {
		String value = Core.getConfiguration().getConstantValue(key).toString();
		if (value == null || value.trim().isEmpty())
			value = defaultValue;

		return value;
	}

	public static String obfuscate(String value) {
		if (value == null)
			return null;
		
		String res = value.substring(0, value.length() / 2);
		return StringUtils.rightPad(res, value.length(), '*');
	}
}
