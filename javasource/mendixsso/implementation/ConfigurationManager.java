
package mendixsso.implementation;

import mendixsso.implementation.utils.OpenIDUtils;
import mendixsso.proxies.constants.Constants;

import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

public final class ConfigurationManager {

    private final ConcurrentHashMap<String, Object> cache = new ConcurrentHashMap<>();

    private ConfigurationManager() {
    }

    private static class SingletonInstanceHolder {
        private static final ConfigurationManager INSTANCE = new ConfigurationManager();
    }

    public static ConfigurationManager getInstance() {
        return SingletonInstanceHolder.INSTANCE;
    }

    public String loadValueFromEnvOrDefault(String envVarName, String defaultValue) {
        return loadValueFromEnvOrDefault(envVarName, defaultValue, Function.identity());
    }

    public <T> T loadValueFromEnvOrDefault(String envVarName, T defaultValue, Function<String, T> convertFromString) {
        //noinspection unchecked
        return (T) cache.computeIfAbsent(envVarName, _key -> {
            var envVariableVal = System.getenv(envVarName);
            if (null != envVariableVal) {
                return convertFromString.apply(envVariableVal);
            } else {
                return defaultValue;
            }
        });
    }

    public String getEnvironmentPassword() {
        return loadValueFromEnvOrDefault(
                "MendixSSO_EnvironmentPassword",
                Constants.getEnvironmentPassword()
        );
    }

    public String getEnvironmentUUID() {
        return loadValueFromEnvOrDefault(
                "MendixSSO_EnvironmentUUID",
                Constants.getEnvironmentUUID()
        );
    }

    public String getIndexPage() {

        return OpenIDUtils.ensureStartsWithSlash(
                loadValueFromEnvOrDefault(
                        "MendixSSO_IndexPage",
                        Constants.getIndexPage()
                )
        );
    }

    public String getOpenIdConnectProvider() {
        return loadValueFromEnvOrDefault(
                "MendixSSO_OpenIdConnectProvider",
                Constants.getOpenIdConnectProvider()
        );
    }

    public String getOpenIDConnectScopes() {
        return loadValueFromEnvOrDefault(
                "MendixSSO_OpenIdConnectScopes",
                Constants.getOpenIdConnectScopes()
        );
    }

    public String getRolesLocation() {
        return loadValueFromEnvOrDefault(
                "MendixSSO_RolesLocation",
                Constants.getRolesLocation()
        );
    }

    public String getSignupHint() {
        return loadValueFromEnvOrDefault(
                "MendixSSO_SignupHint",
                Constants.getSignupHint()
        );
    }

    public boolean getSilentAuthentication() {
        return loadValueFromEnvOrDefault(
                "MendixSSO_SilentAuthentication",
                Constants.getSilentAuthentication(),
                Boolean::parseBoolean
        );
    }

    public Long getTokenValidatorMaxClockSkew() {
        return loadValueFromEnvOrDefault(
                "MendixSSO_TokenValidatorMaxClockSkew",
                Constants.getTokenValidatorMaxClockSkew(),
                Long::parseLong
        );
    }
}