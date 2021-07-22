import type { LocationAccuracy, LocationAccuracyOptions } from './types';
export declare function checkLocationAccuracy(): Promise<LocationAccuracy>;
export declare function requestLocationAccuracy(_options: LocationAccuracyOptions): Promise<LocationAccuracy>;
export declare function openLimitedPhotoLibraryPicker(): Promise<void>;
