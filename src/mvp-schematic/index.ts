import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  url,
  filter
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { Schema as MvpOptions } from './schema';

function getAngularVersion(tree: Tree): string | null {
  const pkgBuffer = tree.read('/package.json');
  if (!pkgBuffer) return null;
  try {
    const pkg = JSON.parse(pkgBuffer.toString());
    return pkg.dependencies?.['@angular/core'] || pkg.devDependencies?.['@angular/core'] || null;
  } catch {
    return null;
  }
}

export function mvp(options: MvpOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const angularVersion = getAngularVersion(tree);
    // Determinate if the standalone component is the default in Angular 19+
    // Angular 19 introduced standalone components as the default, so we check the version.
    // If the version is 19 or higher, we set `isStandaloneDefault` to true.
    // Otherwise, we set it to false.
    const isStandaloneDefault = angularVersion && parseInt(angularVersion.match(/\d+/)?.[0] || '0', 10) >= 19;

    const templateFolder = options.standalone ? './files/standalone' : './files/classic';

    const templateSource = apply(url(templateFolder), [
      filter(path => {
        if (!options.withStyles && path.includes('.component.scss')) return false;
        if (!options.withPresenter && path.includes('.presenter.ts')) return false;
        if (!options.withModule && path.includes('.module.ts')) return false;
        if (!options.withRouting && path.includes('.routing.ts')) return false;
        return true;
      }),
      applyTemplates({
        ...strings,
        ...options,
        isStandaloneDefault // <-- pasa la variable al template
      }),
      move(`${options.targetPath}/${strings.dasherize(options.name)}`)
    ]);
    return chain([mergeWith(templateSource)]);
  };
}