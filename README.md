# localesfs-contentful-demo

Shows how a Contentful blog post becomes LocalesFS keys, and how a French locale map is written back onto Symbol and Text fields.

```bash
node demo.mjs
```

Keys look like `cf.entry.{entryId}.{fieldId}`. Link fields are skipped on push.

A live sync also needs a Contentful CMA token and a LocalesFS project token:

```bash
export CONTENTFUL_SPACE_ID=...
export CONTENTFUL_MANAGEMENT_TOKEN=...
export CONTENTFUL_SOURCE_LOCALE=en-US
export LOCALESFS_URL=https://localesfs.com
export LOCALESFS_TOKEN=lfs_...
export LOCALESFS_PROJECT_ID=...
npx @localesfs/contentful push
npx @localesfs/contentful pull
```
