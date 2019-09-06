// Typing from the original package are broken.
interface Navigator {
    contacts?: CordovaContacts;
}

interface CordovaContacts {
    create(): Contact;
    pickContact(onSuccess: (contact: Contact) => void, onError: (error: ContactError) => void): void;
    find(
        fields: ContactFieldType[],
        onSuccess: (contacts: Contact[]) => void,
        onError: (error: ContactError) => void,
        options: ContactFindOptions
    ): void;
}

interface ContactProperties {
    /** A globally unique identifier. */
    id?: string;
    /** A globally unique identifier on Android. */
    rawId?: string;
    /** The name of this Contact, suitable for display to end users. */
    displayName?: string;
    /** An object containing all components of a persons name. */
    name?: ContactName;
    /** A casual name by which to address the contact. */
    nickname?: string;
    /** An array of all the contact's phone numbers. */
    phoneNumbers?: ContactField[];
    /** An array of all the contact's email addresses. */
    emails?: ContactField[];
    /** An array of all the contact's addresses. */
    addresses?: ContactAddress[];
    /** An array of all the contact's IM addresses. */
    ims?: ContactField[];
    /** An array of all the contact's organizations. */
    organizations?: ContactOrganization[];
    /** The birthday of the contact. */
    birthday?: Date;
    /** A note about the contact. */
    note?: string;
    /** An array of the contact's photos. */
    photos?: ContactField[];
    /** An array of all the user-defined categories associated with the contact. */
    categories?: ContactField[];
    /** An array of web pages associated with the contact. */
    urls?: ContactField[];
}

interface Contact extends ContactProperties {
    /** Returns a new `Contact` object that is a deep copy of the calling object, with the `id` property set to `null`. */
    clone(): Contact;
    /** Removes the contact from the device contacts database, otherwise executes an error callback with a `ContactError` object. */
    remove(onSuccess: () => void, onError: (error: ContactError) => void): void;
    /** Saves a new contact to the device contacts database, or updates an existing contact if a contact with the same `id` already exists. */
    save(onSuccess: () => void, onError: (error: ContactError) => void): void;
}

interface ContactError {
    /** Error code */
    code: ContactErrorCode;
}

const enum ContactErrorCode {
    UNKNOWN_ERROR = 0,
    INVALID_ARGUMENT_ERROR = 1,
    TIMEOUT_ERROR = 2,
    PENDING_OPERATION_ERROR = 3,
    IO_ERROR = 4,
    NOT_SUPPORTED_ERROR = 5,
    OPERATION_CANCELLED_ERROR = 6,
    PERMISSION_DENIED_ERROR = 20
}

interface ContactField {
    /** A string that indicates what type of field this is, home for example. */
    type?: string;
    /** The value of the field, such as a phone number or email address. */
    value?: string;
    /** Set to true if this ContactField contains the user's preferred value. */
    pref?: boolean;
}

interface ContactName {
    /** The complete name of the contact. */
    formatted?: string;
    /** The contact's family name. */
    familyName?: string;
    /** The contact's given name. */
    givenName?: string;
    /** The contact's middle name. */
    middleName?: string;
    /** The contact's prefix (example Mr. or Dr.) */
    honorificPrefix?: string;
    /** The contact's suffix (example Esq.). */
    honorificSuffix?: string;
}

/** Search options to filter navigator.contacts.  */
interface ContactFindOptions {
    /** The search string used to find navigator.contacts. */
    filter?: string;
    /** Determines if the find operation returns multiple navigator.contacts. Defaults to false. */
    multiple?: boolean;
    /** Contact fields to be returned back. If specified, the resulting Contact object only features values for these fields. */
    desiredFields?: ContactFieldType[];
    /** (Android only): Filters the search to only return contacts with a phone number informed. */
    hasPhoneNumber?: boolean;
}

interface ContactAddress {
    /** Set to true if this ContactAddress contains the user's preferred value. */
    pref?: boolean;
    /** A string indicating what type of field this is, home for example. */
    type?: string;
    /** The full address formatted for display. */
    formatted?: string;
    /** The full street address. */
    streetAddress?: string;
    /** The city or locality. */
    locality?: string;
    /** The state or region. */
    region?: string;
    /** The zip code or postal code. */
    postalCode?: string;
    /** The country name. */
    country?: string;
}

interface ContactOrganization {
    /** Set to true if this ContactOrganization contains the user's preferred value. */
    pref?: boolean;
    /** A string that indicates what type of field this is, home for example. */
    type?: string;
    /** The name of the organization. */
    name?: string;
    /** The department the contract works for. */
    department?: string;
    /** The contact's title at the organization. */
    title?: string;
}

type ContactFieldType =
    | "*"
    | "addresses"
    | "birthday"
    | "categories"
    | "country"
    | "department"
    | "displayName"
    | "emails"
    | "name.familyName"
    | "name.formatted"
    | "name.givenName"
    | "name.honorificPrefix"
    | "name.honorificSuffix"
    | "id"
    | "ims"
    | "locality"
    | "name.middleName"
    | "name"
    | "nickname"
    | "note"
    | "organizations"
    | "phoneNumbers"
    | "photos"
    | "postalCode"
    | "region"
    | "streetAddress"
    | "title"
    | "urls";
