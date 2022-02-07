// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// Special characters, e.g., é, ö, à, etc. are supported in comments.

package mendixsso.actions;

import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.webui.CustomJavaAction;
import mendixsso.implementation.utils.OpenIDUtils;

/**
 * Generate a valid strong random password for Mendix user
 */
public class GenerateRandomPassword extends CustomJavaAction<java.lang.String>
{
	private java.lang.Long length;

	public GenerateRandomPassword(IContext context, java.lang.Long length)
	{
		super(context);
		this.length = length;
	}

	@java.lang.Override
	public java.lang.String executeAction() throws Exception
	{
		// BEGIN USER CODE
        return OpenIDUtils.randomStrongPassword(length.intValue(), length.intValue(), 7, 9, 6);
		// END USER CODE
	}

	/**
	 * Returns a string representation of this action
	 */
	@java.lang.Override
	public java.lang.String toString()
	{
		return "GenerateRandomPassword";
	}

	// BEGIN EXTRA CODE
	// END EXTRA CODE
}
