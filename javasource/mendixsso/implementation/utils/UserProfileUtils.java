package mendixsso.implementation.utils;

import com.mendix.systemwideinterfaces.core.IContext;
import com.nimbusds.jose.util.JSONObjectUtils;
import mendixsso.proxies.UserProfile;

import java.text.ParseException;
import java.util.Map;

public class UserProfileUtils {

    private UserProfileUtils() {
    }

    private static final String MX_USER_PROFILE_V_1 = "mx:user:profile:v1";

    public static UserProfile getUserProfile(IContext context, String userInfoJSON) throws ParseException {
        final Map<String, Object> userInfoJSONObject = JSONObjectUtils.parse(userInfoJSON);
        return getUserProfile(context, userInfoJSONObject);
    }

    public static UserProfile getUserProfile(IContext context, Map<String, Object> userInfoJSONObject) throws ParseException {
        final Map<String, Object> mxProfileClaim = JSONObjectUtils.getJSONObject(userInfoJSONObject, MX_USER_PROFILE_V_1);
        return extractUserProfileFromMxProfileClaim(context, mxProfileClaim);
    }

    private static UserProfile extractUserProfileFromMxProfileClaim(IContext context, Map<String, Object> mxProfileClaim) throws ParseException {
        final UserProfile userProfile = new UserProfile(context);

        userProfile.setOpenId(JSONObjectUtils.getString(mxProfileClaim, "openid2_id"));
        userProfile.setDisplayName(JSONObjectUtils.getString(mxProfileClaim, "display_name"));
        userProfile.setAvatarThumbnailUrl(JSONObjectUtils.getString(mxProfileClaim, "avatar_thumb_url"));
        userProfile.setAvatarUrl(JSONObjectUtils.getString(mxProfileClaim, "avatar_url"));
        userProfile.setBio(JSONObjectUtils.getString(mxProfileClaim, "bio"));
        userProfile.setWebsite(JSONObjectUtils.getString(mxProfileClaim, "website"));
        userProfile.setEmailAddress(JSONObjectUtils.getString(mxProfileClaim, "email"));
        userProfile.setPhone(JSONObjectUtils.getString(mxProfileClaim, "phone_number"));
        userProfile.setJobTitle(JSONObjectUtils.getString(mxProfileClaim, "job_title"));
        userProfile.setDepartment(JSONObjectUtils.getString(mxProfileClaim, "job_department"));
        userProfile.setLocation(JSONObjectUtils.getString(mxProfileClaim, "location"));
        userProfile.setCountry(JSONObjectUtils.getString(mxProfileClaim, "country"));
        userProfile.setLinkedIn(JSONObjectUtils.getString(mxProfileClaim, "social_linkedin"));
        userProfile.setTwitter(JSONObjectUtils.getString(mxProfileClaim, "social_twitter"));
        userProfile.setSkype(JSONObjectUtils.getString(mxProfileClaim, "social_skype"));
        userProfile.setCompanyId(JSONObjectUtils.getString(mxProfileClaim, "company_id"));
        userProfile.setCompany(JSONObjectUtils.getString(mxProfileClaim, "company_name"));
        return userProfile;
    }
}
