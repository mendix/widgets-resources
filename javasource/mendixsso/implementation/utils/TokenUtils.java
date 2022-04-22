package mendixsso.implementation.utils;

import com.mendix.core.CoreException;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.ISession;
import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.oauth2.sdk.ParseException;
import com.nimbusds.oauth2.sdk.token.AccessToken;
import com.nimbusds.openid.connect.sdk.OIDCTokenResponse;
import mendixsso.proxies.Token;
import mendixsso.proxies.TokenType;
import system.proxies.Session;
import system.proxies.User;

import java.util.Date;
import java.util.Map;

import static mendixsso.proxies.microflows.Microflows.encrypt;

public class TokenUtils {

    private TokenUtils() {
    }

    public static JWTClaimsSet persistTokens(IContext context, OIDCTokenResponse oidcTokenResponse, User user, ISession session) throws CoreException, ParseException, java.text.ParseException {
        final Map<String, Object> customParams = oidcTokenResponse.getCustomParameters();

        if (oidcTokenResponse.getTokens().getAccessToken() != null) {
            final AccessToken accessToken = oidcTokenResponse.getTokens().getAccessToken();
            final int accessTokenExpiry = (int) accessToken.getLifetime();

            createToken(context, session, user, TokenType.ACCESS_TOKEN,
                    accessToken.getValue(),
                    accessTokenExpiry);
        }

        if (oidcTokenResponse.getTokens().getRefreshToken() != null) {
            final Long refreshTokenExpiry = (Long) customParams.get("refresh_token_expires_in");
            if (refreshTokenExpiry == null) {
                throw new ParseException("The \"refresh_token_expires_in\" parameter cannot be null");
            }

            createToken(context, session, user, TokenType.REFRESH_TOKEN,
                    oidcTokenResponse.getTokens().getRefreshToken().getValue(),
                    refreshTokenExpiry.intValue());
        }

        final JWT idTokenJWT = oidcTokenResponse.getOIDCTokens().getIDToken();
        if (idTokenJWT != null) {
            final Long idTokenExpiry = (Long) customParams.get("id_token_expires_in");
            if (idTokenExpiry == null) {
                throw new ParseException("The \"id_token_expires_in\" parameter cannot be null");
            }

            createToken(context, session, user, TokenType.ID_TOKEN,
                    idTokenJWT.getParsedString(),
                    idTokenExpiry.intValue());

            return idTokenJWT.getJWTClaimsSet();
        }

        return null;
    }

    private static void createToken(IContext context, ISession session, User user, TokenType tokenType, String value, int expiresIn) throws CoreException {
        final Token newToken = new Token(context);
        newToken.setTokenType(tokenType);
        newToken.setValue(encrypt(context, value));
        newToken.setExpiresIn(expiresIn);
        newToken.setExpiresAt(new Date(System.currentTimeMillis() + expiresIn * 1000L));
        newToken.setToken_Session(Session.initialize(context, session.getMendixObject()));
        newToken.setToken_User(user);
        newToken.commit();
    }
}
