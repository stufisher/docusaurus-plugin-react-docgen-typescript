import { ParserOptions, ComponentDoc } from 'react-docgen-typescript';
import { Plugin, DocusaurusContext, RouteConfig } from '@docusaurus/types';
import { CompilerOptions } from 'typescript';
type Route = Pick<RouteConfig, 'exact' | 'component' | 'path' | 'priority'>;
type Union = {
    global?: undefined | false;
    route: Route;
} | {
    global: boolean;
    route?: Route;
};
export type Options = Union & {
    src: string | string[];
    tsConfig?: string;
    compilerOptions?: CompilerOptions;
    parserOptions?: ParserOptions;
    globOptions: null;
};
export default function plugin(context: DocusaurusContext, { src, global, route, tsConfig, compilerOptions, parserOptions }: Options): Plugin<ComponentDoc[]>;
export {};
//# sourceMappingURL=index.d.ts.map