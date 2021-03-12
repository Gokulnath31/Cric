
/**
 * @roxi/routify 2.7.6
 * File generated Tue Mar 09 2021 08:35:30 GMT+0530 (India Standard Time)
 */

export const __version = "2.7.6"
export const __timestamp = "2021-03-09T03:05:30.575Z"

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
  "absolutePath": "/home/zoomrx/Desktop/svelte/Cric/src/pages/_layout.svelte",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "[matchId].svelte",
      "filepath": "/[matchId].svelte",
      "name": "[matchId]",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/zoomrx/Desktop/svelte/Cric/src/pages/[matchId].svelte",
      "importPath": "../src/pages/[matchId].svelte",
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
      "path": "/:matchId",
      "id": "__matchId",
      "component": () => import('../src/pages/[matchId].svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/zoomrx/Desktop/svelte/Cric/src/pages/index.svelte",
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
      "file": "Team.svelte",
      "filepath": "/Team.svelte",
      "name": "Team",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/home/zoomrx/Desktop/svelte/Cric/src/pages/Team.svelte",
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

