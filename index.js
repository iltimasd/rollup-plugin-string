const { createFilter } = require("rollup-pluginutils");
const hjson = require("hjson");

function string(opts = {}) {
  if (!opts.include) {
    throw Error("include option should be specified");
  }

  const filter = createFilter(opts.include, opts.exclude);

  return {
    name: "string",

    transform(code, id) {
      if (filter(id)) {
        return {
          code: `export default ${hjson.stringify(code)};`,
          map: { mappings: "" },
        };
      }
    },
  };
}

exports.string = string;
