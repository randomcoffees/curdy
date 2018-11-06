# Curdy changelog

## next
- Updates to jyson 4.0.0
- models are now stored on `req.curdy` instead of just the `req`
- Arrays are now marked as dirty
  - As a result updating an array of subdocuments behaves differently than an array of strings
- Wraps api model render data in the model name
  - Show, Create, Delete, and Update use the singular name
  - ShowAll uses the plural name

## v3.4.0
- Removed dependency on Q
- Removed dependency on lodash
- Removed dependency on supertest-as-promised
- Updated packages
- Consolidated utilities

## v3.3.3
- Updated packages

## v3.2.0
- Adds a SimpleSort plugin for simpler sorting

## v3.1.0
- Plugins are now exposed via curdy

## v3.0.0
- Updated to [jyson 3.0.0](https://github.com/hubba/jyson/blob/master/changelog.md#v300)

## v2.0.1
- Render templates can now access the res object via opts
- Updates to jyson 2.0.0
- Closes [Issue #9](https://github.com/hubba/jyson/issues/9)

## v2.0.0
- Adds Support for plugins
- Closes [Issue #5](https://github.com/hubba/jyson/issues/5)

## v1.0.1
- Issues with jyson 1.2.0 so we downgraded to 1.1.0

## v1.0.0
- First Release of Curdy

## v0.0.1
- Init creation of Curdy
