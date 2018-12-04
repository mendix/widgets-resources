/* tslint:disable */

class MockGoogle {

    constructor() {
        const mockGoogleObject = MockGoogle.prototype as any;
        mockGoogleObject.maps = MapsMock.prototype;
        mockGoogleObject.maps.Geocoder = MockGeocoder;
        mockGoogleObject.maps.Map = MapsMock;
        mockGoogleObject.maps.LatLngBounds = LatLngBoundsMock;
        mockGoogleObject.maps.LatLng = LatLngMock;
        mockGoogleObject.maps.Marker = MarkerMock;
        mockGoogleObject.maps.event = EventMock;
        mockGoogleObject.maps.GeocoderStatus = GeocoderStatus;
    }
}

class MapsMock implements google.maps.Map {
    setClickableIcons(): void {
        throw new Error("Method not implemented.");
    }
    controls!: Array<google.maps.MVCArray<Node>>;
    data!: google.maps.Data;
    mapTypes!: google.maps.MapTypeRegistry;
    overlayMapTypes!: google.maps.MVCArray<google.maps.MapType>;

    constructor(_mapDiv: Element, _opts?: google.maps.MapOptions) {
        console.log("Google Maps mock is used.");
    }

    fitBounds(_bounds: google.maps.LatLngBounds): void {/** */
    }

    getBounds(): google.maps.LatLngBounds {
        return new google.maps.LatLngBounds();
    }

    getCenter(): google.maps.LatLng {
        return new google.maps.LatLng(0, 0);
    }

    getDiv(): Element {
        return new Element();
    }

    getHeading(): number {
        return 0;
    }

    getMapTypeId(): google.maps.MapTypeId | string {
        return "";
    }

    getProjection(): google.maps.Projection {
        const a: any = "";
        return a;
    }

    getStreetView(): google.maps.StreetViewPanorama {
        return new google.maps.StreetViewPanorama(new Element());
    }

    getTilt(): number {
        return 0;
    }

    getZoom(): number {
        return 0;
    }

    panBy(_x: number, _y: number): void {/** */
    }

    panTo(_latLng: google.maps.LatLng | google.maps.LatLngLiteral): void {/** */
    }

    panToBounds(_latLngBounds: google.maps.LatLngBounds): void {/** */
    }

    setCenter(_latlng: google.maps.LatLng | google.maps.LatLngLiteral): void {/** */
    }

    setHeading(_heading: number): void {/** */
    }

    setMapTypeId(_mapTypeId: google.maps.MapTypeId | string): void {/** */
    }

    setOptions(_options: google.maps.MapOptions): void {/** */
    }

    setStreetView(_panorama: google.maps.StreetViewPanorama): void {/** */
    }

    setTilt(_tilt: number): void {/** */
    }

    setZoom(_zoom: number): void {/** */
    }

    // mvcObject
    addListener(__eventName: string, _handler: (...args: any[]) => void): google.maps.MapsEventListener {
        return {
            remove: () => {/** */
            }
        };
    }

    bindTo(__key: string, _target: google.maps.MVCObject, _targetKey?: string, _noNotify?: boolean): void {/** */
    }

    changed(__key: string): void {/** */
    }

    get(__key: string): any {/** */
    }

    notify(__key: string): void {/** */
    }

    set(__key: string, _value: any): void {/** */
    }

    setValues(__values: any): void {/** */
    }

    unbind(__key: string): void {/** */
    }

