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

export function mvp(options: MvpOptions): Rule {
  return (_tree: Tree, _context: SchematicContext) => {

    const templateSource = apply(url('./files'), [
      filter(path => {
        if (!options.withStyles && path.includes('.component.scss')) return false;
        if (!options.withPresenter && path.includes('.presenter.ts')) return false;
        if (!options.withModule && path.includes('.module.ts')) return false;
        if (!options.withRouting && path.includes('.routing.ts')) return false;
        return true;
      }),
      applyTemplates({
        ...strings,
        ...options
      }),
      move(`${options.targetPath}/${strings.dasherize(options.name)}`)
    ]);
    return chain([mergeWith(templateSource)]);
  };
}