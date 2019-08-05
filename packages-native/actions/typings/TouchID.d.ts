/**
 * Source: https://github.com/naoufal/react-native-touch-id/blob/master/index.d.ts
 * (Modified)
 *
 * Copyright (c) 2015, Naoufal Kadhom
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

declare module "react-native-touch-id" {
    /**
     * The supported biometry type
     */
    type BiometryType = "FaceID" | "TouchID";

    /**
     * Base config to pass to `TouchID.isSupported` and `TouchID.authenticate`
     */
    interface IsSupportedConfig {
        /**
         * Return unified error messages
         */
        unifiedErrors?: boolean;
    }

    /**
     * Authentication config
     */
    export interface AuthenticateConfig extends IsSupportedConfig {
        /**
         * **Android only** - Title of confirmation dialog
         */
        title?: string;
        /**
         * **Android only** - Color of fingerprint image
         */
        imageColor?: string;
        /**
         * **Android only** - Color of fingerprint image after failed attempt
         */
        imageErrorColor?: string;
        /**
         * **Android only** - Text shown next to the fingerprint image
         */
        sensorDescription?: string;
        /**
         * **Android only** - Text shown next to the fingerprint image after failed attempt
         */
        sensorErrorDescription?: string;
        /**
         * **Android only** - Cancel button text
         */
        cancelText?: string;
        /**
         * **iOS only** - By default specified 'Show Password' label. If set to empty string label is invisible.
         */
        fallbackLabel?: string;
        /**
         * **iOS only** - By default set to false. If set to true, will allow use of keypad passcode.
         */
        passcodeFallback?: boolean;
    }
    /**
     * `isSupported` error code
     */
    type IsSupportedErrorCode = "NOT_SUPPORTED" | "NOT_AVAILABLE" | "NOT_PRESENT" | "NOT_ENROLLED";

    /**
     * `authenticate` error code
     */
    type AuthenticateErrorCode =
        | IsSupportedErrorCode
        | "AUTHENTICATION_FAILED"
        | "USER_CANCELED"
        | "SYSTEM_CANCELED"
        | "TIMEOUT"
        | "LOCKOUT"
        | "LOCKOUT_PERMANENT"
        | "PROCESSING_ERROR"
        | "USER_FALLBACK"
        | "UNKNOWN_ERROR";

    /**
     * Error returned from `authenticate`
     */
    export interface AuthenticationError {
        name: "TouchIDError";
        message: string;
        code: AuthenticateErrorCode;
        details: string;
    }
    /**
     * Error returned from `isSupported`
     */
    export interface IsSupportedError {
        name: "TouchIDError";
        message: string;
        code: IsSupportedErrorCode;
        details: string;
    }

    const TouchID: {
        /**
         *
         * @param reason String that provides a clear reason for requesting authentication.
         * @param config Configuration object for more detailed dialog setup
         */
        authenticate(reason?: string, config?: AuthenticateConfig): Promise<void>;
        /**
         *
         * @param config - Returns a `Promise` that rejects if TouchID is not supported. On iOS resolves with a `biometryType` `String` of `FaceID` or `TouchID`
         */
        isSupported(config?: IsSupportedConfig): Promise<BiometryType>;
    };
    export default TouchID;
}