    unbindAll(): void {/** */
    }
}
// tslint:disable-next-line:max-classes-per-file
class MockGeocoder implements google.maps.Geocoder {
    // cant make it static, at time of require not all classes are mocked.
    successResult: google.maps.GeocoderResult[] = [ {
        address_components: [ {
            long_name: "1600",
            short_name: "1600",
            types: [ "street_number" ]
        }, {
            long_name: "Amphitheatre Pkwy",
            short_name: "Amphitheatre Pkwy",
            types: [ "route" ]
        }, {
            long_name: "Mountain View",
            short_name: "Mountain View",
            types: [ "locality", "political" ]
        }, {
            long_name: "Santa Clara County",
            short_name: "Santa Clara County",
            types: [ "administrative_area_level_2", "political" ]
        }, {
            long_name: "California",
            short_name: "CA",
            types: [ "administrative_area_level_1", "political" ]
        }, {
            long_name: "United States",
            short_name: "US",
            types: [ "country", "political" ]
        }, {
            long_name: "94043",
            short_name: "94043",
            types: [ "postal_code" ]
        } ],
        formatted_address: "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
        geometry: {
            bounds: new google.maps.LatLngBounds(),
            location: new google.maps.LatLng(30, 118),
            location_type: 0,
            viewport: new google.maps.LatLngBounds()
        },
        partial_match: true,
        place_id: "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
        postcode_localities: [ "" ],
        types: [ "street_address" ]
    }
    ];
    zeroResult: google.maps.GeocoderResult[] = [ {
        address_components: [],
        formatted_address: "",
        geometry: {
            bounds: new google.maps.LatLngBounds(),
            location: new google.maps.LatLng(3, 18),
            location_type: 0,
            viewport: new google.maps.LatLngBounds()
        },
        partial_match: false,
        place_id: "",
        postcode_localities: [],
        types: []
    } ];
    multipleResult: google.maps.GeocoderResult[] = [ {
        address_components: [ {
            long_name: "Winnetka",
            short_name: "Winnetka",
            types: [ "sublocality", "political" ]
        }, {
            long_name: "Los Angeles",
            short_name: "Los Angeles",
            types: [ "administrative_area_level_3", "political" ]
        }, {
            long_name: "Los Angeles",
            short_name: "Los Angeles",
            types: [ "administrative_area_level_2", "political" ]
        }, {
            long_name: "California",
            short_name: "CA",
            types: [ "administrative_area_level_1", "political" ]
        }, {
            long_name: "United States",
            short_name: "US",
            types: [ "country", "political" ]
        } ],
        formatted_address: "Winnetka, California, USA",
        geometry: {
            bounds: new google.maps.LatLngBounds(),
            location: new google.maps.LatLng(34.213171, -118.571022),
            location_type: 0,
            viewport: new google.maps.LatLngBounds()
        },
        partial_match: true,
        place_id: "ChIJ0fd4S_KbwoAR2hRDrsr3HmQ",
        postcode_localities: [ "" ],
        types: [ "sublocality", "political" ]
    }, {
        address_components: [ {
            long_name: "1600",
            short_name: "1600",
            types: [ "street_number" ]
        }, {
            long_name: "Amphitheatre Pkwy",
            short_name: "Amphitheatre Pkwy",
            types: [ "route" ]
        }, {
            long_name: "Mountain View",
            short_name: "Mountain View",
            types: [ "locality", "political" ]
        }, {
            long_name: "Santa Clara County",
            short_name: "Santa Clara County",
            types: [ "administrative_area_level_2", "political" ]
        }, {
            long_name: "California",
            short_name: "CA",
            types: [ "administrative_area_level_1", "political" ]
        }, {
            long_name: "United States",
            short_name: "US",
            types: [ "country", "political" ]
        }, {
            long_name: "94043",
            short_name: "94043",
            types: [ "postal_code" ]
        } ],
        formatted_address: "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
        geometry: {
            bounds: new google.maps.LatLngBounds(),
            location: new google.maps.LatLng(0, 0),
            location_type: 0,
            viewport: new google.maps.LatLngBounds()
        },
        partial_match: true,
        place_id: "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
        postcode_localities: [ "" ],
        types: [ "street_address" ]
    }
    ];

