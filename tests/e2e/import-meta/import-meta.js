import { depMeta } from "./dep.js";

const topLevelMeta = import.meta;

function describe(meta) {
  return [
    typeof meta,
    Object.getPrototypeOf(meta) === null,
    meta === import.meta,
  ].join(" ");
}

addEventListener("fetch", (evt) => evt.respondWith((async () => {
  let caught = "no exception";
  try {
    import.meta.custom = 1;
  } catch (e) {
    caught = `threw ${e}`;
  }
  const lines = [
    `entry: ${describe(topLevelMeta)}`,
    `dep: ${describe(depMeta)} ${depMeta !== topLevelMeta}`,
    `try: ${caught} ${import.meta.custom}`,
  ];
  return new Response(lines.join("\n") + "\n");
})()));
