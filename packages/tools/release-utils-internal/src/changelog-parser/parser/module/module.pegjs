// Simple Changelog Grammar
// ==========================
//

ChangelogFile
  = header:ChangelogHead _ content:(ModuleVersionEntry / OtherNotes)+ _ { return { header, content, moduleName: content.find(v => v.type === "normal")?.name } }

ModuleVersionEntry
  = header:(VersionHeader/UnreleasedVersionHeader) _ sections:WidgetSection* _ subcomponents:SubWidgetEntry* _ { return { ...header, sections,subcomponents  } }


VersionHeader
  = "##" _ "[" version:SemVer "]" _ name:([^-]*) _ "-" _ date:Date [\n\r]* { return { type: "normal", version, date, name: name.join("").trim() }}

UnreleasedVersionHeader
  = "##" _ "[Unreleased]" _ { return { type: "unreleased" }}

OtherNotes
  = "##" _ title:OneLineSentence _ txt:OneLineSentence _ { return { type: "note", title, text: txt }}


// Module
WidgetSection
  = _ "###" _ type:(SectionType) _ logs:LogLine* { return { type, logs } }


// Subwidgets
SubWidgetEntry
  = head:(SubComponentEntryHeaderWithVersion / SubComponentEntryHeaderWithoutVersion) sections:SubComponentSection* { return { ...head, sections } }

SubComponentEntryHeaderWithVersion
  = _ "###" _  "[" version:SemVer "]" _ name:[^\n\r]+ { return { version, name: name.join("") }}

SubComponentEntryHeaderWithoutVersion
  = _ "###" _ name:[^\n\r]+ { return { name: name.join("") }}

// Logs section #### Changed and its entries
SubComponentSection
  = _ "####" _ type:(SectionType) _ logs:LogLine* { return { type, logs } }

LogLine
  = _ "-" _ log:([^\n\r]+) _ { return log.join("") }


// File Header
ChangelogHead
  = ChangelogHeadLine1 txt:ChangelogHeadLine2 ChangelogHeadLine3 { return txt; }
ChangelogHeadLine1
  = _ "# Changelog" _
ChangelogHeadLine2
  = _ OneLineSentence _ { return text().trim() }
ChangelogHeadLine3
  = _ "The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)." _


// Specific helpers
SectionType
  = "Added" / "Changed" / "Fixed" / "Removed" / "Breaking changes" / "Documentation" / "Security" { return text() }


// Generic helpers
SemVer
  = major:Number "." minor:Number "." patch:Number _ { return new options.Version.fromParts(major, minor, patch) }
Date
  = year:Number "-" month:Number "-" day:Number { return new Date(year, month - 1, day) }
OneLineSentence
  = txt:[^\r\n]+ { return txt.join("").trim() }
Number
  = [0-9]+ { return parseInt(text(), 10) }
_ "whitespace"
  = [ \t\n\r]*
