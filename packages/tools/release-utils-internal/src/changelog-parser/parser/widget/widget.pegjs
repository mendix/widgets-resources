// Simple Changelog Grammar
// ==========================
//

ChangelogFile
  = header:ChangelogHead _ content:(VersionEntry/OtherNotes)+  _ { return { header, content } }

VersionEntry
  = header:(VersionHeader/UnreleasedVersionHeader) _ sections:WidgetSection* _ { return { ...header, sections } }

VersionHeader
  = "##" _ "[" version:SemVer "]" _ "-" _ date:Date { return { type: "normal", version, date }}

UnreleasedVersionHeader
  = "##" _ "[Unreleased]" _ { return { type: "unreleased" }}

OtherNotes
  = "##" _ title:OneLineSentence _ txt:OneLineSentence _ { return { type: "note", title, text: txt }}

// Logs section #### Changed and its entries
WidgetSection
  = _ "###" _ type:(SectionType) _ logs:LogLine* { return { type, logs } }

LogLine
  = _ "-" _ log:OneLineSentence _ { return log }


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
