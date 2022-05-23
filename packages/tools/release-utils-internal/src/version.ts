export type VersionString = `${number}.${number}.${number}` | `${number}.${number}.${number}.${number}`;

export class Version {
    constructor(
        public readonly major: number,
        public readonly minor: number,
        public readonly patch: number,
        public readonly build: number | undefined
    ) {}

    bumpPatch(): Version {
        return new Version(this.major, this.minor, this.patch + 1, undefined);
    }

    bumpMinor(): Version {
        return new Version(this.major, this.minor + 1, 0, undefined);
    }

    bumpMajor(): Version {
        return new Version(this.major, this.minor + 1, 0, undefined);
    }

    format(withBuild = false): string {
        const v = `${this.major}.${this.minor}.${this.patch}`;

        if (withBuild && this.build === undefined) {
            throw new Error(`Attempt to format version with build number, but no build number is set: ${v}`);
        }

        return withBuild ? `${v}.${this.build}` : v;
    }

    equals(anotherVersion: Version) {
        return (
            this.major === anotherVersion.major &&
            this.minor === anotherVersion.minor &&
            this.patch === anotherVersion.patch
        );
    }

    static fromParts(major: number, minor: number, patch: number, build: number | undefined): Version {
        return new Version(major, minor, patch, build);
    }

    static fromString(version: VersionString): Version {
        const [major, minor, patch, build] = version.split(".").map(p => parseInt(p, 10));

        return new Version(major, minor, patch, build);
    }
}
