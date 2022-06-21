function find-by-dep() {
  JQ_LIBRARY_PATH=`readlink -f ./jq`
  JQ_PROG="import \"pkg\" as pkg; pkg::find_by_dep(\"$1\")"

  npx lerna exec -- "cat package.json | jq -L $JQ_LIBRARY_PATH '$JQ_PROG'"
}

function as-scope() {
  jq --slurp '"{" + join(",") + "}"'
}

function get-scope-by-dep() {
  find-by-dep $1 | jq '.name' | as-scope
}

function find-short() {
  JQ_LIBRARY_PATH=`readlink -f ./jq`
  JQ_PROG="import \"pkg\" as pkg; pkg::find_by_dep(\"$1\") | pkg::short(\"$1\")"

  npx lerna exec -- "cat package.json | jq -L $JQ_LIBRARY_PATH '$JQ_PROG'" 
}

function set-dep-version() {
  scope=$1
  name=$2
  version=$3

  JQ_LIBRARY_PATH=`readlink -f ./jq`
  JQ_PROG="import \"pkg\" as pkg; pkg::set_version(\"$name\"; \"$version\")"

  npx lerna exec --scope=$scope -- "cat package.json | jq -L $JQ_LIBRARY_PATH '$JQ_PROG' > jq-out.json && mv jq-out.json package.json"
}