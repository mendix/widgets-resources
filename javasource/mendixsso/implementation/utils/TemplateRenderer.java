package mendixsso.implementation.utils;

import com.mendix.core.Core;
import com.mendix.logging.ILogNode;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

class TemplateRenderer {

    TemplateRenderer() {
    }

    private static final ILogNode LOG = Core.getLogger("TemplateRenderer");
    private static final Map<String, List<String>> fileCache = new ConcurrentHashMap<>();

    public static String render(String fileName, TemplateVariables templateVars) throws IOException {
        fileName = StringUtils.trimToNull(fileName);
        if (fileName == null) {
            throw new IllegalArgumentException("fileName cannot be null or empty.");
        }

        if (templateVars == null) {
            throw new IllegalArgumentException("templateVars cannot be null.");
        }

        return render(readAllLines(fileName), templateVars);
    }

    private static List<String> readAllLines(String fileName) throws IOException {
        List<String> lines = fileCache.get(fileName);
        if (lines == null) {
            synchronized (fileCache) {
                lines = fileCache.get(fileName);
                if (lines == null) {
                    lines = Files.readAllLines(new File(fileName).toPath());
                    LOG.info("Caching file : " + fileName);
                    fileCache.put(fileName, lines);
                }
            }
        }
        return lines;
    }

    private static String render(List<String> lines, TemplateVariables templateVars) {
        if (lines == null) {
            throw new IllegalArgumentException("lines cannot be null.");
        }

        // this will fix caching for our internal HTML templates, on every restart this value will be recalculated
        // so probably we want something that on deployment injects a certain value
        templateVars.putString(TemplateVariables.CACHE_BUST_UUID_KEY, TemplateVariables.CACHE_BUST_UUID_VALUE);

        return lines.stream().map(line -> {
            String replacedLine = line;
            for (final Map.Entry<String, String> entry : templateVars.entrySet()) {
                final String key = entry.getKey();
                final String value = entry.getValue();
                if (value != null) {
                    replacedLine = StringUtils.replace(replacedLine, key, value);
                } else {
                    replacedLine = StringUtils.replace(replacedLine, key, "");
                }
            }
            return replacedLine;
        }).collect(Collectors.joining(System.lineSeparator()));
    }

}
