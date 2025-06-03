export function generateUsername(name : string) {
  const baseName = name.replace(/\s+/g, '').toLowerCase();
  const timestamp = Date.now().toString().slice(-4);
  return `${baseName}${timestamp}`;
}