const TOKEN_KEY = "$value";
const ALIAS_PATTERN = /^\{([^}]+)\}$/;

export function collectTokens(node, path = [], inheritedType, tokens = new Map()) {
  if (node === null || typeof node !== "object" || Array.isArray(node)) {
    throw new Error(`Invalid group at ${path.join(".") || "<root>"}`);
  }

  const groupType = node.$type ?? inheritedType;

  for (const [name, value] of Object.entries(node)) {
    if (name.startsWith("$")) continue;
    if (name.includes(".") || name.includes("{") || name.includes("}")) {
      throw new Error(`Invalid token or group name: ${name}`);
    }

    const tokenPath = [...path, name];
    if (value && typeof value === "object" && !Array.isArray(value) && TOKEN_KEY in value) {
      const type = value.$type ?? groupType;
      if (!type) throw new Error(`Token ${tokenPath.join(".")} is missing a type`);
      const tokenName = tokenPath.join(".");
      if (tokens.has(tokenName)) throw new Error(`Duplicate token path: ${tokenName}`);
      tokens.set(tokenName, {
        path: tokenPath,
        type,
        value: value.$value,
        description: value.$description ?? ""
      });
      continue;
    }

    collectTokens(value, tokenPath, value?.$type ?? groupType, tokens);
  }

  return tokens;
}

export function resolveTokenValue(name, tokens, stack = []) {
  const token = tokens.get(name);
  if (!token) throw new Error(`Unknown token alias: ${name}`);
  if (stack.includes(name)) {
    throw new Error(`Circular token alias: ${[...stack, name].join(" -> ")}`);
  }

  if (typeof token.value === "string") {
    const match = token.value.match(ALIAS_PATTERN);
    if (match) return resolveTokenValue(match[1], tokens, [...stack, name]);
  }

  return token.value;
}

function colorToCss(value) {
  if (
    value.colorSpace !== "srgb" ||
    !Array.isArray(value.components) ||
    value.components.length !== 3
  ) {
    throw new Error("Only three-channel sRGB color tokens are supported in v0.1");
  }
  const [r, g, b] = value.components;
  const alpha = value.alpha ?? 1;
  const channels = [r, g, b].map((channel) => Math.round(channel * 255));
  return `rgb(${channels.join(" ")} / ${alpha})`;
}

function dimensionToCss(value) {
  if (
    typeof value?.value !== "number" ||
    !["px", "rem", "ms", "s"].includes(value.unit)
  ) {
    throw new Error("Invalid dimension or duration token");
  }
  return `${value.value}${value.unit}`;
}

function shadowToCss(value) {
  const shadows = Array.isArray(value) ? value : [value];
  return shadows
    .map((shadow) =>
      [
        shadow.inset ? "inset" : "",
        dimensionToCss(shadow.offsetX),
        dimensionToCss(shadow.offsetY),
        dimensionToCss(shadow.blur),
        dimensionToCss(shadow.spread),
        colorToCss(shadow.color)
      ]
        .filter(Boolean)
        .join(" ")
    )
    .join(", ");
}

export function tokenToCssValue(type, value) {
  switch (type) {
    case "color":
      return colorToCss(value);
    case "dimension":
    case "duration":
      return dimensionToCss(value);
    case "cubicBezier":
      return `cubic-bezier(${value.join(", ")})`;
    case "fontFamily":
      return value
        .map((family) => (family.includes(" ") ? `"${family}"` : family))
        .join(", ");
    case "fontWeight":
    case "number":
      return String(value);
    case "shadow":
      return shadowToCss(value);
    default:
      throw new Error(`Unsupported CSS token type: ${type}`);
  }
}

export function compileTokenFiles(files) {
  const tokens = new Map();
  for (const file of files) collectTokens(file.data, [], undefined, tokens);

  const resolved = {};
  const cssLines = [];

  for (const [name, token] of [...tokens.entries()].sort(([a], [b]) =>
    a.localeCompare(b)
  )) {
    const value = resolveTokenValue(name, tokens);
    resolved[name] = {
      type: token.type,
      value,
      description: token.description
    };
    cssLines.push(
      `  --song-${name.replaceAll(".", "-")}: ${tokenToCssValue(token.type, value)};`
    );
  }

  return {
    resolved,
    css: `:root {\n${cssLines.join("\n")}\n}\n`
  };
}
