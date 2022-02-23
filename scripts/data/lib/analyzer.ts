import { createProgram, escapeLeadingUnderscores, Program } from "typescript";

export class Analyzer {
    private program: Program;

    constructor(sourceFiles: string[]) {
        this.program = createProgram(sourceFiles, {});
    }

    moduleExports(fileName: string, exportName: string): boolean {
        const sourceFile = this.program.getSourceFile(fileName);
        if (sourceFile) {
            const fileSymbol = this.program.getTypeChecker().getSymbolAtLocation(sourceFile);
            return fileSymbol?.exports?.get(escapeLeadingUnderscores(exportName)) !== undefined;
        }
        return false;
    }
}
