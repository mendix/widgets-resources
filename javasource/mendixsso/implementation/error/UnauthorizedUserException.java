package mendixsso.implementation.error;

public class UnauthorizedUserException extends RuntimeException {

    private final String userUUID;

    public UnauthorizedUserException(String userUUID) {
        this.userUUID = userUUID;
    }

    @Override
    public String getMessage() {
        return String.format("Since the user with uuid %s does not have a role, the user is not authorized to use this application.", this.userUUID);
    }

    @SuppressWarnings("SameReturnValue")
    public String getUserFriendlyMessage() {
        return "Your account does not have app user access to this application. To solve this ask the application Administrator to manage your access. <br>Note that project team membership does not equal app user access. <br>Please read: <a href=\"https://docs.mendix.com/developerportal/settings/general-settings#managing-app-users\">https://docs.mendix.com</a>.";
    }
}