    geocode(request: google.maps.GeocoderRequest, callback: (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => void): void {
        if (request.address === "multipleAddress") {
            callback(this.multipleResult, google.maps.GeocoderStatus.OK);
        } else if (request.address === "invalidAddress") {
            callback(this.zeroResult, google.maps.GeocoderStatus.ZERO_RESULTS);
        } else if (request.address) {
            callback(this.successResult, google.maps.GeocoderStatus.OK);
        } else {
            callback(this.zeroResult, google.maps.GeocoderStatus.ZERO_RESULTS);
        }
    }
}

class LatLngBoundsMock implements google.maps.LatLngBounds {
    constructor(_sw?: google.maps.LatLng | google.maps.LatLngLiteral, _ne?: google.maps.LatLng | google.maps.LatLngLiteral) {/** */
    }

    contains(_latLng: google.maps.LatLng): boolean {
        return true;
    }

    equals(_other: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral): boolean {
        return true;
    }

    extend(_point: google.maps.LatLng): google.maps.LatLngBounds {
        return new google.maps.LatLngBounds();
    }

    getCenter(): google.maps.LatLng {
        return new google.maps.LatLng(0, 0);
    }

    getNorthEast(): google.maps.LatLng {
        return new google.maps.LatLng(0, 0);
    }

    getSouthWest(): google.maps.LatLng {
        return new google.maps.LatLng(0, 0);
    }

    intersects(_other: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral): boolean {
        return true;
    }

    isEmpty(): boolean {
        return false;
    }

    toJSON(): google.maps.LatLngBoundsLiteral {
        return { east: 0, north: 0, south: 0, west: 0 };
    }

    toSpan(): google.maps.LatLng {
        return new google.maps.LatLng(0, 0);
    }

    toString(): string {
        return "Fake";
    }

    toUrlValue(_precision?: number): string {
        return "";
    }

    union(_other: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral): google.maps.LatLngBounds {
        return new google.maps.LatLngBounds();
    }
}

class LatLngMock implements google.maps.LatLng {
    _lat: number;
    _lng: number;

    constructor(lat: number, lng: number, _noWrap?: boolean) {
        this._lat = lat;
        this._lng = lng;
    }

    equals(other: google.maps.LatLng): boolean {
        return other.lat() === this.lat() && other.lng() === this.lng();
    }

    lat(): number {
        return this._lat;
    }

    lng(): number {
        return this._lng;
    }

    toString(): string {
        return `Mock lat:{this._lat} lng {this._lng}`;
    }

    toUrlValue(_precision?: number): string {
        return "";
    }

    toJSON(): google.maps.LatLngLiteral {
        return ({ lat: 0, lng: 0 });
    }
}

// tslint:disable-next-line:max-classes-per-file
class MarkerMock implements google.maps.Marker {
    static MAX_ZINDEX: number;
    map!: google.maps.Map;

    constructor(_opts?: google.maps.MarkerOptions) {/** */
    }

    getAnimation(): google.maps.Animation {
        return 0;
    }

    getAttribution(): google.maps.Attribution {
        return {
            iosDeepLinkId: "fakeIosDeepLinkId",
            source: "fakeSource",
            webUrl: "fakeWebUrl"
        };
    }

    getClickable(): boolean {
        return true;
    }

    getCursor(): string {
        return "Fake";
    }

    getDraggable(): boolean {
        return true;
    }

    getIcon(): string | google.maps.Icon | google.maps.Symbol {
        return "Fake";
    }

    getLabel(): google.maps.MarkerLabel {
        return {
            color: "fakeColor",
            fontFamily: "fakeFontFamily",
            fontSize: "fakeFontSize",
            fontWeight: "fakeFontWeight",
            text: "fakeText"
        };
    }

    getMap(): google.maps.Map | google.maps.StreetViewPanorama {
        return this.map;
    }

    getOpacity(): number {
        return 0;
    }

    getPlace(): google.maps.Place {
        return {
            location: LatLngMock.prototype,
            placeId: "fakePlaceId",
            query: "fakeQuery"
        };
    }

    getPosition(): google.maps.LatLng {
        return new google.maps.LatLng(0, 0);
    }

