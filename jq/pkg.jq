def pkg_deps(name): .dependencies[name];
def pkg_dev_deps(name): .devDependencies[name];

def set_version(pkg; version):
  if .devDependencies[pkg] then .devDependencies[pkg] = version
  elif .dependencies[pkg] then .dependencies[pkg] = version
  else . end;

def find_by_dep(dep): select(pkg_deps(dep), pkg_dev_deps(dep));

def focus_deps(dep): { name: .name, dependencies: { (dep): .dependencies[dep] }};
def focus_dev_deps(dep): { name: .name, devDependencies: { (dep): .devDependencies[dep] }};

def short(dep):
  if pkg_deps(dep) then focus_deps(dep)
  elif pkg_dev_deps(dep) then focus_dev_deps(dep)
  else { name: .name } end;