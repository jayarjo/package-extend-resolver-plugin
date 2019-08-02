const path = require("path");
const {
	resolveToModuleOrNull,
	getPathOffset,
	getLookUpDirChain
} = require('@itdc/bundlewiz/utils');

class PackageExtendResolverPlugin {

	constructor({ lookIn = [ 'src' ], assumeExtensions = [] } = {}) {
		this.lookIn = getLookUpDirChain(lookIn);
		this.assumeExtensions = assumeExtensions;
	}

	apply(compiler) {
		compiler.hooks.normalModuleFactory.tap(
			"PackageExtendResolverPlugin",
			nmf => {
				nmf.hooks.beforeResolve.tap("PackageExtendResolverPlugin", result => {
					if (!result) return;

					const isAbsolute = path.isAbsolute(result.request);
					const isAliasedAbsolute = /^[^\.\/]/i.test(result.request);
					const isBanged = /^!/.test(result.request);
					const isRelative = /^\./.test(result.request);

					if (isAbsolute || isBanged) {
						return result;
					} else if (isAliasedAbsolute) {
						result.request = resolveToModuleOrNull(
							this.lookIn,
							this.assumeExtensions,
							result.request
						) || result.request;
						return result;
					} else if (isRelative) {
						const pathOffset = getPathOffset(result.context, this.lookIn);
						const lookIn = pathOffset !== null ? this.lookIn : [result.context];
						const request = pathOffset ? path.join(pathOffset, result.request) : result.request;
						result.request = resolveToModuleOrNull(
							lookIn,
							this.assumeExtensions,
							request,
							[ result.contextInfo.issuer ] // make sure we do not resolve to oneself
						) || result.request;
						return result;
					}

					// meaningful default for any weird case
					return result;
				});
			}
		);
	}
}

module.exports = PackageExtendResolverPlugin;
