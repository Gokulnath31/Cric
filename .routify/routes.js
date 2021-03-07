
/**
 * @roxi/routify 2.13.1
 * File generated Sun Mar 07 2021 13:43:40 GMT+0530 (India Standard Time)
 */

export const __version = "2.13.1"
export const __timestamp = "2021-03-07T08:13:40.194Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "name": "_layout",
  "filepath": "/_layout.svelte",
  "root": true,
  "ownMeta": {},
  "absolutePath": "C:/Users/Goku/Desktop/Cric/src/pages/_layout.svelte",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/Goku/Desktop/Cric/src/pages/index.svelte",
      "importPath": "../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "Match.svelte",
      "filepath": "/Match.svelte",
      "name": "Match",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/Goku/Desktop/Cric/src/pages/Match.svelte",
      "importPath": "../src/pages/Match.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/Match",
      "id": "_Match",
      "component": () => import('../src/pages/Match.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "Team.svelte",
      "filepath": "/Team.svelte",
      "name": "Team",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/Goku/Desktop/Cric/src/pages/Team.svelte",
      "importPath": "../src/pages/Team.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/Team",
      "id": "_Team",
      "component": () => import('../src/pages/Team.svelte').then(m => m.default)
    }
  ],
  "isLayout": true,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "isPage": false,
  "isFile": true,
  "file": "_layout.svelte",
  "ext": "svelte",
  "badExt": false,
  "importPath": "../src/pages/_layout.svelte",
  "meta": {
    "recursive": true,
    "preload": false,
    "prerender": true
  },
  "path": "/",
  "id": "__layout",
  "component": () => import('../src/pages/_layout.svelte').then(m => m.default)
}


export const {tree, routes} = buildClientTree(_tree)

