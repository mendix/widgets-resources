package appcloudservices;

import java.util.Enumeration;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.LogManager;
import java.util.logging.LogRecord;

import org.apache.commons.logging.LogConfigurationException;
import org.apache.commons.logging.LogFactory;

import com.mendix.core.Core;
import com.mendix.logging.ILogNode;

public class CommonsLoggingListener extends Handler
{
	private static CommonsLoggingListener listenerInstance;
	private static Set<String> registeredLoggers ;

	static {
		registeredLoggers = new HashSet<String>();
		listenerInstance = new CommonsLoggingListener();
		CommonsLoggingListener.listenToCommonsLogging("org.openid4java");
	}
	
	private CommonsLoggingListener()
	{
		// hidden empty constructor
	}

	
	//MWE: move this function to communitycommons, or better, to the runtime. 
	public synchronized static void listenToCommonsLogging(String filter)
	{
		try {
			//Note that this does not pick up all runtime initizalid loggers, only the static initialized ones. That is good enough for openid4java though. 
			Enumeration<String> it = LogManager.getLogManager().getLoggerNames();
			while (it.hasMoreElements()) {
				String logName = it.nextElement();
				if (filter == null || logName.contains(filter))
					followCommonsLog(listenerInstance, logName);
			}
		}
		catch(Exception e) {
			Core.getLogger(CommonsLoggingListener.class.getSimpleName()).error("Failed to setup log listener: " + e.getMessage(), e);
		}
	}

	private static void followCommonsLog(CommonsLoggingListener logger, String logName)
		throws LogConfigurationException, SecurityException
	{
		if (registeredLoggers.contains(logName)) //make sure no log is registered twice!
			return;

		Core.getLogger(CommonsLoggingListener.class.getName()).info("Now listening to " + logName);
		registeredLoggers.add(logName);
		org.apache.commons.logging.impl.Jdk14Logger lognode = (org.apache.commons.logging.impl.Jdk14Logger) LogFactory.getLog(logName);
		lognode.getLogger().addHandler(logger);
	}

	@Override
	public void close()
		throws SecurityException
	{
		//
		
	}

	@Override
	public void flush()
	{
		//		
	}

	@Override
	public void publish(LogRecord record)
	{
		/*
		  @see java.util.logging.Level;
		  public static final Level OFF = new Level("OFF", 2147483647, defaultBundle);
		  public static final Level SEVERE = new Level("SEVERE", 1000, defaultBundle);
		  public static final Level WARNING = new Level("WARNING", 900, defaultBundle);
		  public static final Level INFO = new Level("INFO", 800, defaultBundle);
		  public static final Level CONFIG = new Level("CONFIG", 700, defaultBundle);
		  public static final Level FINE = new Level("FINE", 500, defaultBundle);
		  public static final Level FINER = new Level("FINER", 400, defaultBundle);
		  public static final Level FINEST = new Level("FINEST", 300, defaultBundle);
		  public static final Level ALL = new Level("ALL", -2147483648, defaultBundle);
		 */
		if (record.getLevel() == Level.OFF || record.getLevel() == Level.ALL) //These loglevels should not be used inside a log record
			return;
		
		ILogNode logNode = Core.getLogger(record.getLoggerName());
		int loglevel = record.getLevel().intValue();
		
		if (loglevel < Level.INFO.intValue() && !logNode.isDebugEnabled())
			return;
		if (loglevel < Level.FINER.intValue() && !logNode.isTraceEnabled())
			return;
			
		Throwable ex = record.getThrown();
		if (loglevel < Level.FINER.intValue())
			logNode.trace(record.getMessage(), ex);
		else if (loglevel < Level.INFO.intValue())
			logNode.debug(record.getMessage(), ex);
		else if (ex != null)
			logNode.error(record.getMessage(), ex);
		else
			logNode.info(record.getMessage());
	}

}
