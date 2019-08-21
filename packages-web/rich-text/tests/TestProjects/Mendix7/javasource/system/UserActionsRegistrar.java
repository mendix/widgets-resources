package system;

import aQute.bnd.annotation.component.Component;
import aQute.bnd.annotation.component.Reference;

import com.mendix.core.actionmanagement.IActionRegistrator;

@Component(immediate = true)
public class UserActionsRegistrar
{
  @Reference
  public void registerActions(IActionRegistrator registrator)
  {
    registrator.bundleComponentLoaded();
    registrator.registerUserAction(about.actions.JA_GetApplicationURL.class);
    registrator.registerUserAction(about.actions.JA_GetMendixRuntimeVersion.class);
    registrator.registerUserAction(about.actions.JA_GetModelVersion.class);
    registrator.registerUserAction(about.actions.JA_GetServerAddress.class);
    registrator.registerUserAction(system.actions.VerifyPassword.class);
  }
}
