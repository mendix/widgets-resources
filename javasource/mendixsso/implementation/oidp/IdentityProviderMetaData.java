package mendixsso.implementation.oidp;

import com.nimbusds.oauth2.sdk.ResponseType;
import com.nimbusds.oauth2.sdk.auth.Secret;
import com.nimbusds.oauth2.sdk.id.ClientID;
import com.nimbusds.openid.connect.sdk.op.OIDCProviderMetadata;
import com.nimbusds.openid.connect.sdk.validators.IDTokenValidator;

import java.util.Date;

public class IdentityProviderMetaData {

    private final ClientID clientId;

    private final Secret clientSecret;

    private final OIDCProviderMetadata providerMetadata;

    private final IDTokenValidator idTokenValidator;

    private final ResponseType responseType;

    private final Date lastCached;

    IdentityProviderMetaData(ClientID clientId, String clientSecret,
                             OIDCProviderMetadata providerMetadata, IDTokenValidator idTokenValidator, ResponseType responseType) {
        this.clientId = clientId;
        this.clientSecret = new Secret(clientSecret);
        this.providerMetadata = providerMetadata;
        this.idTokenValidator = idTokenValidator;
        this.responseType = responseType;
        this.lastCached = new Date();
    }

    public ClientID getClientId() {
        return clientId;
    }

    public Secret getClientSecret() {
        return clientSecret;
    }

    public OIDCProviderMetadata getProviderMetadata() {
        return providerMetadata;
    }

    public IDTokenValidator getIdTokenValidator() {
        return idTokenValidator;
    }

    public ResponseType getResponseType() {
        return responseType;
    }

    boolean isExpired() {
        final Date expirationDate = new Date(new Date().getTime() - 24 * 3600 * 1000L);
        return this.lastCached.before(expirationDate);
    }
}