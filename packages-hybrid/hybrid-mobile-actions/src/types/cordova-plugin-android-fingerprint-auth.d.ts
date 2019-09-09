// Typings for https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth

interface Window {
    FingerprintAuth?: FingerprintAuth;
}

interface FingerprintAuth {
    isAvailable(isAvailableSuccess: (results: IsAvailableSuccess) => void, isAvailableError: (message: string) => void);
    encrypt(
        encryptConfig: EncryptionConfig,
        successCallback: (result: EncryptResult) => void,
        errorCallback: (error: any) => void
    );
    decrypt(
        decryptConfig: DecryptionConfig,
        successCallback: (result: any) => void,
        errorCallback: (error: any) => void
    );
    delete(deleteConfg: DeleteConfg, successCallback: (result: any) => void, errorCallback: (error: any) => void);
    dismiss(successCallback: (result: any) => void, errorCallback: (error: any) => void);
    ERRORS: Errors;
}

interface Errors {
    BAD_PADDING_EXCEPTION: "BAD_PADDING_EXCEPTION";
    CERTIFICATE_EXCEPTION: "BAD_PADDING_EXCEPTION";
    FINGERPRINT_CANCELLED: "FINGERPRINT_CANCELLED";
    FINGERPRINT_DATA_NOT_DELETED: "FINGERPRINT_DATA_NOT_DELETED";
    FINGERPRINT_ERROR: "FINGERPRINT_ERROR";
    FINGERPRINT_NOT_AVAILABLE: "FINGERPRINT_NOT_AVAILABLE";
    FINGERPRINT_PERMISSION_DENIED: "FINGERPRINT_PERMISSION_DENIED";
    FINGERPRINT_PERMISSION_DENIED_SHOW_REQUEST: "FINGERPRINT_PERMISSION_DENIED_SHOW_REQUEST";
    ILLEGAL_BLOCK_SIZE_EXCEPTION: "ILLEGAL_BLOCK_SIZE_EXCEPTION";
    INIT_CIPHER_FAILED: "INIT_CIPHER_FAILED";
    INVALID_ALGORITHM_PARAMETER_EXCEPTION: "INVALID_ALGORITHM_PARAMETER_EXCEPTION";
    IO_EXCEPTION: "IO_EXCEPTION";
    JSON_EXCEPTION: "JSON_EXCEPTION";
    MINIMUM_SDK: "MINIMUM_SDK";
    MISSING_ACTION_PARAMETERS: "MISSING_ACTION_PARAMETERS";
    MISSING_PARAMETERS: "MISSING_PARAMETERS";
    NO_SUCH_ALGORITHM_EXCEPTION: "NO_SUCH_ALGORITHM_EXCEPTION";
    SECURITY_EXCEPTION: "SECURITY_EXCEPTION";
    FRAGMENT_NOT_EXIST: "FRAGMENT_NOT_EXIST";
}

interface DeleteConfg {
    clientId: string;
    username: string;
}

interface EncryptResult {
    withFingerprint: boolean;
    withBackup: boolean;
    token: string;
}

interface EncryptionConfig {
    clientId: string;
    username?: string;
    password?: string;
    token?: string;
    disableBackup?: boolean;
    maxAttempts?: number;
    locale?: Locale;
    userAuthRequired?: boolean;
    encryptNoAuth?: boolean;
    dialogTitle?: string;
    dialogMessage?: string;
    dialogHint?: string;
}

type Locale =
    | "en_US"
    | "it"
    | "es"
    | "ru"
    | "fr"
    | "zh_CN"
    | "zh_SG"
    | "zh"
    | "zh_HK"
    | "zh_TW"
    | "zh_MO"
    | "no"
    | "pt"
    | "ja"
    | "de"
    | "th"
    | "ar"
    | "ko"
    | "ko-KR";

interface DecryptionConfig {
    clientId: string;
    username?: string;
    password?: string;
    token: string;
    disableBackup?: boolean;
    maxAttempts?: number;
    locale?: Locale;
    userAuthRequired?: boolean;
    encryptNoAuth?: boolean;
    dialogTitle?: string;
    dialogMessage?: string;
    dialogHint?: string;
}

interface IsAvailableSuccess {
    isAvailable: boolean;
    isHardwareDetected: boolean;
    hasEnrolledFingerprints: boolean;
}
