# µCMS - The micro content management system

µCMS (pronounced micro CMS, know what - let's just call it **micro CMS** from now) is a collection of patterns and libraries of open-source best practices and tools that lets you manage your content authoring and publishing.

## Destructing the CMS

Traditional Content Management Systems (CMS) mainly come in three popular flavours:

- **Full Stack**: Popular all-in-one solutions that provide everything from a WYSIWYG authoring, persistence, authoring flow, HTML rendering, API access, publishing and hosting.
- **Headless**: Up and comming variant of full-stack that delegates the HTML rendering to clients accessing the content via API.
- **Static**: Static website generation from souce such as [Jekyll](https://jekyllrb.com/) which is used and supported by [GitHub](https://github.com/) or standalone solutions such as [GatsbyJS](https://www.gatsbyjs.org/).

> TODO: Explain micro CMS approach to modular full-stack

## Patterns

### Autoring

- `author` creates branch `feature` from `master` branch
- `author` creates `articles/testing.md` containing [front matter](https://jekyllrb.com/docs/front-matter/) and [markdown](https://daringfireball.net/projects/markdown/syntax)
- `author` commits changes to the `feature` branch and syncs it to `origin` on a periodic basis as the branch develops
- When `author` is done he sends a [merge request](https://docs.gitlab.com/ee/user/project/merge_requests/) to `editor` requesting review and merge of `feature` on `master`
- `author` and `editor` go through the reviewing process and in the end `editor` [squases and merges](https://docs.gitlab.com/ee/user/project/merge_requests/squash_and_merge.html) `feature` on `master`

### Publishing

- `editor` creates branch `staging` from `production` branch
- `editor` cherry picks commit from `master` to `staging`
- `editor` sends a [merge request](https://docs.gitlab.com/ee/user/project/merge_requests/) to `publisher` requesting review and merge on `production`
- `editor` and `publisher` go through the reviewing process and in the end `publisher` merges `staging` on `production`