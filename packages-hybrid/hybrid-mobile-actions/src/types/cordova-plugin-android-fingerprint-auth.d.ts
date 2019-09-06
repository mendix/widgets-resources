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
    // decrypt(decryptConfig: DecryptionConfig, successCallback, errorCallback);
    // delete(deleteConfg, successCallback, errorCallback);
    // dismiss(successCallback, errorCallback);
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
    locale?: string;
    userAuthRequired?: boolean;
    encryptNoAuth?: boolean;
    dialogTitle?: string;
    dialogMessage?: string;
    dialogHint?: string;
}

interface DecryptionConfig {
    clientId: string;
    username?: string;
    password?: string;
    token: string;
    disableBackup?: boolean;
    maxAttempts?: number;
    locale?: string;
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
