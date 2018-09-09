# µCMS - The micro content management system

µCMS (pronounced micro CMS, know what - let's just call it **micro CMS** from now) is a collection of patterns and libraries of open-source best practices and tools that lets you manage your content authoring and publishing.

## Destructing the CMS

Traditional Content Management Systems (CMS) mainly come in three popular flavours:

- **Full Stack**: Popular all-in-one solutions that provide everything from a WYSIWYG authoring, persistence, authoring flow, HTML rendering, API access, publishing and hosting.
- **Headless**: Up and comming variant of full-stack that delegates the HTML rendering to clients accessing the content via API.
- **Static**: Static website generation from souce such as [Jekyll](https://jekyllrb.com/) which is used and supported by [GitHub](https://github.com/) or standalone solutions such as [GatsbyJS](https://www.gatsbyjs.org/).

> TODO: Explain micro CMS approach to modular full-stack

## Patterns

Micro CMS defines patterns for comon flows for content management.

- [**Authoring**](#authoring) : A pattern based on [`git`](https://git-scm.com/) and [`markdown`](https://daringfireball.net/projects/markdown/syntax) for content authoring
- [**Publishing**](#publishing) : Building on the previous pattern - use [`git`](https://git-scm.com/) for content publishing
- [**Building**](#building) : Describes how to use [GulpJS](https://gulpjs.com/) and [Angular](https://angular.io/) SSR for static publishing
- [**Persistence**](#persistence) : Describes how [`vinyl`](https://www.npmjs.com/package/vinyl) objects can be loaded from and save to [`git`](https://git-scm.com/) repositories
- [**Data**](#data) : Describes how to provide access content via GraphQL
- [**State**](#state) : Describes how to control application state with GraphQL
- [**Layout**](#layout) : Describes how individual page layout is handled

### Authoring

- `author` creates branch `feature` from `master` branch
- `author` creates `articles/testing.md` containing [front matter](https://jekyllrb.com/docs/front-matter/) and [`markdown`](https://daringfireball.net/projects/markdown/syntax)
- `author` commits changes to the `feature` branch and syncs it to `origin` on a periodic basis as the branch develops
- When `author` is done he sends a [merge request](https://docs.gitlab.com/ee/user/project/merge_requests/) to `editor` requesting review and merge of `feature` on `master`
- `author` and `editor` go through the reviewing process and in the end `editor` [squases and merges](https://docs.gitlab.com/ee/user/project/merge_requests/squash_and_merge.html) `feature` on `master`

### Publishing

- `editor` creates branch `staging` from `production` branch
- `editor` cherry picks commit from `master` to `staging`
- `editor` sends a [merge request](https://docs.gitlab.com/ee/user/project/merge_requests/) to `publisher` requesting review and merge on `production`
- `editor` and `publisher` go through the reviewing process and in the end `publisher` merges `staging` on `production`

### Building

- Routes are provided to [GulpJS](https://gulpjs.com/) in the form of a collection of [`vinyl`](https://www.npmjs.com/package/vinyl) objects where [`options.path`](https://github.com/gulpjs/vinyl#optionspath) can be mapped to a route
- In Angular the [`renderModuleFactory`](https://angular.io/api/platform-server/renderModuleFactory) can be [used as a route renderer](https://github.com/angular/universal-starter/blob/master/prerender.ts#L36) and thus wrapped to consume a `vinyl` object
- The prerendered output can be streamed back into a `vinyl` collection for further processing like critical CSS and HTML minification

### Persistence

- [`vinyl-js-git`](https://github.com/mu-cms/vinyl-js-git) can be used to expose local or remote [`git`](https://git-scm.com/) repositories as a collection of [`vinyl`](https://www.npmjs.com/package/vinyl) objects for both read and write operations

### Data

- [`apollo-angular`](https://www.apollographql.com/docs/angular/basics/setup.html) is used for all data access both in the server and the browser
- During the build we'll use [`TransferState`](https://angular.io/api/platform-browser/TransferState) to [serialize our apollo cache to the HTML output](https://github.com/apollographql/apollo-angular/blob/master/docs/source/recipes/server-side-rendering.md)
- [`apollo-link`](https://www.apollographql.com/docs/link/) provides a way for providing alternate data to GraphQL clients during runtime.
  - During build we bridge access to the `vinyl` collection
  - During mock we can skip the `vinyl` step and bridge access to the `fs`
  - A separate `apollo-link` can be created to generate [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load) packages for deployment to GraphQL servers.

### State

- [`apollo-state`](https://www.apollographql.com/docs/link/links/state.html) can be integrated with [`xstate`](https://www.npmjs.com/package/xstate) to provide access to local application state as well as the statechart itself via GraphQL.
  - [`extendedState`](https://github.com/davidkpiano/xstate/blob/master/docs/api/machine.md#machinetransitionstate-event-extendedstate) can be bridged using `apollo-state`
  - Actions via [GraphQL mtations](https://www.apollographql.com/docs/angular/basics/mutations.html)
  - Event via [GraphQL subscriptions](https://www.apollographql.com/docs/angular/features/subscriptions.html)

### Layout

- [`markdown-to-html-pipe`](https://www.npmjs.com/package/markdown-to-html-pipe) will transform the page contents in the case of straight up content pages with access to the front matter and route data via [`setOptions`](https://github.com/conclurer/markdown-to-html-pipe/blob/master/src/markdown-to-html.pipe.ts#L14)
