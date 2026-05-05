

1/1

Next.js 16.2.4
Turbopack
Console Error
Server



Failed to fetch PageSpeed data
app\actions.ts (36:13) @ fetchPageSpeedData


  34 |
  35 |     if (!res.ok) {
> 36 |       throw new Error("Failed to fetch PageSpeed data");
     |             ^
  37 |     }
  38 |
  39 |     const data = await res.json();
Call Stack
20

fetchPageSpeedData
app\actions.ts (36:13)
ReportContent
app\report\page.tsx (29:16)
resolveErrorDev
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (1919:105)
getOutlinedModel
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (1469:28)
parseModelString
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (1584:50)
reviveModel
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (2522:66)
parseModel
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (2517:16)
initializeModelChunk
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (1084:25)
getOutlinedModel
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (1407:17)
parseModelString
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (1639:50)
reviveModel
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (2522:66)
reviveModel
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (2525:61)
parseModel
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (2517:16)
initializeModelChunk
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (1084:25)
resolveConsoleEntry
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (2047:96)
processFullStringRow
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (2453:17)
processFullBinaryRow
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (2393:9)
processBinaryChunk
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (2502:221)
progress
file:///D:/Development%20Projects/revenue-leak/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_0p3wegg._.js (2676:20)
ReportPage
app\report\page.tsx (23:7)
1
2
Failed to analyze store. Please check the URL and try again.

