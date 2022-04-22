package mendixsso.implementation.utils;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.text.StringEscapeUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

class TemplateVariables {

    static final String CACHE_BUST_UUID_KEY = "{{__MX_CACHE_BUST__}}";
    static final String CACHE_BUST_UUID_VALUE = UUID.randomUUID().toString();
    private final Map<String, String> parameters = new HashMap<>();

    public void putString(String key, String value) {
        put(key, StringEscapeUtils.escapeHtml4(value));
    }

    public void putHtml(String key, String value) {
        put(key, value);
    }

    private void put(String key, String value) {
        parameters.put(key, StringUtils.isEmpty(value) ? "" : value);
    }

    Set<Map.Entry<String, String>> entrySet() {
        return parameters.entrySet();
    }
}
