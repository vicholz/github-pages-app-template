// Minimal compressed query-string share helpers
// Usage: const data = await compressToBase64(state);
//        url.searchParams.set('data', data);

export async function compressToBase64(obj) {
  const json = JSON.stringify(obj);
  const stream = new CompressionStream('gzip');
  const writer = stream.writable.getWriter();
  writer.write(new TextEncoder().encode(json));
  writer.close();
  const buf = await new Response(stream.readable).arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function decompressFromBase64(b64) {
  const padded = b64.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((b64.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const stream = new DecompressionStream('gzip');
  const writer = stream.writable.getWriter();
  writer.write(bytes);
  writer.close();
  const buf = await new Response(stream.readable).arrayBuffer();
  return JSON.parse(new TextDecoder().decode(buf));
}
