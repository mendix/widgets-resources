package appcloudservices;
import com.mendix.m2ee.api.IMxRuntimeRequest;
import com.mendix.m2ee.api.IMxRuntimeResponse;


public interface ILoginHandler
{
	public void onCompleteLogin(String openId, String continuation, IMxRuntimeRequest req, IMxRuntimeResponse resp) throws Exception;
	
	public void onCompleteAnonymousLogin(String continuation, IMxRuntimeRequest req, IMxRuntimeResponse resp) throws Exception;
	
}
