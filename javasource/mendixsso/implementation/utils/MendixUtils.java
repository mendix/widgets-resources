package mendixsso.implementation.utils;

import com.mendix.core.Core;
import com.mendix.datastorage.XPathBasicQuery;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IMendixIdentifier;
import com.mendix.systemwideinterfaces.core.IMendixObject;
import org.apache.commons.lang3.exception.ExceptionUtils;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public final class MendixUtils {

    private MendixUtils() {
    }

    private static <T> List<T> mendixObjectListToProxyObjectList(final IContext context, final List<IMendixObject> list, final Class<T> cls) {
        return list
                .stream()
                .map(mendixObject -> mendixObjectToProxyObject(context, mendixObject, cls))
                .collect(Collectors.toList());
    }

    private static <T> T mendixObjectToProxyObject(final IContext context, final IMendixObject mendixObject, final Class<T> cls) {
        if (mendixObject != null) {
            try {
                final Method initialize = cls.getMethod("initialize", IContext.class, IMendixObject.class);
                //noinspection unchecked
                return (T) initialize.invoke(null, context, mendixObject);
            } catch (InvocationTargetException | IllegalAccessException | NoSuchMethodException e) {
                return ExceptionUtils.rethrow(e);
            }
        } else {
            return null;
        }
    }

    public static <T> List<T> retrieveFromDatabase(final IContext context, final Class<T> cls, final String xPathExpr,
                                                   final Map<String, Object> xPathVariables, Object... xPathArgs) {

        final XPathBasicQuery query = Core.createXPathQuery(String.format(xPathExpr, xPathArgs));

        if (xPathVariables != null && !xPathVariables.isEmpty()) {
            for (Map.Entry<String, Object> arg : xPathVariables.entrySet()) {
                setQueryVariable(query, arg.getKey(), arg.getValue());
            }
        }

        final List<IMendixObject> results = query.execute(context);
        return mendixObjectListToProxyObjectList(context, results, cls);
    }

    public static <T> T retrieveSingleObjectFromDatabase(final IContext context, final Class<T> cls, final String xPathExpr,
                                                         final Map<String, Object> xPathVariables, Object... xPathArgs) {
        final List<T> results = retrieveFromDatabase(context, cls, xPathExpr, xPathVariables, xPathArgs);
        if (results.size() > 1) {
            throw new RuntimeException("Found multiple " + cls.getCanonicalName() + " objects where only a single result was expected for query");
        }
        return head(results);
    }

    private static void setQueryVariable(final XPathBasicQuery query, final String key, final Object val) {

        if (val instanceof BigDecimal) {
            query.setVariable(key, (BigDecimal) val);
        } else if (val instanceof Boolean) {
            query.setVariable(key, (boolean) val);
        } else if (val instanceof Double) {
            query.setVariable(key, (double) val);
        } else if (val instanceof Integer) {
            query.setVariable(key, (int) val);
        } else if (val instanceof Long) {
            query.setVariable(key, (long) val);
        } else if (val instanceof IMendixObject) {
            query.setVariable(key, (IMendixObject) val);
        } else if (val instanceof IMendixIdentifier) {
            query.setVariable(key, (IMendixIdentifier) val);
        } else if (val instanceof String) {
            query.setVariable(key, val.toString());
        } else {
            throw new RuntimeException("Unsupported variable type: " + val.getClass().getCanonicalName() + " provided for key: " + key);
        }
    }

    private static <T> T head(final List<T> list) {
        if (list != null) {
            return (!list.isEmpty() ? list.get(0) : null);
        } else {
            return null;
        }
    }

}