    getShape(): google.maps.MarkerShape {
        return {
            coords: [ 10, 118 ],
            type: "fakeType"
        };
    }

    getTitle(): string {
        return "Fake";
    }

    getVisible(): boolean {
        return true;
    }

    getZIndex(): number {
        return 0;
    }

    setAnimation(_animation: google.maps.Animation): void { /** */
    }

    setAttribution(_attribution: google.maps.Attribution): void { /** */
    }

    setClickable(_flag: boolean): void { /** */
    }

    setCursor(_cursor: string): void { /** */
    }

    setDraggable(_flag: boolean): void { /** */
    }

    setIcon(_icon: string | google.maps.Icon | symbol): void { /** */
    }

    setLabel(_label: string | google.maps.MarkerLabel): void { /** */
    }

    setMap(_map: google.maps.Map | google.maps.StreetViewPanorama): void { /** */
    }

    setOpacity(_opacity: number): void { /** */
    }

    setOptions(_options: google.maps.MarkerOptions): void { /** */
    }

    setPlace(_place: google.maps.Place): void { /** */
    }

    setPosition(_latlng: google.maps.LatLng | google.maps.LatLngLiteral): void { /** */
    }

    setShape(_shape: google.maps.MarkerShape): void { /** */
    }

    setTitle(_title: string): void { /** */
    }

    setVisible(_visible: boolean): void { /** */
    }

    setZIndex(_zIndex: number): void { /** */
    }

    // mvcObject
    addListener(_eventName: string, _handler: (...args: any[]) => void): google.maps.MapsEventListener {
        return {
            remove: () => {/** */
            }
        };
    }

    bindTo(_key: string, _target: google.maps.MVCObject, _targetKey?: string, _noNotify?: boolean): void {/** */
    }

    changed(_key: string): void {/** */
    }

    get(_key: string): any {/** */
    }

    notify(_key: string): void {/** */
    }

    set(_key: string, _value: any): void {/** */
    }

    setValues(_values: any): void {/** */
    }

    unbind(_key: string): void {/** */
    }

    unbindAll(): void {/** */
    }
}

export enum GeocoderStatus {
    ERROR,
    INVALID_REQUEST,
    OK,
    OVER_QUERY_LIMIT,
    REQUEST_DENIED,
    UNKNOWN_ERROR,
    ZERO_RESULTS
}

class EventMock {
    static handlers: Array<() => void> = [];

    static addDomListener(_instance: object, _eventName: string, handler: () => void, _capture?: boolean): google.maps.MapsEventListener {
        EventMock.handlers.push(handler);
        return {
            remove: () => { /** */
            }
        };
    }

    static addDomListenerOnce(_instance: object, _eventName: string, handler: () => void, _capture?: boolean): google.maps.MapsEventListener {
        EventMock.handlers.push(handler);
        return {
            remove: () => { /** */
            }
        };
    }

    static addListener(_instance: object, _eventName: string, handler: () => void): google.maps.MapsEventListener {
        EventMock.handlers.push(handler);
        return {
            remove: () => { /** */
            }
        };
    }

    static addListenerOnce(_instance: object, _eventName: string, handler: () => void): google.maps.MapsEventListener {
        EventMock.handlers.push(handler);
        return {
            remove: () => { /** */
            }
        };
    }

    static clearInstanceListeners(_instance: object): void {
        EventMock.handlers = [];
    }

    static clearListeners(_instance: object, _eventName: string): void {
        EventMock.handlers = [];
    }

    static removeListener(_listener: google.maps.MapsEventListener): void {/** */
    }

    trigger(_instance: any, _eventName: string, ..._args: any[]): void {/** */
    }

    static mockEvent() {
        console.log("Mocking event");
        EventMock.handlers.forEach(f => f());
    }

    static mockClearListeners() {
        EventMock.handlers = [];
    }
}

const googleMockObject = new MockGoogle();

export const mockGoogleMaps = googleMockObject;
