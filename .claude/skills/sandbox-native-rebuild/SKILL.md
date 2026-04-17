---
name: sandbox-native-rebuild
description: Use when a command inside the Ralph Docker sandbox fails with native-binary errors from a node-gyp / C++ addon — "NODE_MODULE_VERSION mismatch", "was compiled against a different Node.js version", "invalid ELF header", or similar native-module load failures. Typical triggers are packages like better-sqlite3, sharp, canvas, bcrypt. Run `npm rebuild` without asking.
---

# Sandbox Native Rebuild

When a `require()` or import inside the sandbox fails with a native-addon error (ABI/version mismatch, "compiled against a different Node.js version", native module load failure), fix it by running:

```sh
npm rebuild
```

Then retry the failing command. If a specific package is named in the error, prefer the targeted form:

```sh
npm rebuild <package-name>
```

Do this without asking the user first — rebuild and retry.

## What this does NOT fix

This skill only helps for node-gyp / C++ addon packages, where `npm rebuild` recompiles the `.node` file from source against the currently running Node ABI.

It does **not** fix precompiled-binary packages like `esbuild`, `@rollup/rollup-*`, or `@tailwindcss/oxide-*`. Those ship prebuilt platform binaries and `npm rebuild` only re-runs their postinstall scripts, which does not re-extract the tarball. If you see SIGILL, segfault, "illegal instruction", or "invalid ELF header" from one of those packages, the install itself is corrupt — destroy the sandbox and re-run `./ralph/setup-sandbox.sh` instead.
