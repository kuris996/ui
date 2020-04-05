
export default config => {
    // optimize chunks
  config.optimization
  .runtimeChunk(false) // share the same chunks across different modules
  .splitChunks({
    chunks: 'async',
    name: 'vendors',
    maxInitialRequests: Infinity,
    minSize: 0,
    cacheGroups: {
      vendors: {
        name(module) {
          return 'misc';
        },
      },
    },
  });
}