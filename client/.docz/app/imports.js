export const imports = {
  'src/next/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-next-index" */ 'src/next/index.mdx'),
}
